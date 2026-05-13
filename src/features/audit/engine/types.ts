import type { ActiveTool, GeneralInfo } from '../types';

// ── Recommendation Types ──────────────────────────────────────────────────────

export type RecommendationType =
  | 'consolidate'  // Remove overlapping tools
  | 'downgrade'    // Switch to cheaper same-vendor plan
  | 'upgrade'      // Switch to team/business plan (saves per-seat at scale)
  | 'eliminate'    // Drop a tool entirely
  | 'alert';       // Advisory (e.g., high API spend, volume discounts)

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface AuditRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  reasoning: string;
  affectedToolIds: string[];       // References ActiveTool.toolId
  currentMonthlyCost: number;
  projectedMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  confidenceScore: number;         // 0–100
  confidenceLevel: ConfidenceLevel;
}

// ── Engine Input / Output ─────────────────────────────────────────────────────

export interface AuditInput {
  generalInfo: GeneralInfo;
  activeTools: ActiveTool[];
}

export interface AuditResult {
  id: string;
  createdAt: string;
  input: AuditInput;

  // Aggregate spend
  totalMonthlyCost: number;
  totalAnnualCost: number;

  // Savings
  totalPotentialMonthlySavings: number;
  totalPotentialAnnualSavings: number;
  savingsPercentage: number;

  // Breakdown
  spendByCategory: CategorySpend[];
  recommendations: AuditRecommendation[];

  // AI-generated (populated async)
  aiSummary: string | null;
}

export interface CategorySpend {
  category: string;
  spend: number;
  percentage: number;
  toolCount: number;
}

// ── Rule System ───────────────────────────────────────────────────────────────

export type AuditRule = (input: AuditInput) => AuditRecommendation | null;
