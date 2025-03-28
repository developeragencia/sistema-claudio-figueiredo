
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AuditAction } from '../types';

interface AuditActionBadgeProps {
  action: AuditAction;
}

const AuditActionBadge: React.FC<AuditActionBadgeProps> = ({ action }) => {
  const actionConfig = {
    create: {
      label: 'Criação',
      className: 'bg-green-500/20 text-green-700 hover:bg-green-500/30'
    },
    update: {
      label: 'Atualização',
      className: 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30'
    },
    delete: {
      label: 'Exclusão',
      className: 'bg-red-500/20 text-red-700 hover:bg-red-500/30'
    },
    status_change: {
      label: 'Mudança de Status',
      className: 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30'
    },
    calculation: {
      label: 'Cálculo',
      className: 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30'
    },
    export: {
      label: 'Exportação',
      className: 'bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30'
    },
    import: {
      label: 'Importação',
      className: 'bg-indigo-500/20 text-indigo-700 hover:bg-indigo-500/30'
    }
  };

  const config = actionConfig[action];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default AuditActionBadge;
