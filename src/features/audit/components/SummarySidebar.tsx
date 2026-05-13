import { useNavigate } from 'react-router';
import { useAuditStore } from '../store/useAuditStore';
import { GlassCard, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { TOOL_DATABASE } from '../constants/toolDatabase';

export function SummarySidebar() {
  const navigate = useNavigate();
  const { activeTools } = useAuditStore();

  const totalMonthly = activeTools.reduce((acc, tool) => acc + tool.monthlyCost, 0);
  const totalAnnual = totalMonthly * 12;

  // Simple heuristic for "potential savings"
  const potentialSavings = totalMonthly > 0 ? totalMonthly * 0.3 : 0;

  return (
    <div className="sticky top-24 space-y-6">
      <GlassCard intensity="medium" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-100 mb-6">Spend Summary</h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-end">
            <span className="text-sm text-neutral-400">Total Monthly Cost</span>
            <span className="text-2xl font-bold text-neutral-50">
              {formatCurrency(totalMonthly)}
            </span>
          </div>
          
          <div className="flex justify-between items-end pb-4 border-b border-surface-700/50">
            <span className="text-sm text-neutral-400">Total Annual Cost</span>
            <span className="text-lg font-medium text-neutral-300">
              {formatCurrency(totalAnnual)}
            </span>
          </div>

          <div className="flex justify-between items-start pt-2">
            <div className="flex items-center gap-1.5 text-accent-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Est. Potential Savings</span>
            </div>
            <span className="text-lg font-bold text-accent-400">
              {formatCurrency(potentialSavings)}/mo
            </span>
          </div>
        </div>

        {activeTools.length > 0 ? (
          <div className="space-y-3 mb-8">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Tool Breakdown
            </p>
            {activeTools.map((tool) => {
              const def = TOOL_DATABASE.find((t) => t.id === tool.toolId);
              return (
                <div key={tool.id} className="flex justify-between text-sm">
                  <span className="text-neutral-300">{def?.name}</span>
                  <span className="text-neutral-400 font-medium">
                    {formatCurrency(tool.monthlyCost)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/50 border border-surface-700/50 mb-8">
            <AlertCircle className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Add tools to your stack to see your spend breakdown and optimization opportunities.
            </p>
          </div>
        )}

        <Button
          fullWidth
          size="lg"
          disabled={activeTools.length === 0}
          icon={<ArrowRight className="w-4 h-4" />}
          className="justify-center"
          onClick={() => navigate('/results')}
        >
          Generate Optimization Report
        </Button>
      </GlassCard>

      <div className="text-center px-4">
        <p className="text-xs text-neutral-500 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your data is stored locally and never shared.
        </p>
      </div>
    </div>
  );
}
