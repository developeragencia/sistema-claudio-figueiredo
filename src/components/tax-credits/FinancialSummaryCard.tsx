
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';
import { TaxCredit } from '@/types/tax-credits';

interface FinancialSummaryCardProps {
  credit: TaxCredit;
  formatCurrency: (value: number) => string;
}

const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({ credit, formatCurrency }) => {
  // Use originalAmount if available, or use creditAmount as fallback
  const originalAmount = credit.originalAmount || credit.creditAmount;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Valor Original</p>
            <p className="text-lg font-semibold">{formatCurrency(originalAmount)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Valor Atual</p>
            <p className="text-lg font-semibold">{formatCurrency(credit.creditAmount)}</p>
          </div>
          <Separator className="my-2" />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
            <div className="flex items-center mt-1">
              {credit.status === 'APPROVED' ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <span>Aprovado</span>
                </div>
              ) : credit.status === 'REJECTED' ? (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Rejeitado</span>
                </div>
              ) : (
                <div className="flex items-center text-blue-600">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  <span>Em Processamento</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;
