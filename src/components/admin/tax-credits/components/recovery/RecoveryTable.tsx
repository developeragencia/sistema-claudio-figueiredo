
import React from 'react';
import { RecoveryProcess } from '@/types/recovery';
import { Badge } from '@/components/ui/badge';
import RecoveryActionButtons from './RecoveryActionButtons';

interface RecoveryTableProps {
  processes: RecoveryProcess[];
  isLoading: boolean;
  onViewDetails: (processId: string) => void;
  onGenerateReport: (processId: string) => void;
  onEdit: (processId: string) => void;
  onDelete: (processId: string) => void;
  onApprove: (processId: string) => void;
}

const RecoveryTable: React.FC<RecoveryTableProps> = ({
  processes,
  isLoading,
  onViewDetails,
  onGenerateReport,
  onEdit,
  onDelete,
  onApprove
}) => {
  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const statusLabels = {
    'INICIAL': 'Inicial',
    'EM_ANDAMENTO': 'Em Andamento',
    'PARCIAL': 'Parcial',
    'CONCLUIDO': 'Concluído'
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'INICIAL':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'EM_ANDAMENTO':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'PARCIAL':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'CONCLUIDO':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Processo</th>
            <th className="py-3 px-4 text-left font-medium">Tipo</th>
            <th className="py-3 px-4 text-left font-medium">Cliente</th>
            <th className="py-3 px-4 text-left font-medium">Valor Original</th>
            <th className="py-3 px-4 text-left font-medium">Valor Recuperado</th>
            <th className="py-3 px-4 text-left font-medium">Taxa</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b">
                <td colSpan={8} className="py-4 px-4">
                  <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : processes.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-4 px-4 text-center text-muted-foreground">
                Nenhum processo de recuperação encontrado.
              </td>
            </tr>
          ) : (
            processes.map((process) => (
              <tr key={process.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{process.processNumber}</td>
                <td className="py-3 px-4">{process.creditType}</td>
                <td className="py-3 px-4">{process.clientName}</td>
                <td className="py-3 px-4">{formatCurrency(process.originalAmount)}</td>
                <td className="py-3 px-4">{formatCurrency(process.recoveredAmount)}</td>
                <td className="py-3 px-4">{process.recoveryPercent.toFixed(1)}%</td>
                <td className="py-3 px-4">
                  <Badge className={getStatusClassName(process.status)}>
                    {statusLabels[process.status as keyof typeof statusLabels]}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <RecoveryActionButtons
                    process={process}
                    onViewDetails={onViewDetails}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onApprove={onApprove}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecoveryTable;
