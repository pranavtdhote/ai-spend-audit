import { describe, it, expect } from 'vitest';
import { analyzeDuplicateAssistants } from '../rules/duplicateAssistants';
import { analyzeDuplicateCoders } from '../rules/duplicateCoders';
import { calculateTotalMonthlyCost } from '../calculator';
import type { AuditInput } from '../types';

describe('Audit Engine Calculator Utilities', () => {
  it('calculateTotalMonthlyCost should sum costs correctly', () => {
    const tools: any = [
      { monthlyCost: 100 },
      { monthlyCost: 50 },
      { monthlyCost: 0 }
    ];
    expect(calculateTotalMonthlyCost(tools)).toBe(150);
  });

  it('calculateTotalMonthlyCost should return 0 for empty array', () => {
    expect(calculateTotalMonthlyCost([])).toBe(0);
  });
});

describe('Rule: analyzeDuplicateAssistants', () => {
  it('should return null if only one assistant is present', () => {
    const input: AuditInput = {
      generalInfo: { teamSize: 10, primaryUseCase: 'mixed' },
      activeTools: [
        { id: '1', toolId: 'chatgpt', planId: 'plus', seats: 10, monthlyCost: 200 }
      ]
    };
    expect(analyzeDuplicateAssistants(input)).toBeNull();
  });

  it('should recommend consolidate when both ChatGPT and Claude are present', () => {
    const input: AuditInput = {
      generalInfo: { teamSize: 10, primaryUseCase: 'mixed' },
      activeTools: [
        { id: '1', toolId: 'chatgpt', planId: 'plus', seats: 10, monthlyCost: 200 },
        { id: '2', toolId: 'claude', planId: 'pro', seats: 5, monthlyCost: 100 }
      ]
    };
    
    const result = analyzeDuplicateAssistants(input);
    expect(result).not.toBeNull();
    expect(result?.type).toBe('consolidate');
    
    // Should keep ChatGPT (10 seats) and drop Claude (5 seats)
    expect(result?.title).toContain('Drop Claude');
    expect(result?.monthlySavings).toBe(100);
  });
});

describe('Rule: analyzeDuplicateCoders', () => {
  it('should recommend dropping Copilot when Cursor is present', () => {
    const input: AuditInput = {
      generalInfo: { teamSize: 5, primaryUseCase: 'coding' },
      activeTools: [
        { id: '1', toolId: 'copilot', planId: 'business', seats: 5, monthlyCost: 95 },
        { id: '2', toolId: 'cursor', planId: 'pro', seats: 5, monthlyCost: 100 }
      ]
    };
    
    const result = analyzeDuplicateCoders(input);
    expect(result).not.toBeNull();
    expect(result?.title).toContain('Drop GitHub Copilot');
    expect(result?.monthlySavings).toBe(95);
  });
});
