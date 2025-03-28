
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ButtonEffectProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  tooltip?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  className?: string;
  showTooltip?: boolean;
}

const ButtonEffect: React.FC<ButtonEffectProps> = ({
  onClick,
  icon,
  label,
  tooltip,
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  showTooltip = true
}) => {
  const button = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        disabled={disabled}
        className={cn("flex items-center gap-1.5", className)}
      >
        {icon}
        {label && <span className="whitespace-nowrap">{label}</span>}
      </Button>
    </motion.div>
  );

  if (tooltip && showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export default ButtonEffect;
