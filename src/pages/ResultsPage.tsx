import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button, Container } from '@/components/ui';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useAuditStore } from '@/features/audit/store/useAuditStore';
import { runAudit } from '@/features/audit/engine';
import { generateTemplateSummary } from '@/features/audit/services/aiSummary';
import type { AuditResult } from '@/features/audit/engine/types';
import {
  ResultsHero,
  RecommendationCard,
  SpendBreakdown,
  AISummaryCard,
  ResultsCTA,
} from '@/features/results';

export default function ResultsPage() {
  const { activeTools, generalInfo } = useAuditStore();
  const [summaryLoading, setSummaryLoading] = useState(true);

  // Run the audit engine on mount
  const result: AuditResult | null = useMemo(() => {
    if (activeTools.length === 0) return null;
    return runAudit({ generalInfo, activeTools });
  }, [activeTools, generalInfo]);

  // Generate AI summary after initial render
  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => {
      result.aiSummary = generateTemplateSummary(result);
      setSummaryLoading(false);
    }, 1200); // Simulate slight delay for premium feel
    return () => clearTimeout(timer);
  }, [result]);

  // No data — redirect back
  if (!result) {
    return (
      <>
        <SEOHead
          title="Audit Results"
          description="View your AI spend audit results."
        />
        <section className="pt-32 pb-20 min-h-screen">
          <Container size="narrow">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={fadeInUp}>
                <div className="w-20 h-20 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-6">
                  <RotateCcw className="w-8 h-8 text-neutral-600" />
                </div>
                <h1 className="text-2xl font-bold text-neutral-200 mb-3">
                  No Audit Data Found
                </h1>
                <p className="text-neutral-500 text-sm max-w-md mx-auto mb-6">
                  It looks like you haven't added any tools yet. Start an audit
                  to see your optimization report.
                </p>
                <Link to="/audit">
                  <Button>Start Your Audit</Button>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`Save ${result.savingsPercentage}% — Audit Results`}
        description={`Your AI stack of ${result.input.activeTools.length} tools costs $${result.totalMonthlyCost}/mo. We found $${result.totalPotentialMonthlySavings}/mo in potential savings.`}
      />
      <section className="pt-24 pb-16 min-h-screen">
        <Container>
          {/* Back nav */}
          <div className="mb-8">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Audit
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* Hero stats */}
            <ResultsHero result={result} />

            {/* AI Summary + Spend Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AISummaryCard
                summary={result.aiSummary}
                loading={summaryLoading}
              />
              <SpendBreakdown
                categories={result.spendByCategory}
              />
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <motion.div variants={fadeInUp}>
                <h2 className="text-xl font-bold text-neutral-100 mb-6 flex items-center gap-2">
                  Optimization Recommendations
                  <span className="text-sm font-normal text-neutral-500">
                    ({result.recommendations.length})
                  </span>
                </h2>
                <div className="space-y-4">
                  {result.recommendations.map((rec, i) => (
                    <RecommendationCard
                      key={rec.id}
                      recommendation={rec}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTAs */}
            <ResultsCTA result={result} />
          </motion.div>
        </Container>
      </section>
    </>
  );
}
