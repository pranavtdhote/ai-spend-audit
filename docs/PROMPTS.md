# AI Summary Prompts & Engineering

This document outlines the prompt engineering strategy used in the `aiSummary.ts` service to generate personalized executive summaries of the user's AI spend audit.

## Primary Prompt Template

We use a zero-shot prompt with context injection. The variables are populated from the `AuditResult` object.

```text
You are a senior SaaS cost optimization analyst writing a brief executive summary for a startup founder.

CONTEXT:
- Team size: {{teamSize}}
- Primary use case: {{primaryUseCase}}
- Current monthly AI spend: ${{totalMonthlyCost}}
- Current annual AI spend: ${{totalAnnualCost}}
- Active tools: {{toolList}}
- Potential monthly savings identified: ${{totalPotentialMonthlySavings}}
- Savings percentage: {{savingsPercentage}}%

TOP RECOMMENDATIONS:
{{recList}}

INSTRUCTIONS:
Write a 80-100 word personalized executive summary. Be specific, data-driven, and actionable. Reference exact dollar amounts. Use a professional but approachable tone suitable for a startup CTO or VP Engineering. Do NOT use bullet points — write in flowing prose. Do NOT start with "Based on" or "Your audit shows".
```

## Reasoning & Tone
- **Role:** "Senior SaaS cost optimization analyst" sets the persona to be analytical, authoritative, and financially literate.
- **Constraints:** "80-100 words" and "Do NOT use bullet points" forces the LLM to output a concise, readable paragraph suitable for a UI card component.
- **Tone:** "Startup CTO or VP Engineering" ensures the language isn't too corporate, but remains highly professional.
- **Negative Constraints:** Banning "Based on..." prevents the LLM from using generic AI introductory filler text.

## Iterations Tried
1. *Iteration 1:* Allowed bullet points. The UI looked cluttered because we already have structured Recommendation Cards below the summary.
2. *Iteration 2:* Didn't include specific tool names in the context. The LLM generated generic advice like "reduce your API costs" instead of specific, contextual advice.
3. *Final Iteration:* Injected the top 5 recommendations directly into the prompt so the LLM can synthesize them into an executive narrative.

## Fallback Strategy
Because the app runs entirely client-side and we do not want to force users to enter an OpenAI API key just to try the MVP, the service implements a **Deterministic Fallback Template**.

If the API call fails, times out, or no API key is provided, the system seamlessly falls back to:

```typescript
// Example Fallback Output
"Your 3-tool AI stack costs $2,520/mo ($30,240/yr), with ai assistants representing 87% of spend. We identified $756/mo in potential savings — a 30% reduction. The highest-impact action: drop github copilot — cursor already covers this, saving $300/mo. 2 recommendations carry high confidence and can be implemented immediately."
```
This ensures a premium user experience regardless of API availability.
