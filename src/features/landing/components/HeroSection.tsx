import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingDown, DollarSign, Zap, BarChart3 } from 'lucide-react';
import { Button, Badge, Container } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden" id="hero">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container size="default" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge variant="primary" className="text-sm px-4 py-1.5">
              ✨ Trusted by 500+ AI-first startups
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-neutral-50">Stop Overpaying for AI.</span>
            <br />
            <span className="text-gradient-hero">Start Optimizing.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            NeuralCost analyzes your AI tooling stack in 60 seconds. Find hidden
            waste, get optimization playbooks, and cut costs by up to 40% — no
            code changes needed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/audit">
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />} id="hero-cta-primary">
                Audit Your AI Spend — Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="ghost" size="lg" icon={<Play className="w-4 h-4" />} id="hero-cta-secondary">
                See How It Works
              </Button>
            </a>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            variants={fadeInUp}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-accent-500/10 to-primary-500/20 rounded-3xl blur-2xl" />
            <div className="relative glass-strong rounded-2xl p-1.5 shadow-2xl shadow-black/40">
              <div className="bg-surface-900 rounded-xl overflow-hidden">
                {/* Mockup Window Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-danger-500/60" />
                    <div className="w-3 h-3 rounded-full bg-warning-500/60" />
                    <div className="w-3 h-3 rounded-full bg-accent-500/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-surface-800 text-xs text-neutral-500">
                      app.neuralcost.dev/dashboard
                    </div>
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Stat Cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-surface-800/50 rounded-xl p-4 border border-surface-700/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-primary-400" />
                        <span className="text-xs text-neutral-500">Monthly Spend</span>
                      </div>
                      <p className="text-2xl font-bold text-neutral-100">$12,847</p>
                      <p className="text-xs text-danger-500 mt-1">↑ 23% vs last month</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="bg-surface-800/50 rounded-xl p-4 border border-surface-700/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-accent-400" />
                        <span className="text-xs text-neutral-500">Potential Savings</span>
                      </div>
                      <p className="text-2xl font-bold text-accent-400">$4,219</p>
                      <p className="text-xs text-accent-500 mt-1">33% reduction possible</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="bg-surface-800/50 rounded-xl p-4 border border-surface-700/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-warning-500" />
                        <span className="text-xs text-neutral-500">Waste Detected</span>
                      </div>
                      <p className="text-2xl font-bold text-neutral-100">7 issues</p>
                      <p className="text-xs text-warning-500 mt-1">3 critical</p>
                    </motion.div>
                  </div>

                  {/* Bar chart mockup */}
                  <div className="bg-surface-800/30 rounded-xl p-4 border border-surface-700/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-neutral-300">Cost by Provider</span>
                      <BarChart3 className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'OpenAI', width: '78%', cost: '$6,842', color: 'bg-primary-500' },
                        { name: 'Anthropic', width: '45%', cost: '$3,210', color: 'bg-accent-500' },
                        { name: 'Google AI', width: '28%', cost: '$1,895', color: 'bg-purple-500' },
                        { name: 'Cohere', width: '12%', cost: '$900', color: 'bg-orange-400' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: 1.4 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: 'left' }}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-neutral-400">{item.name}</span>
                            <span className="text-neutral-300 font-medium">{item.cost}</span>
                          </div>
                          <div className="h-2 bg-surface-700/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.color}`}
                              style={{ width: item.width }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
