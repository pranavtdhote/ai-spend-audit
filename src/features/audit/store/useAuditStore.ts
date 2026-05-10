import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuditState, ActiveTool } from '../types';
import { TOOL_DATABASE } from '../constants/toolDatabase';

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      generalInfo: {
        teamSize: '',
        primaryUseCase: '',
      },
      activeTools: [],

      setGeneralInfo: (info) =>
        set((state) => ({
          generalInfo: { ...state.generalInfo, ...info },
        })),

      addTool: (toolId) =>
        set((state) => {
          const toolDef = TOOL_DATABASE.find((t) => t.id === toolId);
          if (!toolDef) return state;

          const defaultPlan = toolDef.plans[0];
          const newTool: ActiveTool = {
            id: crypto.randomUUID(),
            toolId,
            planId: defaultPlan.id,
            seats: 1,
            monthlyCost: defaultPlan.model === 'per_seat' ? defaultPlan.price : 0,
          };

          return { activeTools: [...state.activeTools, newTool] };
        }),

      updateTool: (id, updates) =>
        set((state) => {
          return {
            activeTools: state.activeTools.map((tool) => {
              if (tool.id !== id) return tool;
              
              const updatedTool = { ...tool, ...updates };
              const toolDef = TOOL_DATABASE.find((t) => t.id === updatedTool.toolId);
              const plan = toolDef?.plans.find((p) => p.id === updatedTool.planId);
              
              if (plan && plan.model === 'per_seat') {
                updatedTool.monthlyCost = plan.price * updatedTool.seats;
              }

              return updatedTool;
            }),
          };
        }),

      removeTool: (id) =>
        set((state) => ({
          activeTools: state.activeTools.filter((t) => t.id !== id),
        })),

      clearAudit: () =>
        set({
          generalInfo: { teamSize: '', primaryUseCase: '' },
          activeTools: [],
        }),
    }),
    {
      name: 'neuralcost-audit-storage',
    }
  )
);
