export type UseCase = 'coding' | 'writing' | 'research' | 'data' | 'mixed' | '';

export interface GeneralInfo {
  teamSize: number | '';
  primaryUseCase: UseCase;
}

export type PricingModel = 'per_seat' | 'usage';

export interface ToolPlan {
  id: string;
  name: string;
  price: number;
  model: PricingModel;
}

export interface ToolDefinition {
  id: string;
  name: string;
  category: 'assistant' | 'coding' | 'api' | 'other';
  iconUrl?: string; // Optional if we just use string/colors
  plans: ToolPlan[];
}

// State representing a tool added to the form
export interface ActiveTool {
  id: string; // Unique instance ID (uuid)
  toolId: string; // References ToolDefinition.id
  planId: string; // References ToolPlan.id
  seats: number;
  monthlyCost: number; // For 'usage' model this is manual input, for 'per_seat' it's seats * plan.price
}

export interface AuditState {
  generalInfo: GeneralInfo;
  activeTools: ActiveTool[];
  
  // Actions
  setGeneralInfo: (info: Partial<GeneralInfo>) => void;
  addTool: (toolId: string) => void;
  updateTool: (id: string, updates: Partial<ActiveTool>) => void;
  removeTool: (id: string) => void;
  clearAudit: () => void;
}
