import { motion } from 'motion/react';
import { Container } from '@/components/ui';
import { TRUSTED_BY_LOGOS } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function TrustedBySection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-16 border-y border-surface-800/50" id="trusted-by" ref={ref}>
      <Container>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-sm text-neutral-500 uppercase tracking-wider font-medium mb-8">
            Trusted by forward-thinking teams at
          </p>

          {/* Logo Marquee */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-950 to-transparent z-10" />

            <div className="flex gap-12 animate-marquee">
              {[...TRUSTED_BY_LOGOS, ...TRUSTED_BY_LOGOS].map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex items-center justify-center min-w-[140px] h-12"
                >
                  <span className="text-lg font-semibold text-neutral-600 whitespace-nowrap tracking-tight">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Marquee animation CSS injected inline for self-containment */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
