import type { AuditRule } from '../types';
import { confidenceFromScore } from '../calculator';

/**
 * RULE: v0 Consolidation
 * ──────────────────────
 * If the team uses Cursor or Windsurf (which have strong UI/frontend
 * generation capabilities) AND v0 by Vercel, suggest evaluating whether
 * the v0 subscription is strictly necessary.
 *
 * Financial logic:
 * - Cursor and Windsurf both include multi-file code generation and
 *   frontend scaffolding capabilities.
 * - v0's primary value is rapid UI prototyping with Vercel deployment.
 * - For teams already using a full AI IDE, v0 may be a nice-to-have
 *   rather than a necessity.
 * - Lower confidence because v0's unique value prop (design-to-code) is
 *   legitimately differentiated for design-heavy teams.
 */
export const analyzeV0Consolidation: AuditRule = (input) => {
  const v0 = input.activeTools.find((t) => t.toolId === 'v0');
  const cursor = input.activeTools.find((t) => t.toolId === 'cursor');
  const windsurf = input.activeTools.find((t) => t.toolId === 'windsurf');

  if (!v0 || (!cursor && !windsurf)) return null;

  const altName = cursor ? 'Cursor' : 'Windsurf';
  const monthlySavings = v0.monthlyCost;
  const confidenceScore = 50; // Lower — v0 has differentiated value

  return {
    id: 'v0-consolidation',
    type: 'consolidate',
    title: `Evaluate v0 Necessity — ${altName} May Cover This`,
    description: `v0's UI prototyping features overlap with ${altName}'s code generation capabilities. Unless your team heavily relies on v0's design-to-code pipeline, this subscription may be eliminable.`,
    reasoning: `${altName} provides AI-powered frontend code generation including component scaffolding, which partially overlaps with v0's core value proposition. However, v0 excels specifically in design-to-code workflows and Vercel-native deployment previews. If your team's primary ${input.generalInfo.primaryUseCase || 'development'} workflow does not heavily involve rapid UI prototyping from visual prompts, the $${v0.monthlyCost}/mo v0 spend may be redirectable. Confidence is moderate due to v0's differentiated capabilities.`,
    affectedToolIds: ['v0', cursor ? 'cursor' : 'windsurf'],
    currentMonthlyCost: v0.monthlyCost + (cursor?.monthlyCost ?? windsurf?.monthlyCost ?? 0),
    projectedMonthlyCost: cursor?.monthlyCost ?? windsurf?.monthlyCost ?? 0,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    confidenceScore,
    confidenceLevel: confidenceFromScore(confidenceScore),
  };
};
