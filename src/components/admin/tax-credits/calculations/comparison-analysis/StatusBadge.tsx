
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ComparisonStatus } from './types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ComparisonStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const baseClasses = "shadow-sm text-xs font-medium px-2.5 py-0.5 rounded-full";
  
  switch (status) {
    case 'recuperável':
      return <Badge className={cn("bg-green-100 text-green-800 border border-green-200 hover:bg-green-200", baseClasses, className)}>Recuperável</Badge>;
    case 'correto':
      return <Badge className={cn("bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200", baseClasses, className)}>Correto</Badge>;
    case 'divergente':
      return <Badge className={cn("bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200", baseClasses, className)}>Divergente</Badge>;
    default:
      return null;
  }
};

export default StatusBadge;
