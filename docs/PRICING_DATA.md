# AI SaaS Pricing Data & Strategy

This document outlines the pricing data utilized by the NeuralCost Audit Engine. This data must be kept current to ensure accurate savings calculations.

## Assistant Models

### 1. OpenAI (ChatGPT)
- **Plus**: $20/user/mo
- **Team**: $30/user/mo (Minimum 2 seats)
- **Enterprise**: Custom pricing (Estimated $60/user/mo for auditing purposes)
*Note: Enterprise pricing varies wildly based on volume and negotiation. We flag anything ≤15 seats on Enterprise as an immediate overspend.*

### 2. Anthropic (Claude)
- **Pro**: $20/user/mo
- **Team**: $30/user/mo (Minimum 5 seats)
*Note: Claude Team enforces a 5-seat minimum, meaning the lowest possible entry point is $150/mo. This is a critical audit rule flag for small teams.*

## Code Generation & IDEs

### 1. GitHub Copilot
- **Individual**: $10/user/mo
- **Business**: $19/user/mo
- **Enterprise**: $39/user/mo
*Note: Copilot is a pure autocomplete/chat extension. We consider it functionally superseded by full IDE wrappers like Cursor.*

### 2. Cursor
- **Pro**: $20/user/mo
- **Business**: $40/user/mo
*Note: Cursor Business includes centralized billing and SOC 2 compliance, making it the primary recommendation for teams >5.*

### 3. Windsurf
- **Pro**: $20/user/mo
*Note: Functionally identical pricing to Cursor Pro.*

## 4. Design & Scaffolding
### v0 by Vercel
- **Premium**: $20/user/mo
*Note: Highly specialized. If a team has Cursor AND v0, we flag it as a potential consolidation opportunity, but with low confidence.*

---

## Market Dynamics & Engine Implications
SaaS pricing is shifting from *per-seat* to *consumption-based* (APIs). Our engine currently assumes fixed per-seat costs for most tools. As vendors shift toward usage-based billing (e.g., Anthropic's new enterprise tier), the engine will need to ingest raw token logs or cloud billing exports rather than simple seat counts.
