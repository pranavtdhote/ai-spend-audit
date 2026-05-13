import type { AuditRule } from '../types';
import { confidenceFromScore } from '../calculator';

/**
 * RULE: Duplicate AI Assistants
 * ─────────────────────────────
 * Detects when a team is paying for BOTH ChatGPT and Claude subscriptions
 * (non-API). Recommends standardizing on one to eliminate functional overlap.
 *
 * Financial logic:
 * - ChatGPT Plus ($20) and Claude Pro ($20) have ~80% feature overlap for
 *   most startup use cases (writing, brainstorming, research).
 * - For coding-first teams, Claude has stronger code output; for mixed use,
 *   ChatGPT has broader ecosystem (plugins, GPTs, DALL-E).
 * - Savings = 100% of the dropped tool's monthly cost.
 */
export const analyzeDuplicateAssistants: AuditRule = (input) => {
  const chatgpt = input.activeTools.find((t) => t.toolId === 'chatgpt');
  const claude = input.activeTools.find((t) => t.toolId === 'claude');

  if (!chatgpt || !claude) return null;

  const useCase = input.generalInfo.primaryUseCase;
  const isCodingFirst = useCase === 'coding' || useCase === 'data';

  // Recommend keeping the tool with more seats, or Claude for coding teams
  const keepClaude = isCodingFirst || claude.seats >= chatgpt.seats;
  const toolToKeep = keepClaude ? claude : chatgpt;
  const toolToDrop = keepClaude ? chatgpt : claude;
  const keepName = keepClaude ? 'Claude' : 'ChatGPT';
  const dropName = keepClaude ? 'ChatGPT' : 'Claude';

  const monthlySavings = toolToDrop.monthlyCost;
  const confidenceScore = monthlySavings > 100 ? 88 : 78;

  return {
    id: 'dup-assistants',
    type: 'consolidate',
    title: `Consolidate AI Assistants — Drop ${dropName}`,
    description: `Your team is subscribed to both ChatGPT and Claude. These tools share approximately 80% of their core functionality for ${useCase || 'general'} workflows. Standardizing on ${keepName} eliminates redundant spend.`,
    reasoning: `Maintaining parallel subscriptions to ChatGPT and Claude creates functional redundancy across your ${input.activeTools.find(t => t === toolToDrop)?.seats ?? 1} ${dropName} seat(s). ${keepName} is the recommended retention based on your ${isCodingFirst ? 'engineering-first use case' : 'team allocation'}. The ${dropName} subscription provides marginal incremental value that does not justify the additional $${monthlySavings}/mo outlay for a team of ${typeof input.generalInfo.teamSize === 'number' ? input.generalInfo.teamSize : 'your'} size.`,
    affectedToolIds: [chatgpt.toolId, claude.toolId],
    currentMonthlyCost: chatgpt.monthlyCost + claude.monthlyCost,
    projectedMonthlyCost: toolToKeep.monthlyCost,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    confidenceScore,
    confidenceLevel: confidenceFromScore(confidenceScore),
  };
};
