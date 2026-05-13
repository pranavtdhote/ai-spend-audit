# User Interview Framework

This document outlines the systematic approach to validating the NeuralCost value proposition with target users (CTOs, VP Eng, Founders) before writing heavy backend code.

## 1. Outreach Strategy
**Goal:** Secure 10 interviews with engineering leaders at 50-200 person startups.

### Cold Message Template (LinkedIn/Twitter)
> "Hi [Name] - I'm researching how mid-size engineering teams manage AI tool sprawl (Copilot + Cursor + ChatGPT + APIs). Most teams I talk to are accidentally double-paying for overlapping capabilities without realizing it. I'm building a free engine to detect this waste. Would you be open to a 15-min chat next week to brutally tear down my prototype? No sales pitch, just need engineering feedback."

## 2. Interview Framework

We use the **Mom Test** methodology. We do NOT pitch NeuralCost. We ask about their past behavior.

### A. Context Gathering (5 mins)
1. "Walk me through the AI tools your team currently uses. How did they get adopted?"
2. "Who holds the credit card for Copilot vs. ChatGPT?"
3. "Are you tracking your API costs (OpenAI/Anthropic) separately from your seat licenses?"

### B. Problem Validation (5 mins)
4. "Have you ever tried to audit or reduce your AI tooling spend? If so, walk me through exactly what you did."
   - *(Listen for: "I downloaded a CSV from Rippling/Brex and manually put it in Excel")*
5. "What happened the last time you realized an engineer had both a Copilot and a Cursor license?"
   - *(Listen for: "We didn't know," or "We cancelled it but it was a hassle")*

### C. Solution Presentation (5 mins)
*(Show the NeuralCost Figma or localhost prototype)*
6. "If you had this dashboard today, what is the very first thing you would click on?"
7. "Look at the 'Duplicate Code Generation' recommendation. Do you agree with this financial logic?"
8. "Would you be willing to upload your raw Brex/Ramp export into a tool like this to automate the data entry?"

## 3. Insight Extraction System
After every call, synthesize notes into three categories:
- **Validation**: Statements that prove the problem exists (e.g., "Yes, we spend $3k/mo and have no idea who uses what.")
- **Invalidation**: Statements that prove our assumptions wrong (e.g., "We don't care about saving $500/mo, we just care about security.")
- **Product Roadmap**: Feature requests (e.g., "Can this integrate directly with Google Workspace to see active logins?")
