import { motion } from 'motion/react';
import { Ghost, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button, Container } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="404 — Page Not Found" noIndex />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 min-h-screen flex items-center">
        <Container size="narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Ghost className="w-20 h-20 text-neutral-700 mx-auto mb-6" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-extrabold text-gradient mb-4"
            >
              404
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-400 mb-2"
            >
              This page doesn't exist
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-neutral-500 mb-8"
            >
              The page you're looking for has been moved, deleted, or never existed.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/">
                <Button icon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
