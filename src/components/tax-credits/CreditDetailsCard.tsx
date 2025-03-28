
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, RefreshCcw, Download, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';
import { TaxCredit } from '@/types/tax-credits';

interface CreditDetailsCardProps {
  credit: TaxCredit;
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string | Date) => string; // Update type
  onEditClick: () => void;
  onStatusChangeClick: () => void;
  onExportReportClick: () => void;
  onDeleteClick: () => void;
}

const CreditDetailsCard: React.FC<CreditDetailsCardProps> = ({
  credit,
  formatCurrency,
  formatDate,
  onEditClick,
  onStatusChangeClick,
  onExportReportClick,
  onDeleteClick
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{credit.creditType} - {formatCurrency(credit.creditAmount)}</CardTitle>
            <CardDescription>{credit.clientName}</CardDescription>
          </div>
          <StatusBadge status={credit.status} className="ml-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Cliente</p>
            <p>{credit.clientName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Documento</p>
            <p>{credit.documentNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Tipo de Crédito</p>
            <p>{credit.creditType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Valor</p>
            <p className="font-semibold">{formatCurrency(credit.creditAmount)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Período</p>
            <p>{formatDate(credit.periodStart)} a {formatDate(credit.periodEnd)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
            <StatusBadge status={credit.status} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Data de Criação</p>
            <p>{formatDate(credit.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Última Atualização</p>
            <p>{formatDate(credit.updatedAt || credit.createdAt)}</p>
          </div>
        </div>
        
        {credit.notes && (
          <>
            <Separator className="my-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Observações</p>
              <p className="text-sm">{credit.notes}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between border-t pt-6 gap-2">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" onClick={onStatusChangeClick}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Alterar Status
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onExportReportClick}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button variant="destructive" onClick={onDeleteClick}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreditDetailsCard;
