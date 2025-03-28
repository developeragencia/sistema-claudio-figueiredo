import React from 'react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  variant?: 'default' | 'admin' | 'auth';
  className?: string;
}

export default function LoadingScreen({ 
  message = 'Carregando...', 
  variant = 'default',
  className
}: LoadingScreenProps) {
  const variants = {
    default: 'bg-background',
    admin: 'bg-slate-900',
    auth: 'bg-primary/10'
  };

  return (
    <div className={cn(
      'fixed inset-0 flex flex-col items-center justify-center min-h-screen',
      variants[variant],
      className
    )}>
      <div className="flex flex-col items-center gap-8">
        <Logo animate size="lg" variant={variant === 'admin' ? 'light' : 'dark'} />
        <div className="flex flex-col items-center gap-4">
          <div className="h-2 w-32 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary rounded-full animate-loading-bar" />
          </div>
          <p className={cn(
            "text-sm font-medium",
            variant === 'admin' ? 'text-slate-400' : 'text-muted-foreground'
          )}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
