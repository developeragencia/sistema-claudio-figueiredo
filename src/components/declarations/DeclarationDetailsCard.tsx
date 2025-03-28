
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Printer, Download } from 'lucide-react';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';
import { DeclarationDetails } from '@/types/declarations';

interface DeclarationDetailsCardProps {
  declaration: DeclarationDetails;
  formatDate: (date: string) => string;
}

const DeclarationDetailsCard: React.FC<DeclarationDetailsCardProps> = ({ declaration, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Detalhes da Declaração</CardTitle>
            <CardDescription>{declaration.type} - {declaration.periodName}</CardDescription>
          </div>
          <StatusBadge status={declaration.status} className="ml-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Período</p>
            <p>{declaration.periodName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Ano Fiscal</p>
            <p>{declaration.fiscalYear}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Vencimento</p>
            <p>{formatDate(declaration.dueDate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Data de Envio</p>
            <p>{declaration.submissionDate ? formatDate(declaration.submissionDate) : '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Protocolo</p>
            <p>{declaration.protocol}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Valor</p>
            <p className="font-semibold">{declaration.amount}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Unidade da RFB</p>
            <p>{declaration.taxOffice}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Enviado por</p>
            <p>{declaration.submittedBy}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Baixar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeclarationDetailsCard;
