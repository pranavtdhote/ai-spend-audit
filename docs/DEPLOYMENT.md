# Deployment & Final Submission Guide

This document serves as the final checklist before pushing NeuralCost to production and submitting the assignment.

## 1. Vercel Deployment Guide
1. Push the final repository to GitHub.
2. In the Vercel dashboard, click **Add New Project** and select the repository.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add the following Environment Variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `OPENAI_API_KEY` (Optional, for AI Summary service)
7. Click **Deploy**.

## 2. Lighthouse Optimization Checklist
To ensure the "startup MVP" feels premium, it must score >95 on performance.
- [x] **Code Splitting**: Vite automatically splits the heavy `runAudit` engine into its own chunk (`engine-[hash].js`), keeping the initial load fast.
- [x] **Asset Optimization**: Ensure any images used in the hero are WebP or optimized SVGs.
- [x] **CSS Minification**: Tailwind v4 automatically handles tree-shaking and minification.
- [x] **Font Loading**: `Inter` and `Outfit` fonts should use `font-display: swap` to prevent render-blocking.
- [x] **React Compiler/Memoization**: The Results engine execution is wrapped in `useMemo` so it doesn't recalculate on meaningless renders.

## 3. Accessibility (a11y) Checklist
- [x] All `<input>` fields have explicitly associated `<label>` tags (handled by the custom `Input` component).
- [x] Semantic HTML: Main sections use `<section>`, headings follow `h1 -> h2 -> h3` hierarchy without skipping levels.
- [x] Focus States: The `glassmorphism` elements use `focus-visible:ring-accent-500` to ensure keyboard navigation is visible.
- [x] Color Contrast: The dark mode palette (Neutral 900 background with Neutral 100 text) passes WCAG AA contrast ratios.

## 4. Final Submission Checklist
- [x] **Working Prototype**: The full audit flow (Landing -> Form -> Results) works flawlessly and locally persists.
- [x] **Tests Pass**: `npx vitest run` executes successfully.
- [x] **CI/CD Built**: GitHub Actions workflow is present in `.github/workflows/ci.yml`.
- [x] **Backend Architecture Defined**: Supabase schema, RLS policies, and Resend mock services are documented.
- [x] **Documentation Complete**: `README.md`, `ARCHITECTURE.md`, `DEVLOG.md`, `GTM.md`, and 8 other strategic documents are present.

## 5. Final Repository Structure
```text
ai-spend-audit/
├── .github/workflows/ci.yml
├── docs/                     # Strategic documentation (GTM, Economics, Prompts, etc.)
│   ├── SUPABASE_SCHEMA.sql   # Database schemas
│   └── ...
├── src/
│   ├── components/ui/        # Reusable primitive components (Button, Card, Input)
│   ├── features/
│   │   ├── audit/            # The core form and pure-function Engine
│   │   ├── landing/          # Landing page sections
│   │   └── results/          # Results dashboard and visual analytics
│   ├── lib/                  # Utilities (animations, formatting, tailwind merge)
│   ├── pages/                # Route definitions
│   └── test/                 # Vitest setup
├── index.html
├── package.json
├── tailwind.config.js        # v4 CSS setup
├── tsconfig.json             # Strict TS6 configuration
└── vitest.config.ts
```

## 6. Git Commit Strategy & Conventional Commits
The repository follows strict Conventional Commits to generate clean changelogs.

**Examples used in this project:**
- `feat: implement rule-based audit recommendation engine` (Minor release)
- `fix: resolve verbatimModuleSyntax type import errors in AuditWizard` (Patch release)
- `style: apply dark glassmorphism gradients to ResultsHero` (No release)
- `docs: generate GTM, Economics, and User Interview documentation` (No release)
- `test: add Vitest configuration and 5 engine unit tests` (No release)
- `chore: configure GitHub Actions CI/CD pipeline` (No release)

**Final Commit Strategy before handoff:**
```bash
git add .
git commit -m "feat: complete Phase 5 backend architecture, tests, and startup documentation"
git push origin main
```
