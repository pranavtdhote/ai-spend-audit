import type { AuditRecommendation } from '../../audit/engine/types';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { formatCurrency } from '@/lib/utils';
import { GlassCard, Badge } from '@/components/ui';
import type { BadgeVariant } from '@/components/ui/Badge';
import {
  ArrowDownRight,
  Layers,
  ArrowUpRight,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  recommendation: AuditRecommendation;
  index: number;
}

const typeConfig: Record<
  string,
  { label: string; color: BadgeVariant; icon: typeof ArrowDownRight }
> = {
  consolidate: { label: 'Consolidate', color: 'primary', icon: Layers },
  downgrade: { label: 'Downgrade', color: 'success', icon: ArrowDownRight },
  upgrade: { label: 'Upgrade', color: 'warning', icon: ArrowUpRight },
  eliminate: { label: 'Eliminate', color: 'danger', icon: Trash2 },
  alert: { label: 'Advisory', color: 'warning', icon: AlertTriangle },
};

const confidenceColors: Record<string, string> = {
  high: 'text-accent-400',
  medium: 'text-warning-400',
  low: 'text-neutral-400',
};

export function RecommendationCard({ recommendation: rec, index }: Props) {
  const config = typeConfig[rec.type] ?? typeConfig.alert;
  const Icon = config.icon;
  const isPositiveSavings = rec.monthlySavings > 0;

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard intensity="medium" className="p-6 relative overflow-hidden">
        {/* Gradient accent bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
            isPositiveSavings
              ? 'from-accent-500 to-primary-500'
              : 'from-warning-500 to-orange-500'
          }`}
        />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-surface-700/50 flex items-center justify-center shrink-0">
              <Icon className="w-4.5 h-4.5 text-neutral-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-neutral-100 text-sm md:text-base leading-snug">
                {rec.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <Badge variant={config.color}>{config.label}</Badge>
                <span
                  className={`text-xs font-medium ${confidenceColors[rec.confidenceLevel]}`}
                >
                  {rec.confidenceScore}% confidence
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p
              className={`text-lg font-bold ${
                isPositiveSavings ? 'text-accent-400' : 'text-warning-400'
              }`}
            >
              {isPositiveSavings ? '-' : '+'}
              {formatCurrency(Math.abs(rec.monthlySavings))}
              <span className="text-xs font-normal text-neutral-500">/mo</span>
            </p>
            <p className="text-xs text-neutral-500">
              {formatCurrency(Math.abs(rec.annualSavings))}/yr
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
          {rec.description}
        </p>

        {/* Expandable reasoning */}
        <details className="group">
          <summary className="text-xs text-primary-400 cursor-pointer hover:text-primary-300 transition-colors font-medium flex items-center gap-1">
            <span className="group-open:hidden">Show detailed reasoning →</span>
            <span className="hidden group-open:inline">Hide reasoning</span>
          </summary>
          <div className="mt-3 p-3 rounded-lg bg-surface-800/50 border border-surface-700/30">
            <p className="text-xs text-neutral-400 leading-relaxed">
              {rec.reasoning}
            </p>
          </div>
        </details>

        {/* Before / After strip */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-surface-700/30 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Current:</span>
            <span className="text-neutral-300 font-medium">
              {formatCurrency(rec.currentMonthlyCost)}/mo
            </span>
          </div>
          <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Projected:</span>
            <span
              className={`font-medium ${isPositiveSavings ? 'text-accent-400' : 'text-warning-400'}`}
            >
              {formatCurrency(rec.projectedMonthlyCost)}/mo
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
