# NeuralCost — Development Log

## Day 1 — 2026-05-10

**Hours worked:** 5

### What I did:
- Initialized Vite + React 19 + TypeScript 6 project
- Configured Tailwind CSS v4 with CSS-native theme system
- Designed and implemented complete design system (Button, Card, GlassCard, Badge, Container)
- Built responsive sticky Navbar with glassmorphism effect and mobile hamburger menu
- Built multi-column Footer with social links
- Implemented RootLayout with animated page transitions (Motion/AnimatePresence)
- Created 7 landing page sections:
  - Hero with animated gradient orbs, headline, CTAs, and interactive dashboard mockup
  - Trusted-by marquee with infinite scroll
  - Features grid (6 cards) with scroll-triggered stagger animation
  - How It Works (3-step flow with connector lines)
  - Savings section with animated counters and before/after comparison
  - FAQ accordion with smooth expand/collapse
  - Bottom CTA with gradient mesh background
- Set up React Router v7 with lazy-loaded pages and code splitting
- Created SEO component with Open Graph and Twitter card support
- Implemented dark/light theme toggle with localStorage persistence
- Built custom hooks: useTheme, useScrollAnimation
- Created utility layer: animations presets, constants, type definitions
- Built placeholder pages: Audit, Results, Share, 404
- TypeScript strict mode — zero errors
- Production build — zero warnings

### What I learned:
- Tailwind CSS v4 uses `@theme` in CSS instead of `tailwind.config.js` — much cleaner
- `framer-motion` has been rebranded to `motion` — import from `motion/react`
- React Router v7 uses `react-router` package (not `react-router-dom`)
- TypeScript 6 deprecated `baseUrl` — use relative paths in `paths` config instead
- Motion's `HTMLMotionProps<'button'>` should be used instead of `ButtonHTMLAttributes` to avoid `onDrag` type conflicts

### Architecture decisions:
- Dark mode as default (aligns with Linear/Vercel aesthetic)
- Feature-based folder structure for scalability
- All animation presets centralized in `lib/animations.ts`
- Data-driven sections — all content lives in `lib/constants.ts`
- Lazy loading all pages for optimal code splitting

### Blockers / what I'm stuck on:
- None. Phase 1 foundation is complete.

### Plan for tomorrow:
- Build audit form with multi-step wizard UI
- Add AI provider selector with popular providers pre-loaded
- Implement local state persistence with localStorage
- Build audit analysis engine (pure functions)
- Design results page with cost breakdown charts

### End Of Day 1

## Day 2 — 2026-05-11

**Hours worked:** 6

### What I did:
- Built dynamic AI spend audit form using Zustand
- Created reusable, styled form components (Input, Select, Label)
- Added multi-tool support with dynamic tool selector
- Implemented plan selectors and real-time pricing summaries
- Added `localStorage` persistence via Zustand middleware
- Improved form responsiveness and layout using 2-column CSS Grid
- Drafted Database and API schemas in `docs/schemas.md`

### What I learned:
- Zustand's `persist` middleware is incredibly powerful and lightweight for saving form state locally.
- Creating a robust `toolDatabase` of default prices significantly reduces user friction compared to manual input.
- CSS Grid with `order` utility works perfectly for stacking sidebars on mobile.

### Blockers / what I'm stuck on:
- Optimizing dynamic pricing calculation performance if the number of tools grows large. Currently using simple reductions which is fine for small stacks.

### Plan for tomorrow:
- Build the audit engine (pure functions for identifying waste).
- Design the Results Dashboard.
- Generate optimization recommendations based on the inputs.