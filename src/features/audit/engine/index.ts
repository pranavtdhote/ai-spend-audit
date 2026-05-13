import type { AuditInput, AuditResult, AuditRecommendation } from './types';
import { calculateTotalMonthlyCost, calculateSpendByCategory } from './calculator';
import { analyzeDuplicateAssistants } from './rules/duplicateAssistants';
import { analyzeDuplicateCoders } from './rules/duplicateCoders';
import { analyzePlanOptimization } from './rules/planOptimization';
import { analyzeApiSpend } from './rules/apiSpend';
import { analyzeV0Consolidation } from './rules/v0Consolidation';

/**
 * Run the full audit engine against the user's input.
 * Returns a deterministic, financially-grounded result object.
 *
 * Architecture: Each rule is an independent pure function.
 * The orchestrator collects all non-null recommendations,
 * deduplicates, and sorts by highest potential annual savings.
 */
export function runAudit(input: AuditInput): AuditResult {
  const totalMonthlyCost = calculateTotalMonthlyCost(input.activeTools);
  const totalAnnualCost = totalMonthlyCost * 12;
  const spendByCategory = calculateSpendByCategory(input.activeTools);

  // ── Execute all rules ─────────────────────────────────────────────────
  const recommendations: AuditRecommendation[] = [];

  // Single-return rules
  const singleRules = [analyzeDuplicateAssistants, analyzeDuplicateCoders, analyzeV0Consolidation];
  for (const rule of singleRules) {
    const result = rule(input);
    if (result) recommendations.push(result);
  }

  // Multi-return rules
  recommendations.push(...analyzePlanOptimization(input));
  recommendations.push(...analyzeApiSpend(input));

  // ── Deduplicate by id (first wins) ────────────────────────────────────
  const seen = new Set<string>();
  const dedupedRecs = recommendations.filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  // ── Sort: highest savings first, then by confidence ───────────────────
  dedupedRecs.sort((a, b) => {
    if (b.annualSavings !== a.annualSavings) return b.annualSavings - a.annualSavings;
    return b.confidenceScore - a.confidenceScore;
  });

  // ── Aggregate savings (only count positive savings) ───────────────────
  const totalPotentialMonthlySavings = dedupedRecs.reduce(
    (sum, r) => sum + Math.max(0, r.monthlySavings),
    0
  );
  const totalPotentialAnnualSavings = totalPotentialMonthlySavings * 12;
  const savingsPercentage =
    totalMonthlyCost > 0 ? Math.round((totalPotentialMonthlySavings / totalMonthlyCost) * 100) : 0;

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    input,
    totalMonthlyCost,
    totalAnnualCost,
    totalPotentialMonthlySavings,
    totalPotentialAnnualSavings,
    savingsPercentage,
    spendByCategory,
    recommendations: dedupedRecs,
    aiSummary: null, // Populated async by AI summary service
  };
}
