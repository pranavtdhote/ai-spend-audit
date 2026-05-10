import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, DollarSign, Users } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { label: 'Saved by Startups', value: 2400000, prefix: '$', suffix: '+', icon: DollarSign, color: 'text-accent-400', bg: 'bg-accent-500/10 border-accent-500/20', fmt: 'compact' },
  { label: 'Average Savings', value: 37, prefix: '', suffix: '%', icon: TrendingDown, color: 'text-primary-400', bg: 'bg-primary-500/10 border-primary-500/20', fmt: 'num' },
  { label: 'Startups Audited', value: 520, prefix: '', suffix: '+', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', fmt: 'num' },
];

export function SavingsSection() {
  const { ref, isInView } = useScrollAnimation();
  const c0 = useCounter(2400000, 2000, isInView);
  const c1 = useCounter(37, 1500, isInView);
  const c2 = useCounter(520, 1800, isInView);
  const counters = [c0, c1, c2];

  return (
    <section className="py-24 md:py-32" id="savings" ref={ref}>
      <Container>
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-3">Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4">Real savings from <span className="text-gradient">real startups</span></h2>
          <p className="text-neutral-400 text-lg leading-relaxed">Our users have collectively saved millions in AI costs.</p>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={fadeInUp} className="text-center p-8 rounded-2xl bg-surface-800/40 border border-surface-700/30 hover:border-surface-600/50 transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl ${s.bg} border flex items-center justify-center ${s.color} mx-auto mb-4`}>
                <s.icon className="w-6 h-6" />
              </div>
              <p className={`text-4xl md:text-5xl font-extrabold ${s.color} mb-2`}>
                {s.prefix}{s.fmt === 'compact' ? formatCompactNumber(counters[i]) : counters[i].toLocaleString()}{s.suffix}
              </p>
              <p className="text-sm text-neutral-500 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-danger-500/5 border border-danger-500/15 text-center">
              <p className="text-xs font-semibold text-danger-500 uppercase tracking-wider mb-3">Before NeuralCost</p>
              <p className="text-3xl md:text-4xl font-bold text-neutral-200 mb-1">{formatCurrency(12847)}</p>
              <p className="text-sm text-neutral-500">avg. monthly AI spend</p>
            </div>
            <div className="p-6 rounded-2xl bg-accent-500/5 border border-accent-500/15 text-center">
              <p className="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-3">After NeuralCost</p>
              <p className="text-3xl md:text-4xl font-bold text-accent-400 mb-1">{formatCurrency(8093)}</p>
              <p className="text-sm text-neutral-500">avg. monthly AI spend</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
