
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { PlusCircle, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NewAuditButtonProps extends Omit<ButtonProps, 'children'> {
  onClick: () => void;
  showLabel?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  withAnimation?: boolean;
}

const NewAuditButton: React.FC<NewAuditButtonProps> = ({
  onClick,
  showLabel = true,
  variant = 'default',
  size = 'default',
  withAnimation = true,
  className,
  ...props
}) => {
  const buttonContent = (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      <ClipboardCheck className="h-4 w-4" />
      {showLabel && 'Nova Auditoria'}
    </Button>
  );

  if (withAnimation) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {buttonContent}
      </motion.div>
    );
  }

  return buttonContent;
};

export default NewAuditButton;
