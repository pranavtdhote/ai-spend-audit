import type { AuditRule, AuditRecommendation } from '../types';
import { TOOL_DATABASE } from '../../constants/toolDatabase';
import { confidenceFromScore } from '../calculator';

/**
 * RULE: Plan Optimization (Downgrade / Upgrade)
 * ──────────────────────────────────────────────
 * Analyzes each per-seat tool for plan-level misalignment:
 *
 * 1. DOWNGRADE: Team/Enterprise plan with ≤2 seats → cheaper plan exists
 *    Rationale: Team plans include admin controls and shared workspaces that
 *    provide marginal value at very low seat counts.
 *
 * 2. UPGRADE: Individual plan with ≥5 seats → should move to Team/Business
 *    Rationale: At scale, Individual plans lack central billing, IP indemnity,
 *    and admin controls. The cost increase may be justified by risk mitigation
 *    and operational efficiency — but we still flag it as an alert.
 *
 * 3. ENTERPRISE CHECK: Enterprise tier with ≤10 seats for a startup
 *    Rationale: Enterprise pricing is designed for 100+ person orgs. Startups
 *    paying enterprise rates at small scale are almost certainly overspending.
 */
export function analyzePlanOptimization(input: Parameters<AuditRule>[0]): AuditRecommendation[] {
  const results: AuditRecommendation[] = [];
  const teamSize = typeof input.generalInfo.teamSize === 'number' ? input.generalInfo.teamSize : 0;

  for (const tool of input.activeTools) {
    const def = TOOL_DATABASE.find((d) => d.id === tool.toolId);
    if (!def || def.plans.length <= 1) continue; // No alternative plans to consider

    const currentPlan = def.plans.find((p) => p.id === tool.planId);
    if (!currentPlan || currentPlan.model !== 'per_seat') continue;

    // ── Downgrade: Team/Enterprise with very few seats ──────────────────
    const isTeamOrEnterprise = tool.planId === 'team' || tool.planId === 'enterprise' || tool.planId === 'business';
    if (isTeamOrEnterprise && tool.seats <= 2) {
      const cheaperPlan = def.plans.find(
        (p) => p.model === 'per_seat' && p.price < currentPlan.price
      );
      if (cheaperPlan) {
        const newCost = cheaperPlan.price * tool.seats;
        const savings = tool.monthlyCost - newCost;
        if (savings > 0) {
          results.push({
            id: `plan-downgrade-${tool.toolId}`,
            type: 'downgrade',
            title: `Downgrade ${def.name} from ${currentPlan.name} to ${cheaperPlan.name}`,
            description: `With only ${tool.seats} seat(s), the ${currentPlan.name} plan's additional features (admin controls, shared workspaces, priority support) provide limited ROI. The ${cheaperPlan.name} plan at $${cheaperPlan.price}/seat delivers the same core AI capabilities.`,
            reasoning: `${def.name} ${currentPlan.name} at $${currentPlan.price}/seat is designed for teams requiring centralized administration and collaboration features. At ${tool.seats} seat(s), these capabilities are underutilized. Downgrading to ${cheaperPlan.name} ($${cheaperPlan.price}/seat) maintains full AI functionality while reducing spend by $${savings}/mo — a ${Math.round((savings / tool.monthlyCost) * 100)}% cost reduction with minimal feature trade-off.`,
            affectedToolIds: [tool.toolId],
            currentMonthlyCost: tool.monthlyCost,
            projectedMonthlyCost: newCost,
            monthlySavings: savings,
            annualSavings: savings * 12,
            confidenceScore: tool.seats === 1 ? 90 : 75,
            confidenceLevel: confidenceFromScore(tool.seats === 1 ? 90 : 75),
          });
        }
      }
    }

    // ── Enterprise overspend for startups ────────────────────────────────
    if ((tool.planId === 'enterprise') && teamSize > 0 && teamSize <= 15) {
      const nextPlan = def.plans.find(
        (p) => p.id !== 'enterprise' && p.model === 'per_seat' && p.price < currentPlan.price
      );
      if (nextPlan) {
        const newCost = nextPlan.price * tool.seats;
        const savings = tool.monthlyCost - newCost;
        if (savings > 0 && !results.some((r) => r.id === `plan-downgrade-${tool.toolId}`)) {
          results.push({
            id: `enterprise-overspend-${tool.toolId}`,
            type: 'downgrade',
            title: `${def.name} Enterprise is likely overkill`,
            description: `Enterprise-tier pricing for ${def.name} is designed for organizations with 100+ users requiring SOC 2 compliance, SSO, and dedicated account management. A ${teamSize}-person startup rarely needs these at current scale.`,
            reasoning: `At $${currentPlan.price}/seat × ${tool.seats} seat(s), your ${def.name} Enterprise spend totals $${tool.monthlyCost}/mo. For a ${teamSize}-person startup, the ${nextPlan.name} plan at $${nextPlan.price}/seat provides equivalent AI capabilities with sufficient rate limits. Enterprise features like custom data retention policies and dedicated infrastructure become cost-justified at 50+ seats. Current spend premium: ${Math.round(((currentPlan.price - nextPlan.price) / nextPlan.price) * 100)}% above ${nextPlan.name} pricing.`,
            affectedToolIds: [tool.toolId],
            currentMonthlyCost: tool.monthlyCost,
            projectedMonthlyCost: newCost,
            monthlySavings: savings,
            annualSavings: savings * 12,
            confidenceScore: 82,
            confidenceLevel: confidenceFromScore(82),
          });
        }
      }
    }

    // ── Upgrade advisory: Many seats on Individual plan ──────────────────
    if ((tool.planId === 'individual' || tool.planId === 'plus' || tool.planId === 'pro') && tool.seats >= 5) {
      const teamPlan = def.plans.find(
        (p) => (p.id === 'team' || p.id === 'business') && p.model === 'per_seat'
      );
      if (teamPlan) {
        const newCost = teamPlan.price * tool.seats;
        const costIncrease = newCost - tool.monthlyCost;
        results.push({
          id: `plan-upgrade-${tool.toolId}`,
          type: 'upgrade',
          title: `Consider ${def.name} ${teamPlan.name} plan for ${tool.seats} users`,
          description: `Running ${tool.seats} users on individual ${currentPlan.name} plans creates operational risk: no centralized billing, no admin controls, and no IP indemnity. The ${teamPlan.name} plan adds organizational safeguards.`,
          reasoning: `While the ${teamPlan.name} plan increases per-seat cost by $${teamPlan.price - currentPlan.price} ($${costIncrease > 0 ? '+' : ''}${costIncrease}/mo total), it provides centralized administration, usage analytics, and — critically — IP indemnification that protects your startup from AI-generated code liability. For ${tool.seats} engineering seats, this is a risk-management investment rather than a pure cost optimization.`,
          affectedToolIds: [tool.toolId],
          currentMonthlyCost: tool.monthlyCost,
          projectedMonthlyCost: newCost,
          monthlySavings: -costIncrease, // Negative = cost increase
          annualSavings: -costIncrease * 12,
          confidenceScore: 60,
          confidenceLevel: confidenceFromScore(60),
        });
      }
    }
  }

  return results;
}
