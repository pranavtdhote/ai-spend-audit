/**
 * Shared TypeScript types and interfaces for NeuralCost.
 */

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}

/** Feature item for landing page */
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

/** How-it-works step */
export interface Step {
  step: number;
  title: string;
  description: string;
}

/** FAQ item */
export interface FAQItem {
  question: string;
  answer: string;
}

/** Audit tool entry (for the audit form) */
export interface AuditTool {
  id: string;
  provider: string;
  model: string;
  monthlyCost: number;
  callsPerMonth: number;
  avgTokensPerCall: number;
}

/** Audit result summary */
export interface AuditResult {
  totalMonthlySpend: number;
  potentialSavings: number;
  savingsPercentage: number;
  tools: AuditToolResult[];
  generatedAt: string;
}

/** Individual tool result */
export interface AuditToolResult extends AuditTool {
  wasteScore: number; // 0-100
  recommendation: string;
  alternativeProvider?: string;
  alternativeCost?: number;
}

/** Theme mode */
export type ThemeMode = 'dark' | 'light';
