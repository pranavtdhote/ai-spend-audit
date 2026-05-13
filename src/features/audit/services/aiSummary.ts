import type { AuditResult } from '../engine/types';
import { formatCurrency } from '@/lib/utils';
import { formatCategoryLabel } from '../engine/calculator';

/**
 * AI Summary Service
 * ──────────────────
 * Generates a personalized ~100 word summary of the audit results.
 * Uses OpenAI or Anthropic API if an API key is provided.
 * Falls back to a deterministic template summary otherwise.
 *
 * Architecture:
 * - The prompt is carefully engineered for finance-literate, startup-aware tone.
 * - Errors (network, rate limits, invalid responses) are caught and gracefully
 *   degraded to the template fallback.
 * - No API key is stored server-side — the user would provide it or we use
 *   our own backend proxy in production.
 *
 * For this MVP, we use the TEMPLATE FALLBACK by default since we don't want
 * to require users to provide API keys during an initial audit.
 */

// ── Prompt Engineering ──────────────────────────────────────────────────────

function buildPrompt(result: AuditResult): string {
  const toolList = result.input.activeTools
    .map((t) => `${t.toolId} (${t.seats} seats, $${t.monthlyCost}/mo)`)
    .join(', ');

  const recList = result.recommendations
    .slice(0, 5)
    .map((r) => `- ${r.title}: save $${r.monthlySavings}/mo (${r.confidenceLevel} confidence)`)
    .join('\n');

  return `You are a senior SaaS cost optimization analyst writing a brief executive summary for a startup founder.

CONTEXT:
- Team size: ${result.input.generalInfo.teamSize || 'unknown'}
- Primary use case: ${result.input.generalInfo.primaryUseCase || 'mixed'}
- Current monthly AI spend: $${result.totalMonthlyCost}
- Current annual AI spend: $${result.totalAnnualCost}
- Active tools: ${toolList}
- Potential monthly savings identified: $${result.totalPotentialMonthlySavings}
- Savings percentage: ${result.savingsPercentage}%

TOP RECOMMENDATIONS:
${recList}

INSTRUCTIONS:
Write a 80-100 word personalized executive summary. Be specific, data-driven, and actionable. Reference exact dollar amounts. Use a professional but approachable tone suitable for a startup CTO or VP Engineering. Do NOT use bullet points — write in flowing prose. Do NOT start with "Based on" or "Your audit shows".`;
}

// ── API Call (with error handling) ──────────────────────────────────────────

export async function generateAISummary(
  result: AuditResult,
  apiKey?: string
): Promise<string> {
  // If no API key, immediately return template
  if (!apiKey) {
    return generateTemplateSummary(result);
  }

  const prompt = buildPrompt(result);

  try {
    // Try OpenAI-compatible endpoint
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(15000), // 15s timeout
    });

    if (!response.ok) {
      console.warn(`AI summary API returned ${response.status}, using template fallback.`);
      return generateTemplateSummary(result);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text || text.length < 30) {
      console.warn('AI summary response was empty or too short, using template fallback.');
      return generateTemplateSummary(result);
    }

    return text;
  } catch (error) {
    console.warn('AI summary generation failed, using template fallback:', error);
    return generateTemplateSummary(result);
  }
}

// ── Template Fallback (Deterministic) ──────────────────────────────────────

export function generateTemplateSummary(result: AuditResult): string {
  const { totalMonthlyCost, totalPotentialMonthlySavings, savingsPercentage, recommendations, spendByCategory } = result;
  const teamSize = result.input.generalInfo.teamSize;
  const useCase = result.input.generalInfo.primaryUseCase;
  const toolCount = result.input.activeTools.length;

  // Already optimized
  if (totalPotentialMonthlySavings < 100) {
    return `Your AI stack of ${toolCount} tool${toolCount !== 1 ? 's' : ''} at ${formatCurrency(totalMonthlyCost)}/mo appears well-optimized for a${teamSize ? ` ${teamSize}-person` : ''} team focused on ${useCase || 'mixed'} workflows. Current spend aligns with industry benchmarks for your stack configuration. We identified minimal optimization opportunities — your procurement strategy is already lean. Continue monitoring as vendor pricing evolves and your team scales.`;
  }

  // Build dynamic summary
  const topCategory = spendByCategory[0];
  const topRec = recommendations[0];
  const highConfRecs = recommendations.filter((r) => r.confidenceLevel === 'high');

  let summary = `Your ${toolCount}-tool AI stack costs ${formatCurrency(totalMonthlyCost)}/mo (${formatCurrency(totalMonthlyCost * 12)}/yr)`;

  if (topCategory) {
    summary += `, with ${formatCategoryLabel(topCategory.category).toLowerCase()} representing ${topCategory.percentage}% of spend`;
  }

  summary += `. We identified ${formatCurrency(totalPotentialMonthlySavings)}/mo in potential savings — a ${savingsPercentage}% reduction.`;

  if (topRec) {
    summary += ` The highest-impact action: ${topRec.title.toLowerCase()}, saving ${formatCurrency(topRec.monthlySavings)}/mo.`;
  }

  if (highConfRecs.length > 0) {
    summary += ` ${highConfRecs.length} recommendation${highConfRecs.length > 1 ? 's carry' : ' carries'} high confidence and can be implemented immediately.`;
  }

  return summary;
}
