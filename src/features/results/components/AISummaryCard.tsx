import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { GlassCard } from '@/components/ui';
import { Sparkles } from 'lucide-react';

interface Props {
  summary: string | null;
  loading?: boolean;
}

export function AISummaryCard({ summary, loading }: Props) {
  return (
    <motion.div variants={fadeInUp}>
      <GlassCard intensity="strong" className="p-6 relative overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-100">
                AI-Generated Summary
              </h3>
              <p className="text-[11px] text-neutral-500">
                Personalized analysis of your AI spend
              </p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-2">
              <div className="h-3 bg-surface-700/50 rounded animate-pulse w-full" />
              <div className="h-3 bg-surface-700/50 rounded animate-pulse w-5/6" />
              <div className="h-3 bg-surface-700/50 rounded animate-pulse w-4/6" />
              <div className="h-3 bg-surface-700/50 rounded animate-pulse w-full" />
              <div className="h-3 bg-surface-700/50 rounded animate-pulse w-3/6" />
            </div>
          ) : summary ? (
            <p className="text-sm text-neutral-300 leading-relaxed italic">
              "{summary}"
            </p>
          ) : (
            <p className="text-sm text-neutral-500">
              Summary could not be generated. Please try again.
            </p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
