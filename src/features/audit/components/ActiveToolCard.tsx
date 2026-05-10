import type { ActiveTool } from '../types';
import { TOOL_DATABASE } from '../constants/toolDatabase';
import { useAuditStore } from '../store/useAuditStore';
import { GlassCard, Select, Input, Label, Button } from '@/components/ui';
import { Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { stringToColor } from '@/lib/utils';

interface Props {
  tool: ActiveTool;
}

export function ActiveToolCard({ tool }: Props) {
  const { updateTool, removeTool } = useAuditStore();
  const toolDef = TOOL_DATABASE.find((t) => t.id === tool.toolId);

  if (!toolDef) return null;

  const currentPlan = toolDef.plans.find((p) => p.id === tool.planId) || toolDef.plans[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard intensity="strong" className="p-5 relative group">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-neutral-500 hover:text-danger-500 hover:bg-danger-500/10"
            onClick={() => removeTool(tool.id)}
            aria-label="Remove tool"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-inner"
            style={{ backgroundColor: stringToColor(toolDef.name) }}
          >
            {toolDef.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-neutral-100">{toolDef.name}</h4>
            <p className="text-xs text-neutral-400 capitalize">{toolDef.category}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Selected Plan</Label>
            <Select
              value={tool.planId}
              onChange={(e) => updateTool(tool.id, { planId: e.target.value })}
            >
              {toolDef.plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} {plan.model === 'per_seat' ? `($${plan.price}/mo)` : ''}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            {currentPlan.model === 'per_seat' ? (
              <>
                <Label>Number of Seats</Label>
                <Input
                  type="number"
                  min="1"
                  value={tool.seats}
                  onChange={(e) =>
                    updateTool(tool.id, { seats: parseInt(e.target.value) || 1 })
                  }
                />
              </>
            ) : (
              <>
                <Label>Est. Monthly Cost ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  value={tool.monthlyCost}
                  onChange={(e) =>
                    updateTool(tool.id, { monthlyCost: parseInt(e.target.value) || 0 })
                  }
                />
              </>
            )}
          </div>
        </div>

        {currentPlan.model === 'per_seat' && (
          <div className="mt-4 pt-4 border-t border-surface-700/50 flex justify-between items-center text-sm">
            <span className="text-neutral-400">Calculated Cost:</span>
            <span className="font-medium text-neutral-200">
              ${tool.monthlyCost}/mo
            </span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
