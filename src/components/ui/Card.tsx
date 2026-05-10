import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'bordered';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface-800/60',
  elevated: 'bg-surface-800/80 shadow-xl shadow-black/20',
  bordered: 'bg-surface-800/40 border border-surface-600/50',
};

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  children,
  hover = false,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/5 hover:border-surface-500/80',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
