import type { AuditResult } from '../../audit/engine/types';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { formatCurrency } from '@/lib/utils';
import { TrendingDown, DollarSign, Calendar, Percent } from 'lucide-react';
import { GlassCard } from '@/components/ui';

interface Props {
  result: AuditResult;
}

function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  subtext?: string;
  icon: typeof DollarSign;
  accent?: boolean;
}) {
  return (
    <GlassCard intensity="medium" className="p-5 md:p-6">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accent
              ? 'bg-accent-500/15 text-accent-400'
              : 'bg-primary-500/15 text-primary-400'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-sm text-neutral-400 mb-1">{label}</p>
      <p
        className={`text-2xl md:text-3xl font-bold ${
          accent ? 'text-accent-400' : 'text-neutral-50'
        }`}
      >
        {value}
      </p>
      {subtext && (
        <p className="text-xs text-neutral-500 mt-1">{subtext}</p>
      )}
    </GlassCard>
  );
}

export function ResultsHero({ result }: Props) {
  const hasSignificantSavings = result.totalPotentialMonthlySavings >= 100;

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-4">
          <TrendingDown className="w-4 h-4" />
          {hasSignificantSavings
            ? `${result.savingsPercentage}% optimization potential found`
            : 'Your stack is well-optimized'}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-50 mb-3">
          {hasSignificantSavings ? (
            <>
              Save up to{' '}
              <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                {formatCurrency(result.totalPotentialAnnualSavings)}/year
              </span>
            </>
          ) : (
            'Your AI Stack is Already Lean'
          )}
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          {hasSignificantSavings
            ? `We analyzed ${result.input.activeTools.length} tools and found ${result.recommendations.length} actionable optimizations.`
            : `We analyzed ${result.input.activeTools.length} tools and your current configuration is near-optimal. Keep monitoring as your team scales.`}
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Monthly Spend"
          value={formatCurrency(result.totalMonthlyCost)}
          subtext={`${result.input.activeTools.length} active tools`}
          icon={DollarSign}
        />
        <StatCard
          label="Annual Spend"
          value={formatCurrency(result.totalAnnualCost)}
          subtext="projected at current rate"
          icon={Calendar}
        />
        <StatCard
          label="Monthly Savings"
          value={formatCurrency(result.totalPotentialMonthlySavings)}
          subtext={`${result.recommendations.filter((r) => r.monthlySavings > 0).length} optimizations`}
          icon={TrendingDown}
          accent
        />
        <StatCard
          label="Savings Rate"
          value={`${result.savingsPercentage}%`}
          subtext="of current spend"
          icon={Percent}
          accent
        />
      </motion.div>
    </motion.section>
  );
}
