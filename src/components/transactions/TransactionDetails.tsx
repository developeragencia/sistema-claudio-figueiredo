import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Loader2 } from 'lucide-react';
import { useTransaction, useTransactionReport } from '@/hooks/useTransactions';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import type { Transaction, TransactionDetailsProps } from '@/types/components';

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  
  const {
    data: transactionDetails,
    isLoading,
    isError,
    error
  } = useTransaction(transaction.id);

  const {
    data: reportData,
    isLoading: isReportLoading,
    refetch: downloadReport
  } = useTransactionReport(transaction.id, {
    enabled: false // Não baixa automaticamente
  });

  const handleDownload = async () => {
    try {
      await downloadReport();
      toast({
        title: "Relatório baixado",
        description: "O relatório foi baixado com sucesso.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao baixar relatório",
        description: "Ocorreu um erro ao baixar o relatório. Tente novamente mais tarde.",
      });
    }
  };

  if (isError) {
    toast({
      variant: "destructive",
      title: "Erro ao carregar detalhes",
      description: error instanceof Error ? error.message : "Ocorreu um erro ao carregar os detalhes da transação.",
    });
  }

  const getStatusBadgeVariant = (status: Transaction['status']): BadgeVariant => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
          <DialogDescription>
            ID da transação: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : transactionDetails ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={getStatusBadgeVariant(transactionDetails.status)}>
                  {transactionDetails.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                <p>{transactionDetails.type}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p>{transactionDetails.clientName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor</p>
              <p className="text-lg font-semibold">
                {formatCurrency(transactionDetails.amount)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Data</p>
              <p>{formatDate(transactionDetails.date)}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Descrição</p>
              <p>{transactionDetails.description}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Documento</p>
              <p>{transactionDetails.documentNumber}</p>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleDownload}
                disabled={isReportLoading}
                className="w-full sm:w-auto"
              >
                {isReportLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Baixar Relatório
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails; 