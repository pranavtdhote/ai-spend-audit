import type { AuditResult } from '../../audit/engine/types';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { formatCurrency } from '@/lib/utils';
import { GlassCard, Button } from '@/components/ui';
import { ExternalLink, Download, MessageSquare, ArrowRight } from 'lucide-react';

interface Props {
  result: AuditResult;
}

export function ResultsCTA({ result }: Props) {
  const highSavings = result.totalPotentialMonthlySavings >= 500;

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      {/* Credex Consultation CTA — only for high-savings scenarios */}
      {highSavings && (
        <GlassCard intensity="strong" className="p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-accent-500/10 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-primary-400" />
                <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-50 mb-2">
                Unlock{' '}
                <span className="text-accent-400">
                  {formatCurrency(result.totalPotentialAnnualSavings)}
                </span>{' '}
                in annual savings
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Your AI spend has significant optimization potential. Schedule a
                free 30-minute consultation with our cost engineering team to
                implement these recommendations and identify additional savings
                unique to your stack.
              </p>
            </div>
            <Button
              size="lg"
              className="shrink-0 whitespace-nowrap"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book Free Consultation
            </Button>
          </div>
        </GlassCard>
      )}

      {/* Share + Export */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="secondary"
          fullWidth
          icon={<ExternalLink className="w-4 h-4" />}
          className="justify-center"
        >
          Share Report
        </Button>
        <Button
          variant="outline"
          fullWidth
          icon={<Download className="w-4 h-4" />}
          className="justify-center"
        >
          Export PDF
        </Button>
      </div>
    </motion.div>
  );
}
