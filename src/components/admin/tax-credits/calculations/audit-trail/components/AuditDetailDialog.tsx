
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from '../utils';
import { AuditTrail } from '../types';
import { Activity, Calendar, User, Server, FileText, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StatusType } from '@/types/declarations';

interface AuditDetailDialogProps {
  open: boolean;
  onClose: () => void;
  audit: AuditTrail | null;
}

const AuditDetailDialog: React.FC<AuditDetailDialogProps> = ({
  open,
  onClose,
  audit
}) => {
  if (!audit) return null;

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-500/20 text-green-700 hover:bg-green-500/30';
      case 'update':
        return 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30';
      case 'delete':
        return 'bg-red-500/20 text-red-700 hover:bg-red-500/30';
      case 'status_change':
        return 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30';
      case 'calculation':
        return 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30';
      case 'export':
        return 'bg-indigo-500/20 text-indigo-700 hover:bg-indigo-500/30';
      case 'import':
        return 'bg-cyan-500/20 text-cyan-700 hover:bg-cyan-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 hover:bg-gray-500/30';
    }
  };

  const getStatusBadge = (status: StatusType | undefined) => {
    if (!status) return null;
    
    const statusConfig = {
      'PENDING': { label: 'Pendente', className: 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' },
      'PROCESSING': { label: 'Em Processamento', className: 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30' },
      'APPROVED': { label: 'Aprovado', className: 'bg-green-500/20 text-green-700 hover:bg-green-500/30' },
      'REJECTED': { label: 'Rejeitado', className: 'bg-red-500/20 text-red-700 hover:bg-red-500/30' },
      'CANCELED': { label: 'Cancelado', className: 'bg-gray-500/20 text-gray-700 hover:bg-gray-500/30' },
      'COMPLETED': { label: 'Concluído', className: 'bg-green-500/20 text-green-700 hover:bg-green-500/30' },
      'ACTIVE': { label: 'Ativo', className: 'bg-green-500/20 text-green-700 hover:bg-green-500/30' },
      'INACTIVE': { label: 'Inativo', className: 'bg-gray-500/20 text-gray-700 hover:bg-gray-500/30' }
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Detalhes da Ação de Auditoria
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-secondary/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={getActionColor(audit.action)}>
                {audit.action.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(audit.date)}
              </span>
            </div>
            <p className="text-md font-medium">{audit.details}</p>
          </div>

          {audit.action === 'status_change' && (
            <div className="grid grid-cols-3 items-center gap-2 bg-secondary/30 p-3 rounded-lg">
              {getStatusBadge(audit.previousStatus)}
              <div className="flex justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              {getStatusBadge(audit.newStatus)}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Activity className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Ação</p>
                <p className="text-sm text-muted-foreground">{audit.action}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Usuário</p>
                <p className="text-sm text-muted-foreground">{audit.userName} ({audit.userRole})</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Recurso</p>
                <p className="text-sm text-muted-foreground">{audit.resourceName} (ID: {audit.resourceId})</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Data e Hora</p>
                <p className="text-sm text-muted-foreground">{formatDate(audit.date)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Server className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Endereço IP</p>
                <p className="text-sm text-muted-foreground">{audit.ipAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuditDetailDialog;
