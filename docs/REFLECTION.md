# Engineering Reflections

Building NeuralCost from scratch over a multi-day sprint provided significant insights into modern React 19 / TS 6 development, architecture design, and leveraging AI effectively.

## 1. Architecture Reversals

### The React Context vs Zustand Pivot
Initially, I planned to use the native React Context API to manage the audit form state. However, as the form grew to include multiple dynamic sub-arrays (adding/removing tools, calculating pricing), Context became a bottleneck. 
- **The Problem**: Every keystroke in the "Seats" input triggered a full re-render of the massive `AuditWizard` component, causing typing lag.
- **The Pivot**: I immediately swapped to Zustand. Zustand's atomic state selectors allowed me to bind inputs directly to their specific state slices without re-rendering the parent container. Furthermore, Zustand's `persist` middleware allowed me to save the audit state to `localStorage` in exactly 3 lines of code—something that would have taken a custom, brittle `useEffect` hook with Context.

### Decoupling the Engine
I initially wrote the logic to calculate "duplicate tools" directly inside the `ResultsPage.tsx` component.
- **The Reversal**: I quickly realized this made the logic untestable without mounting a DOM, and it coupled financial logic to UI rendering.
- **The Fix**: I extracted all logic into pure, deterministic TypeScript functions (`src/features/audit/engine/`). This allowed me to easily test them with Vitest, passing in mock JSON payloads instead of relying on React state.

## 2. Debugging Stories

### The `verbatimModuleSyntax` Struggle
TypeScript 6's strict `verbatimModuleSyntax` caused major headaches during Phase 2. 
- **Symptom**: The Vite dev server crashed continuously with errors like `TS1371: This import is never used as a value and must use 'import type'`.
- **Debugging**: I had imported interfaces like `ActiveTool` using standard `import { ActiveTool }`. I had to systematically audit every component and enforce `import type { ActiveTool }` for type-only imports. While painful, it resulted in a substantially cleaner, smaller compilation bundle.

### Mobile Grid Stacking
- **Symptom**: The "Spend Summary" sidebar was rendering *below* the form on desktop, but I needed it sticky on the right. If I put it on the right in HTML, it rendered *below* the form on mobile (meaning users had to scroll past 10 tools to see the summary).
- **Solution**: I used CSS Grid with responsive `order` classes. The sidebar was placed first in the DOM (`order-1` on mobile) so it's always visible at the top on phones, but on `lg:` screens it was set to `col-span-4` and naturally flowed to the right side of the screen.

## 3. AI Tool Usage & Prompt Engineering

I used AI extensively, but deliberately constrained it.
- **AI Summary Service**: The biggest challenge was getting the LLM to output a punchy, CFO-style summary without bullet points or generic filler ("Based on your inputs..."). 
- I had to engineer a strict zero-shot prompt (documented in `PROMPTS.md`) that explicitly forbade bullet points and injected the exact numeric data as context variables. 

## 4. Final Lessons Learned
- **Pure functions are undefeated.** Separating the UI from the business logic made building the Results Dashboard trivial.
- **Default data wins.** Forcing users to enter the price of ChatGPT Plus is bad UX. Creating `toolDatabase.ts` with predefined plans and prices eliminated 80% of the friction in the audit form.
