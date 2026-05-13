import type { AuditRule, AuditRecommendation } from '../types';
import { confidenceFromScore } from '../calculator';

/**
 * RULE: API Spend Alerts
 * ──────────────────────
 * For usage-based API tools (OpenAI API, Anthropic API, Gemini API),
 * we cannot infer savings from plan downgrades since they don't have plans.
 * Instead, we issue advisory alerts based on spend thresholds.
 *
 * Thresholds:
 * - >$500/mo:  Recommend investigating volume discounts, provisioned throughput,
 *              or batching APIs to reduce per-token cost.
 * - >$200/mo:  Suggest implementing token caching, prompt optimization, or
 *              model tiering (use cheaper models for simple tasks).
 * - Multiple APIs: If using 2+ API providers, suggest evaluating consolidation
 *              to leverage volume pricing from a single provider.
 */
export function analyzeApiSpend(input: Parameters<AuditRule>[0]): AuditRecommendation[] {
  const results: AuditRecommendation[] = [];
  const apiTools = input.activeTools.filter((t) =>
    ['openai_api', 'anthropic_api', 'gemini_api'].includes(t.toolId)
  );

  if (apiTools.length === 0) return results;

  // ── High API spend alert ──────────────────────────────────────────────
  for (const tool of apiTools) {
    const name = tool.toolId === 'openai_api' ? 'OpenAI' : tool.toolId === 'anthropic_api' ? 'Anthropic' : 'Google Gemini';

    if (tool.monthlyCost >= 500) {
      const estimatedSavings = Math.round(tool.monthlyCost * 0.2); // ~20% from optimization
      results.push({
        id: `api-high-spend-${tool.toolId}`,
        type: 'alert',
        title: `High ${name} API Spend — Investigate Volume Options`,
        description: `Your ${name} API spend of $${tool.monthlyCost}/mo qualifies for enterprise volume pricing and provisioned throughput discounts. At this spend level, direct procurement engagement typically yields 15-25% cost reductions.`,
        reasoning: `${name} API costs above $500/mo indicate production-scale usage that warrants optimization review. Key levers include: (1) Provisioned throughput commitments for 15-20% discount, (2) Prompt caching to reduce redundant token processing, (3) Model tiering — routing simpler tasks to cost-efficient models (e.g., GPT-4o Mini, Claude 3.5 Haiku) while reserving frontier models for complex reasoning. Estimated optimization potential: $${estimatedSavings}/mo based on industry benchmarks.`,
        affectedToolIds: [tool.toolId],
        currentMonthlyCost: tool.monthlyCost,
        projectedMonthlyCost: tool.monthlyCost - estimatedSavings,
        monthlySavings: estimatedSavings,
        annualSavings: estimatedSavings * 12,
        confidenceScore: 55,
        confidenceLevel: confidenceFromScore(55),
      });
    } else if (tool.monthlyCost >= 200) {
      const estimatedSavings = Math.round(tool.monthlyCost * 0.15);
      results.push({
        id: `api-optimize-${tool.toolId}`,
        type: 'alert',
        title: `Optimize ${name} API Token Usage`,
        description: `At $${tool.monthlyCost}/mo, implementing prompt optimization and model tiering could yield meaningful savings without impacting output quality.`,
        reasoning: `Token-level optimizations such as prompt compression (system prompt caching), response length limits, and routing simple classification/extraction tasks to smaller models can reduce ${name} API costs by 10-20%. These are engineering investments with high ROI at your current spend level.`,
        affectedToolIds: [tool.toolId],
        currentMonthlyCost: tool.monthlyCost,
        projectedMonthlyCost: tool.monthlyCost - estimatedSavings,
        monthlySavings: estimatedSavings,
        annualSavings: estimatedSavings * 12,
        confidenceScore: 45,
        confidenceLevel: confidenceFromScore(45),
      });
    }
  }

  // ── Multiple API providers — consolidation opportunity ─────────────────
  if (apiTools.length >= 2) {
    const totalApiSpend = apiTools.reduce((s, t) => s + t.monthlyCost, 0);
    if (totalApiSpend > 100) {
      const estimatedSavings = Math.round(totalApiSpend * 0.1);
      results.push({
        id: 'api-consolidation',
        type: 'consolidate',
        title: 'Evaluate API Provider Consolidation',
        description: `You're using ${apiTools.length} API providers with a combined spend of $${totalApiSpend}/mo. Consolidating to a primary provider may unlock volume pricing.`,
        reasoning: `Running parallel API provider relationships splits your usage volume, preventing you from reaching pricing tiers with any single vendor. Consolidating 70-80% of inference volume through one provider while maintaining a secondary for specialized tasks can yield volume discount eligibility. Note: This should be balanced against vendor lock-in risk and model-specific quality requirements for your ${input.generalInfo.primaryUseCase || 'mixed'} use case.`,
        affectedToolIds: apiTools.map((t) => t.toolId),
        currentMonthlyCost: totalApiSpend,
        projectedMonthlyCost: totalApiSpend - estimatedSavings,
        monthlySavings: estimatedSavings,
        annualSavings: estimatedSavings * 12,
        confidenceScore: 40,
        confidenceLevel: confidenceFromScore(40),
      });
    }
  }

  return results;
}
