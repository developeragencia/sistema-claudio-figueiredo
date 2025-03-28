
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoTextProps {
  className?: string;
  color?: string;
}

const LogoText: React.FC<LogoTextProps> = ({ 
  className,
  color
}) => {
  return (
    <div className="flex flex-col">
      <span className={cn(
        "font-bold transition-all duration-300",
        color || "text-foreground",
        className
      )}>
        Sistemas
      </span>
      <span className={cn(
        "font-medium text-primary/90 transition-all duration-300",
        className ? `text-sm` : `text-xs`
      )}>
        Claudio Figueiredo
      </span>
    </div>
  );
};

export default React.memo(LogoText);
