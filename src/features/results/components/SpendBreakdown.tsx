import type { CategorySpend } from '../../audit/engine/types';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { formatCurrency } from '@/lib/utils';
import { formatCategoryLabel } from '../../audit/engine/calculator';
import { GlassCard } from '@/components/ui';

interface Props {
  categories: CategorySpend[];
}

const categoryColors: Record<string, string> = {
  coding: 'bg-primary-500',
  assistant: 'bg-accent-500',
  api: 'bg-warning-500',
  other: 'bg-neutral-500',
};

export function SpendBreakdown({ categories }: Props) {
  if (categories.length === 0) return null;

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard intensity="medium" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-100 mb-6">
          Spend by Category
        </h3>

        {/* Stacked bar */}
        <div className="flex h-3 rounded-full overflow-hidden bg-surface-700/50 mb-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.category}
              className={`${categoryColors[cat.category] ?? 'bg-neutral-500'} first:rounded-l-full last:rounded-r-full`}
              initial={{ width: 0 }}
              animate={{ width: `${cat.percentage}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          ))}
        </div>

        {/* Category legend */}
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.category} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-sm ${categoryColors[cat.category] ?? 'bg-neutral-500'}`}
                />
                <span className="text-sm text-neutral-300">
                  {formatCategoryLabel(cat.category)}
                </span>
                <span className="text-xs text-neutral-500">
                  {cat.toolCount} tool{cat.toolCount > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-neutral-200">
                  {formatCurrency(cat.spend)}
                </span>
                <span className="text-xs text-neutral-500 w-10 text-right">
                  {cat.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
