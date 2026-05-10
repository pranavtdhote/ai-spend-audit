import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { SEOHead } from '@/components/seo/SEOHead';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { AuditLayout, AuditWizard } from '@/features/audit';

export default function AuditPage() {
  return (
    <>
      <SEOHead
        title="AI Spend Audit"
        description="Analyze your AI tooling costs. Add your tools to see instant optimization opportunities."
      />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <AuditLayout>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-3xl font-bold text-neutral-50 mb-2">
                Audit Your AI Stack
              </h1>
              <p className="text-neutral-400 text-lg">
                Input your team size and tools below. We'll handle the math and find the waste.
              </p>
            </motion.div>
          </motion.div>

          <AuditWizard />
        </AuditLayout>
      </div>
    </>
  );
}
