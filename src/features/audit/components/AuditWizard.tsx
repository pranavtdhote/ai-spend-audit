import { useAuditStore } from '../store/useAuditStore';
import { GeneralInfoForm } from './GeneralInfoForm';
import { ActiveToolCard } from './ActiveToolCard';
import { ToolSelector } from './ToolSelector';
import { AnimatePresence } from 'motion/react';
import { Layers } from 'lucide-react';

export function AuditWizard() {
  const { activeTools } = useAuditStore();

  return (
    <div className="space-y-12">
      <section>
        <GeneralInfoForm />
      </section>

      <section>
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-neutral-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary-400" />
            Your AI Stack
          </h3>
          <p className="text-sm text-neutral-400">
            Select the tools your team uses. We'll help you find redundant subscriptions.
          </p>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {activeTools.map((tool) => (
              <ActiveToolCard key={tool.id} tool={tool} />
            ))}
          </AnimatePresence>
        </div>

        <ToolSelector />
      </section>
    </div>
  );
}
