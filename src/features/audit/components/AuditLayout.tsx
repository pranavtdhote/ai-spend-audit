import type { ReactNode } from 'react';
import { SummarySidebar } from './SummarySidebar';

interface Props {
  children: ReactNode;
}

export function AuditLayout({ children }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 order-2 lg:order-1">
          {children}
        </div>
        <div className="lg:col-span-4 order-1 lg:order-2">
          <SummarySidebar />
        </div>
      </div>
    </div>
  );
}
