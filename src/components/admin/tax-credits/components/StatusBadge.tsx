
import React from 'react';
import { cn } from '@/lib/utils';

// Update to handle both lowercase and uppercase status values
// Import StatusType from declarations to ensure consistency
import { StatusType as DeclarationStatusType } from '@/types/declarations';
import { TaxCredit } from '@/types/tax-credits';

// Union type to handle both tax credits and declarations status types
type StatusType = 
  | TaxCredit['status'] 
  | DeclarationStatusType 
  | Lowercase<TaxCredit['status']> 
  | Lowercase<DeclarationStatusType>;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  // Normalize status to lowercase for internal processing
  const normalizedStatus = status.toLowerCase() as string;
  
  const statusConfig: Record<string, { label: string; classes: string }> = {
    approved: {
      label: 'Aprovado',
      classes: 'bg-green-100 text-green-800 border border-green-200',
    },
    pending: {
      label: 'Pendente',
      classes: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    },
    rejected: {
      label: 'Rejeitado',
      classes: 'bg-red-100 text-red-800 border border-red-200',
    },
    analyzing: {
      label: 'Em Análise',
      classes: 'bg-blue-100 text-blue-800 border border-blue-200',
    },
    recovered: {
      label: 'Recuperado',
      classes: 'bg-purple-100 text-purple-800 border border-purple-200',
    },
    submitted: {
      label: 'Enviado',
      classes: 'bg-blue-100 text-blue-800 border border-blue-200',
    },
    processing: {
      label: 'Processando',
      classes: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    },
  };

  // Default to pending if status is not recognized
  const config = statusConfig[normalizedStatus] || statusConfig.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm',
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
