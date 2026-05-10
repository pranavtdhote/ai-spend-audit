# NeuralCost Data Architecture

## 1. Local/Audit Data Schema (Frontend State)

This represents the JSON structure stored in `localStorage` via Zustand and sent to the API upon submission.

```typescript
interface AuditSubmissionPayload {
  userId?: string; // Optional if guest
  generalInfo: {
    teamSize: number;
    primaryUseCase: 'coding' | 'writing' | 'research' | 'data' | 'mixed';
  };
  tools: Array<{
    toolId: string; // e.g., 'chatgpt', 'cursor'
    planId: string; // e.g., 'plus', 'pro'
    seats: number;
    monthlyCost: number; // Final computed/input cost
  }>;
}
```

## 2. Database Schema (PostgreSQL via Supabase/Prisma)

Suggested relational tables for storing audits, users, and precomputed recommendations.

```sql
-- Users (Optional, for logged-in accounts)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audits (A single analysis run)
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Nullable for guests
  team_size INT NOT NULL,
  primary_use_case VARCHAR(50) NOT NULL,
  total_monthly_spend DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Tools (The specific tools in an audit)
CREATE TABLE audit_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  tool_id VARCHAR(100) NOT NULL,
  plan_id VARCHAR(100) NOT NULL,
  seats INT DEFAULT 1,
  monthly_cost DECIMAL(10, 2) NOT NULL
);

-- Optimization Recommendations (Pre-generated insights linked to an audit)
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  potential_savings DECIMAL(10, 2) NOT NULL,
  difficulty VARCHAR(50) DEFAULT 'easy' -- easy, medium, hard
);
```

## 3. API Response Structure (Results Engine)

When the frontend submits the `AuditSubmissionPayload`, the backend analysis engine returns this structure:

```json
{
  "success": true,
  "data": {
    "auditId": "uuid-1234",
    "summary": {
      "totalMonthlySpend": 1245.00,
      "totalAnnualSpend": 14940.00,
      "potentialMonthlySavings": 320.00
    },
    "breakdown": [
      {
        "category": "coding",
        "spend": 800.00,
        "percentage": 64.2
      },
      {
        "category": "assistant",
        "spend": 445.00,
        "percentage": 35.8
      }
    ],
    "recommendations": [
      {
        "id": "rec-01",
        "title": "Consolidate Coding Assistants",
        "description": "You are paying for both GitHub Copilot and Cursor. Moving your team of 10 entirely to Cursor Pro could save $100/mo while providing similar capabilities.",
        "potentialSavings": 100.00,
        "difficulty": "medium",
        "affectedTools": ["copilot", "cursor"]
      },
      {
        "id": "rec-02",
        "title": "Switch to ChatGPT Team",
        "description": "You have 5 users on ChatGPT Plus ($20/ea). Upgrading to a Team workspace ($30/ea) costs more but provides higher limits, shared workspaces, and data privacy guarantees.",
        "potentialSavings": -50.00,
        "difficulty": "easy",
        "affectedTools": ["chatgpt"]
      }
    ]
  }
}
```
