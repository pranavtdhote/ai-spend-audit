import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { fadeInUp } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function CTASection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="cta" ref={ref}>
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free forever for your first 3 audits
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-50 mb-6 leading-tight">
            Ready to cut your AI costs
            <br />
            <span className="text-gradient">by up to 40%?</span>
          </h2>

          <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ startups already saving thousands per month on AI tooling.
            No credit card required. Results in 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/audit">
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />} id="cta-primary">
                Start Your Free Audit
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" id="cta-secondary">
                Learn More
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
