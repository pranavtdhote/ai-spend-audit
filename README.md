# NeuralCost — AI Spend Intelligence for Startups

> Stop overpaying for AI. Analyze, optimize, and cut your startup's AI tooling costs by up to 40%.

**NeuralCost** is a modern SaaS application that helps startups understand and optimize their AI spending. Upload your AI provider invoices or connect via API, get instant cost analysis, waste detection, and actionable optimization recommendations — in under 60 seconds.

## ✨ Features

- **Cost Breakdown** — See where every dollar goes across 20+ AI providers
- **Usage Analytics** — Track token consumption and API call patterns
- **Waste Detection** — AI-powered analysis finds redundant calls and unused models
- **Budget Alerts** — Slack/email notifications before costs spike
- **Team Insights** — Attribute AI costs to teams, projects, or features
- **Smart Recommendations** — Actionable suggestions to optimize spend

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-native config) |
| Routing | React Router v7 |
| Animations | Motion (formerly Framer Motion) |
| Icons | Lucide React |
| SEO | react-helmet-async |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/neuralcost.git
cd neuralcost

# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server starts at `http://localhost:5173`.

## 📁 Project Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Design system primitives (Button, Card, Badge...)
│   ├── layout/          # Navbar, Footer, RootLayout
│   └── seo/             # SEOHead component
├── features/            # Feature-specific modules
│   ├── landing/         # Landing page sections
│   └── audit/           # Audit form (Phase 2)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, constants, animation presets
├── pages/               # Route-level page components
├── styles/              # Global CSS + Tailwind theme
└── types/               # Shared TypeScript types
```

## 📐 Design System

- **Theme**: Dark-first design with optional light mode
- **Colors**: Indigo primary (#6366f1), Emerald accent (#10b981)
- **Typography**: Inter (Google Fonts)
- **Components**: Button, Card, GlassCard, Badge, Container
- **Effects**: Glassmorphism, gradient text, glow borders, float animations

## 🗺 Roadmap

- [x] **Phase 1** — Frontend foundation, design system, landing page
- [ ] **Phase 2** — Audit form, local state persistence, results engine
- [ ] **Phase 3** — Shareable reports, PDF export, team sharing
- [ ] **Phase 4** — API integrations, real provider connections
- [ ] **Phase 5** — User accounts, billing, analytics dashboard

## 🚢 Deployment

Build the production bundle:

```bash
npm run build
```

The output is in `dist/`. Deploy to any static hosting:
- **Vercel**: `npx vercel`
- **Netlify**: Connect repo and set build command to `npm run build`
- **Cloudflare Pages**: Set build output directory to `dist`

## 📄 License

MIT
