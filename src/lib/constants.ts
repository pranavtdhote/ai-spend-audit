/**
 * Application-wide constants.
 * Single source of truth for site metadata, navigation, feature data, and FAQ.
 */

export const SITE = {
  name: 'NeuralCost',
  tagline: 'AI Spend Intelligence for Startups',
  description:
    'Stop overpaying for AI. Analyze, optimize, and cut your startup\'s AI tooling costs by up to 40%.',
  url: 'https://neuralcost.dev',
  ogImage: '/og-image.png',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const FEATURES = [
  {
    title: 'Cost Breakdown',
    description: 'See exactly where every dollar goes across OpenAI, Anthropic, Cohere, and 20+ AI providers.',
    icon: 'PieChart',
  },
  {
    title: 'Usage Analytics',
    description: 'Track token consumption, API call patterns, and per-team usage with real-time dashboards.',
    icon: 'BarChart3',
  },
  {
    title: 'Waste Detection',
    description: 'AI-powered analysis finds redundant calls, unused models, and over-provisioned resources.',
    icon: 'SearchX',
  },
  {
    title: 'Budget Alerts',
    description: 'Set spending thresholds and get instant Slack/email notifications before costs spike.',
    icon: 'Bell',
  },
  {
    title: 'Team Insights',
    description: 'Attribute AI costs to teams, projects, or features. No more mystery invoices.',
    icon: 'Users',
  },
  {
    title: 'Smart Recommendations',
    description: 'Get actionable suggestions to switch models, batch requests, or cache responses for savings.',
    icon: 'Lightbulb',
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Connect Your Stack',
    description: 'Add your AI provider API keys or upload invoices. Takes under 2 minutes. We never store credentials.',
  },
  {
    step: 2,
    title: 'Get Instant Analysis',
    description: 'Our engine scans your usage patterns, identifies waste, and benchmarks against 500+ startups.',
  },
  {
    step: 3,
    title: 'Save Up to 40%',
    description: 'Implement one-click optimizations. Track savings in real-time. Share reports with your team.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Is my data safe?',
    answer: 'Absolutely. We use read-only API access and never store your API keys after analysis. All data is encrypted in transit and at rest with AES-256.',
  },
  {
    question: 'Which AI providers do you support?',
    answer: 'We support OpenAI, Anthropic, Google AI, Cohere, Mistral, Replicate, Hugging Face, AWS Bedrock, Azure OpenAI, and 15+ more. New integrations ship weekly.',
  },
  {
    question: 'How long does an audit take?',
    answer: 'Most audits complete in under 60 seconds. Complex analyses with multiple providers may take up to 3 minutes.',
  },
  {
    question: 'Do I need to share API keys?',
    answer: 'No. You can upload invoices/CSVs instead, or use our read-only OAuth integrations. We never need write access to your providers.',
  },
  {
    question: 'Is there a free tier?',
    answer: 'Yes. Your first audit is completely free with no credit card required. Free users get 3 audits per month with full optimization recommendations.',
  },
  {
    question: 'Can I share audit results with my team?',
    answer: 'Yes. Every audit generates a shareable link with customizable visibility. Export to PDF, CSV, or embed in Notion/Confluence.',
  },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/neuralcost', icon: 'Twitter' },
  { label: 'GitHub', href: 'https://github.com/neuralcost', icon: 'Github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/neuralcost', icon: 'Linkedin' },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Community', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
} as const;

export const TRUSTED_BY_LOGOS = [
  'StreamFlow',
  'Quantix',
  'NovaByte',
  'Apex Labs',
  'CloudForge',
  'DataPulse',
  'SynthAI',
  'VectorScale',
] as const;
