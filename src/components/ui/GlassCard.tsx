import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  intensity?: 'light' | 'medium' | 'strong';
}

const intensityStyles = {
  light: 'glass',
  medium: 'glass-strong',
  strong: 'bg-white/10 backdrop-blur-2xl border border-white/15',
};

export function GlassCard({
  children,
  hover = false,
  intensity = 'light',
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        intensityStyles[intensity],
        hover && 'hover:-translate-y-1 hover:shadow-xl hover:border-white/12 border-glow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
