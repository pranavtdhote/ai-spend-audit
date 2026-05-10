import { motion } from 'motion/react';
import { BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button, Container, GlassCard } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function ResultsPage() {
  return (
    <>
      <SEOHead title="Audit Results" description="View your AI spend audit results and optimization recommendations." />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 min-h-screen">
        <Container size="narrow">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center">
            <motion.div variants={fadeInUp} className="mb-4">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GlassCard intensity="medium" className="p-8 md:p-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-surface-800 flex items-center justify-center mb-4">
                    <BarChart3 className="w-10 h-10 text-neutral-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-neutral-200">Results Dashboard</h1>
                  <p className="text-neutral-500 text-sm max-w-md">Detailed audit results with cost breakdown, waste detection, and optimization recommendations — coming in Phase 2.</p>
                  <Link to="/audit"><Button variant="secondary" size="sm">Start an Audit</Button></Link>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
