import type { ToolDefinition } from '../types';

export const TOOL_DATABASE: ToolDefinition[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'assistant',
    plans: [
      { id: 'plus', name: 'Plus', price: 20, model: 'per_seat' },
      { id: 'team', name: 'Team', price: 30, model: 'per_seat' },
      { id: 'enterprise', name: 'Enterprise (Est.)', price: 60, model: 'per_seat' }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'assistant',
    plans: [
      { id: 'pro', name: 'Pro', price: 20, model: 'per_seat' },
      { id: 'team', name: 'Team', price: 30, model: 'per_seat' }
    ]
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'coding',
    plans: [
      { id: 'individual', name: 'Individual', price: 10, model: 'per_seat' },
      { id: 'business', name: 'Business', price: 19, model: 'per_seat' },
      { id: 'enterprise', name: 'Enterprise', price: 39, model: 'per_seat' }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'coding',
    plans: [
      { id: 'pro', name: 'Pro', price: 20, model: 'per_seat' },
      { id: 'business', name: 'Business', price: 40, model: 'per_seat' }
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'coding',
    plans: [
      { id: 'pro', name: 'Pro', price: 20, model: 'per_seat' }
    ]
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    category: 'coding',
    plans: [
      { id: 'premium', name: 'Premium', price: 20, model: 'per_seat' }
    ]
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    category: 'api',
    plans: [
      { id: 'usage', name: 'Token Usage', price: 0, model: 'usage' }
    ]
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    category: 'api',
    plans: [
      { id: 'usage', name: 'Token Usage', price: 0, model: 'usage' }
    ]
  },
  {
    id: 'gemini_api',
    name: 'Google Gemini API',
    category: 'api',
    plans: [
      { id: 'usage', name: 'Token Usage', price: 0, model: 'usage' }
    ]
  }
];
