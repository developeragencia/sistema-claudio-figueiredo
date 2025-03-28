
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { FileText, Edit, Trash2, RefreshCw } from 'lucide-react';
import { TaxCredit } from '@/types/tax-credits';
import StatusBadge from './StatusBadge';

interface CreditDetailDialogProps {
  credit: TaxCredit;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}

const CreditDetailDialog: React.FC<CreditDetailDialogProps> = ({
  credit,
  open,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  // Format date for display
  const formatDate = (dateValue: string | Date) => {
    if (!dateValue) return '';
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString('pt-BR');
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Detalhes do Crédito Tributário
          </DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre o crédito selecionado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
              <p className="text-base">{credit.clientName}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Documento</h3>
              <p className="text-base">{credit.documentNumber}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Tipo de Crédito</h3>
              <p className="text-base">{credit.creditType}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Valor do Crédito</h3>
              <p className="text-base font-medium">{formatCurrency(credit.creditAmount)}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Período</h3>
              <p className="text-base">
                {formatDate(credit.periodStart)} a {formatDate(credit.periodEnd)}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <StatusBadge status={credit.status} />
            </div>
          </div>
          
          {credit.notes && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Observações</h3>
              <div className="bg-muted/50 p-3 rounded-md text-sm whitespace-pre-line">
                {credit.notes}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Datas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Criado em:</span>{' '}
                {formatDate(credit.createdAt)}
              </div>
              <div>
                <span className="text-muted-foreground">Atualizado em:</span>{' '}
                {credit.updatedAt ? formatDate(credit.updatedAt) : '-'}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-6">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" className="w-full" onClick={onStatusChange}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Alterar Status
            </Button>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="destructive" className="w-full" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
            <Button variant="default" className="w-full" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreditDetailDialog;
