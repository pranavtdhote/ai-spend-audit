import { TOOL_DATABASE } from '../constants/toolDatabase';
import { useAuditStore } from '../store/useAuditStore';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { Plus } from 'lucide-react';
import { stringToColor } from '@/lib/utils';

export function ToolSelector() {
  const { activeTools, addTool } = useAuditStore();

  const activeToolIds = activeTools.map((t) => t.toolId);
  const availableTools = TOOL_DATABASE.filter((t) => !activeToolIds.includes(t.id));

  if (availableTools.length === 0) return null;

  return (
    <motion.div variants={fadeInUp} className="space-y-4 pt-6 mt-6 border-t border-surface-700/50">
      <h3 className="text-sm font-medium text-neutral-400">Add Tools to Audit</h3>
      
      <div className="flex flex-wrap gap-3">
        {availableTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => addTool(tool.id)}
            className="group flex items-center gap-2 rounded-xl bg-surface-800/40 border border-surface-700/50 px-3 py-2 text-sm text-neutral-300 hover:text-neutral-100 hover:bg-surface-700 hover:border-surface-600 transition-all"
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
              style={{ backgroundColor: stringToColor(tool.name) }}
            >
              {tool.name.charAt(0)}
            </div>
            {tool.name}
            <Plus className="w-3.5 h-3.5 text-neutral-500 group-hover:text-primary-400 transition-colors ml-1" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
