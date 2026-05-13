import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'primary' | 'accent' | 'warning' | 'danger' | 'success';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-700 text-neutral-300',
  primary: 'bg-primary-500/15 text-primary-400 border border-primary-500/20',
  accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/20',
  success: 'bg-accent-500/15 text-accent-400 border border-accent-500/20',
  warning: 'bg-warning-500/15 text-warning-500 border border-warning-500/20',
  danger: 'bg-danger-500/15 text-danger-500 border border-danger-500/20',
};

export function Badge({
  variant = 'default',
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
