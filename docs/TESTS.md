# Audit Engine Test Strategy

Because the NeuralCost Audit Engine is built entirely using pure functions, it is highly testable without mocking complex React state or DOM elements.

## Unit Test Examples (Jest / Vitest)

Below are 5 concrete unit test ideas and examples for the audit engine rules.

### 1. Test: `analyzeDuplicateAssistants`
**Scenario:** User has both ChatGPT Plus (5 seats) and Claude Pro (5 seats).
**Expected Behavior:** The rule should return a `consolidate` recommendation, advising the user to drop one of them and saving $100/mo.
```typescript
it('should recommend consolidating when both ChatGPT and Claude are present', () => {
  const input = createMockInput({
    tools: [
      { toolId: 'chatgpt', planId: 'plus', seats: 5, monthlyCost: 100 },
      { toolId: 'claude', planId: 'pro', seats: 5, monthlyCost: 100 }
    ]
  });
  const result = analyzeDuplicateAssistants(input);
  expect(result).not.toBeNull();
  expect(result?.type).toBe('consolidate');
  expect(result?.monthlySavings).toBe(100);
});
```

### 2. Test: `analyzeDuplicateCoders`
**Scenario:** User has GitHub Copilot and Cursor.
**Expected Behavior:** Recommends dropping GitHub Copilot since Cursor is a superset.
```typescript
it('should recommend dropping Copilot if Cursor is present', () => {
  const input = createMockInput({
    tools: [
      { toolId: 'copilot', planId: 'business', seats: 10, monthlyCost: 190 },
      { toolId: 'cursor', planId: 'pro', seats: 10, monthlyCost: 200 }
    ]
  });
  const result = analyzeDuplicateCoders(input);
  expect(result?.title).toContain('Drop GitHub Copilot');
  expect(result?.monthlySavings).toBe(190);
});
```

### 3. Test: `analyzePlanOptimization` (Downgrade)
**Scenario:** User is on ChatGPT Team with only 1 seat.
**Expected Behavior:** Recommends downgrading to ChatGPT Plus.
```typescript
it('should recommend downgrading Team plan with <2 seats', () => {
  const input = createMockInput({
    tools: [{ toolId: 'chatgpt', planId: 'team', seats: 1, monthlyCost: 30 }]
  });
  const results = analyzePlanOptimization(input);
  expect(results.length).toBeGreaterThan(0);
  expect(results[0].type).toBe('downgrade');
  expect(results[0].monthlySavings).toBe(10); // 30 (Team) - 20 (Plus)
});
```

### 4. Test: `analyzePlanOptimization` (Enterprise Overspend)
**Scenario:** 10-person startup paying for Enterprise Copilot.
**Expected Behavior:** Flags this as overspend and recommends Business tier.
```typescript
it('should flag Enterprise overspend for small teams', () => {
  const input = createMockInput({
    teamSize: 10,
    tools: [{ toolId: 'copilot', planId: 'enterprise', seats: 10, monthlyCost: 390 }]
  });
  const results = analyzePlanOptimization(input);
  expect(results[0].id).toContain('enterprise-overspend');
});
```

### 5. Test: `analyzeApiSpend` (High Spend Alert)
**Scenario:** User spends $800/mo on OpenAI API.
**Expected Behavior:** Returns an advisory alert suggesting volume discount negotiation or optimization.
```typescript
it('should alert on API spend over $500', () => {
  const input = createMockInput({
    tools: [{ toolId: 'openai_api', planId: 'usage', seats: 1, monthlyCost: 800 }]
  });
  const results = analyzeApiSpend(input);
  expect(results[0].type).toBe('alert');
  expect(results[0].monthlySavings).toBe(160); // 20% estimated savings
});
```
