import type { AuditRule } from '../types';
import { confidenceFromScore } from '../calculator';

/**
 * RULE: Duplicate Code Generation Tools
 * ──────────────────────────────────────
 * Detects overlapping code-gen subscriptions: GitHub Copilot + Cursor,
 * GitHub Copilot + Windsurf, or Cursor + Windsurf.
 *
 * Financial logic:
 * - Cursor and Windsurf are full IDE wrappers that bundle AI code completion,
 *   chat, and codebase awareness. They are a SUPERSET of GitHub Copilot's
 *   feature set.
 * - Running Copilot alongside Cursor/Windsurf means paying twice for the
 *   same core capability (inline code completion).
 * - Savings = 100% of Copilot's cost when an alternative is present.
 * - If Cursor + Windsurf both present, suggest keeping the one with more seats.
 */
export const analyzeDuplicateCoders: AuditRule = (input) => {
  const copilot = input.activeTools.find((t) => t.toolId === 'copilot');
  const cursor = input.activeTools.find((t) => t.toolId === 'cursor');
  const windsurf = input.activeTools.find((t) => t.toolId === 'windsurf');

  // Case 1: Copilot + Cursor/Windsurf — recommend dropping Copilot
  if (copilot && (cursor || windsurf)) {
    const alternative = cursor ?? windsurf;
    const altName = cursor ? 'Cursor' : 'Windsurf';
    const monthlySavings = copilot.monthlyCost;
    const confidenceScore = 85;

    return {
      id: 'dup-coders-copilot',
      type: 'consolidate',
      title: `Drop GitHub Copilot — ${altName} already covers this`,
      description: `${altName} includes built-in AI code completion, chat, and codebase indexing — a superset of GitHub Copilot's features. Running both simultaneously creates direct functional overlap.`,
      reasoning: `GitHub Copilot provides inline code suggestions, which is a subset of ${altName}'s integrated AI capabilities including multi-file editing, agentic workflows, and context-aware chat. Retaining Copilot alongside ${altName} for ${copilot.seats} seat(s) at $${copilot.monthlyCost}/mo delivers no incremental productivity gain. Eliminating this redundancy reduces your code-gen tooling spend by ${Math.round((copilot.monthlyCost / (copilot.monthlyCost + (alternative?.monthlyCost ?? 0))) * 100)}%.`,
      affectedToolIds: ['copilot', alternative?.toolId ?? ''].filter(Boolean),
      currentMonthlyCost: copilot.monthlyCost + (alternative?.monthlyCost ?? 0),
      projectedMonthlyCost: alternative?.monthlyCost ?? 0,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      confidenceScore,
      confidenceLevel: confidenceFromScore(confidenceScore),
    };
  }

  // Case 2: Cursor + Windsurf — similar overlap
  if (cursor && windsurf) {
    const keepCursor = cursor.seats >= windsurf.seats;
    const keep = keepCursor ? cursor : windsurf;
    const drop = keepCursor ? windsurf : cursor;
    const keepName = keepCursor ? 'Cursor' : 'Windsurf';
    const dropName = keepCursor ? 'Windsurf' : 'Cursor';
    const monthlySavings = drop.monthlyCost;

    return {
      id: 'dup-coders-ide',
      type: 'consolidate',
      title: `Consolidate AI IDEs — Drop ${dropName}`,
      description: `Cursor and Windsurf are both AI-native IDE wrappers with near-identical feature sets. Running both creates redundant licensing costs without meaningful capability gain.`,
      reasoning: `Both Cursor and Windsurf provide AI-assisted code completion, multi-file editing, and chat functionality built on the same foundation (VS Code fork). Standardizing on ${keepName} across your ${keep.seats} engineering seat(s) eliminates $${monthlySavings}/mo in redundant tooling while maintaining full capability coverage.`,
      affectedToolIds: ['cursor', 'windsurf'],
      currentMonthlyCost: cursor.monthlyCost + windsurf.monthlyCost,
      projectedMonthlyCost: keep.monthlyCost,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      confidenceScore: 80,
      confidenceLevel: confidenceFromScore(80),
    };
  }

  return null;
};
