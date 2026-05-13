# 🏗 NeuralCost Architecture

This document provides a technical deep-dive into the architectural decisions made for NeuralCost.

## 1. Frontend Architecture

### State Management: Zustand over Context API
We evaluated React Context but chose **Zustand** due to its minimal boilerplate and granular re-rendering. 
- **Persistence**: The `persist` middleware is used to sync `AuditState` directly to `localStorage`. This prevents data loss during the multi-step audit process.
- **Separation of Concerns**: State is strictly decoupled from the UI. Calculations do not happen inside components.

### Type Safety: TypeScript 6 Strict Mode
We enforce `verbatimModuleSyntax: true` across the codebase.
- This ensures that types are entirely erased during compilation, resulting in cleaner, faster builds.
- It forces explicit `import type` declarations, preventing accidental runtime bloat.

## 2. The Audit Engine (Pure Functions)

The core logic of identifying waste is completely decoupled from the React lifecycle.
- **Location**: `src/features/audit/engine/`
- **Pattern**: A "Rule Runner" architecture.
- **Execution**: The orchestrator (`engine/index.ts`) iterates through a list of pure functions (`AuditRule`). Each rule accepts an `AuditInput` and returns either `null` or an `AuditRecommendation`.
- **Why Pure Functions?** By keeping the DOM out of the logic, the engine is 100% unit-testable via Vitest. We can inject mock tool configurations and instantly assert the exact financial output.

## 3. Backend & Infrastructure Integration

### Database (Supabase / PostgreSQL)
The application uses Supabase to store generated audits for public sharing and lead generation.
- **Anonymization**: PII (email, company) is stored in the `leads` table, completely isolated via foreign keys from the `audits` table.
- **Row Level Security (RLS)**: Anonymous users can `INSERT` but only `SELECT` audits where `is_public = true`.

### Transactional Email (Resend)
Used for the "Email me my results" feature. The integration is handled securely via Serverless Functions to prevent exposing the `RESEND_API_KEY` to the client.

### AI Summarization
The `aiSummary.ts` service attempts to call the OpenAI API to generate a personalized executive summary. To prevent brittle UX:
- It uses a **timeout** (AbortSignal).
- It catches all rate limits and network errors.
- It falls back to a deterministic, template-based string generator if the API fails, ensuring the user always sees a summary.

## 4. UI/UX & Animations
- **Tailwind v4**: Utilizes CSS-native configuration instead of `tailwind.config.js`.
- **Framer Motion**: Global animation variants (`fadeInUp`, `staggerContainer`) are centralized in `src/lib/animations.ts` to ensure a consistent, 60fps cinematic feel across page transitions.
