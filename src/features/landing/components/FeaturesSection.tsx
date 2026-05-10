import { motion } from 'motion/react';
import {
  PieChart,
  BarChart3,
  SearchX,
  Bell,
  Users,
  Lightbulb,
} from 'lucide-react';
import { Container, GlassCard } from '@/components/ui';
import { FEATURES } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  PieChart: <PieChart className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  SearchX: <SearchX className="w-6 h-6" />,
  Bell: <Bell className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
};

export function FeaturesSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32" id="features" ref={ref}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4">
            Everything you need to{' '}
            <span className="text-gradient">control AI costs</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            From real-time monitoring to AI-powered recommendations. One
            platform to understand and optimize every dollar of your AI spend.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <GlassCard hover className="p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-5">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
