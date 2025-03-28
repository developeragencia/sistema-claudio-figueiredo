
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoContainerProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: string;
}

const LogoContainer: React.FC<LogoContainerProps> = ({
  children,
  className,
  containerSize = 'h-10',
}) => {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center transition-all duration-300",
        containerSize,
        className
      )}
    >
      {children}
    </div>
  );
};

export default React.memo(LogoContainer);
