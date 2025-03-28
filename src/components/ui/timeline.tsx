import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  timestamp: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function TimelineItem({
  title,
  timestamp,
  description,
  icon,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        <div className="flex-1 w-px bg-border" />
      </div>
      <div className="flex-1 pb-4">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{timestamp}</div>
        {description && (
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
} 