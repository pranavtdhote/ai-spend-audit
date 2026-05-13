import type { ActiveTool } from '../types';
import type { CategorySpend } from './types';
import { TOOL_DATABASE } from '../constants/toolDatabase';

/**
 * Calculate the total monthly cost across all active tools.
 */
export function calculateTotalMonthlyCost(tools: ActiveTool[]): number {
  return tools.reduce((sum, t) => sum + t.monthlyCost, 0);
}

/**
 * Break down spend by tool category (assistant, coding, api).
 */
export function calculateSpendByCategory(tools: ActiveTool[]): CategorySpend[] {
  const totalSpend = calculateTotalMonthlyCost(tools);
  if (totalSpend === 0) return [];

  const categoryMap = new Map<string, { spend: number; count: number }>();

  for (const tool of tools) {
    const def = TOOL_DATABASE.find((d) => d.id === tool.toolId);
    const cat = def?.category ?? 'other';
    const existing = categoryMap.get(cat) ?? { spend: 0, count: 0 };
    categoryMap.set(cat, {
      spend: existing.spend + tool.monthlyCost,
      count: existing.count + 1,
    });
  }

  return Array.from(categoryMap.entries())
    .map(([category, { spend, count }]) => ({
      category,
      spend,
      percentage: Math.round((spend / totalSpend) * 100),
      toolCount: count,
    }))
    .sort((a, b) => b.spend - a.spend);
}

/**
 * Format a category label for display.
 */
export function formatCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    assistant: 'AI Assistants',
    coding: 'Code Generation',
    api: 'API Usage',
    other: 'Other',
  };
  return labels[category] ?? category;
}

/**
 * Determine a confidence level from a numeric score.
 */
export function confidenceFromScore(score: number): 'high' | 'medium' | 'low' {
  if (score >= 75) return 'high';
  if (score >= 45) return 'medium';
  return 'low';
}

/**
 * Get the per-seat cost for a specific tool on a specific plan.
 * Returns 0 for usage-based plans.
 */
export function getPerSeatCost(toolId: string, planId: string): number {
  const def = TOOL_DATABASE.find((d) => d.id === toolId);
  const plan = def?.plans.find((p) => p.id === planId);
  if (!plan || plan.model === 'usage') return 0;
  return plan.price;
}
