import { motion } from 'motion/react';
import { Link2, Search, TrendingDown } from 'lucide-react';
import { Container } from '@/components/ui';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ReactNode } from 'react';

const stepIcons: Record<number, ReactNode> = {
  1: <Link2 className="w-6 h-6" />,
  2: <Search className="w-6 h-6" />,
  3: <TrendingDown className="w-6 h-6" />,
};

const stepGradients: Record<number, string> = {
  1: 'from-primary-500 to-primary-700',
  2: 'from-accent-500 to-accent-600',
  3: 'from-emerald-400 to-emerald-600',
};

export function HowItWorksSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      className="py-24 md:py-32 bg-surface-900/50"
      id="how-it-works"
      ref={ref}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4">
            From zero to savings in{' '}
            <span className="text-gradient">60 seconds</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            No engineering effort. No code changes. Just plug in and start
            saving.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              variants={fadeInUp}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Connector Line */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="absolute left-7 top-16 bottom-0 w-px bg-gradient-to-b from-surface-600 to-transparent" />
              )}

              {/* Step Number */}
              <div className="shrink-0">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stepGradients[step.step]} flex items-center justify-center text-white shadow-lg`}
                >
                  {stepIcons[step.step]}
                </div>
              </div>

              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Step {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
