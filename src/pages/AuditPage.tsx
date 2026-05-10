import { motion } from 'motion/react';
import { ClipboardList, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button, Container, GlassCard } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function AuditPage() {
  return (
    <>
      <SEOHead
        title="Start Your AI Audit"
        description="Analyze your AI tooling costs in 60 seconds. No signup required."
      />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 min-h-screen">
        <Container size="narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="w-8 h-8 text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4">
                Audit Your AI Spend
              </h1>
              <p className="text-neutral-400 text-lg max-w-lg mx-auto">
                Add your AI tools and their costs below. We'll analyze your
                stack and find optimization opportunities.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <GlassCard intensity="medium" className="p-8 md:p-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-surface-800 flex items-center justify-center mb-4">
                    <ClipboardList className="w-10 h-10 text-neutral-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-300">
                    Audit Form Coming in Phase 2
                  </h3>
                  <p className="text-neutral-500 text-sm max-w-md">
                    The interactive audit form with AI provider selection, cost
                    input, and real-time analysis will be built in the next phase.
                  </p>
                  <Link to="/">
                    <Button variant="secondary" size="sm">
                      Return Home
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
