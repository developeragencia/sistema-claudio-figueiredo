
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Audit } from '@/types/audit';
import AuditActionButtons from './AuditActionButtons';

interface AuditTableProps {
  audits: Audit[];
  isLoading: boolean;
  onViewDetails: (auditId: string) => void;
  onDownloadDocuments: (auditId: string) => void;
  onEdit?: (auditId: string) => void;
  onDelete?: (auditId: string) => void;
  onApprove?: (auditId: string) => void;
}

const AuditTable: React.FC<AuditTableProps> = ({ 
  audits, 
  isLoading,
  onViewDetails,
  onDownloadDocuments,
  onEdit = () => {},
  onDelete = () => {},
  onApprove = () => {}
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Cliente</th>
            <th className="py-3 px-4 text-left font-medium">Documento</th>
            <th className="py-3 px-4 text-left font-medium">Tipo</th>
            <th className="py-3 px-4 text-left font-medium">Início</th>
            <th className="py-3 px-4 text-left font-medium">Prazo</th>
            <th className="py-3 px-4 text-left font-medium">Documentos</th>
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
          ) : audits.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-4 px-4 text-center text-muted-foreground">
                Nenhuma auditoria encontrada.
              </td>
            </tr>
          ) : (
            audits.map((audit) => (
              <tr key={audit.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{audit.clientName}</td>
                <td className="py-3 px-4">{audit.documentNumber}</td>
                <td className="py-3 px-4">{audit.auditType}</td>
                <td className="py-3 px-4">{new Date(audit.startDate).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-4">{new Date(audit.deadline).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-4">{audit.documentsCount}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={audit.status} />
                </td>
                <td className="py-3 px-4">
                  <AuditActionButtons 
                    audit={audit}
                    onViewDetails={onViewDetails}
                    onDownloadDocuments={onDownloadDocuments}
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

// Status Badge component
const StatusBadge: React.FC<{ status: Audit['status'] }> = ({ status }) => {
  const statusConfig = {
    PENDENTE: { label: 'Pendente', variant: 'secondary' as const },
    EM_ANDAMENTO: { label: 'Em Andamento', variant: 'default' as const },
    CONCLUIDA: { label: 'Concluída', variant: 'default' as const },
    CANCELADA: { label: 'Cancelada', variant: 'destructive' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={
      status === 'PENDENTE' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
      status === 'EM_ANDAMENTO' ? 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30' :
      status === 'CONCLUIDA' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
      'bg-red-500/20 text-red-700 hover:bg-red-500/30'
    }>
      {config.label}
    </Badge>
  );
};

export default AuditTable;
