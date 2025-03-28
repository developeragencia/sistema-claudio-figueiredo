
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxCreditSummary } from '@/types/tax-credits';

interface CreditSummaryCardsProps {
  summary: TaxCreditSummary;
  className?: string;
}

const CreditSummaryCards: React.FC<CreditSummaryCardsProps> = ({ summary, className }) => {
  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Get the values with fallbacks
  const totalValue = summary.totalCredits !== undefined ? summary.totalCredits : summary.totalValue;
  const approvedValue = summary.approvedCredits !== undefined ? summary.approvedCredits : summary.approvedValue;
  const recoveredValue = summary.recoveredCredits !== undefined ? summary.recoveredCredits : (summary.totalValue * 0.4); // Fallback approximation
  const pendingValue = summary.pendingCredits !== undefined ? summary.pendingCredits : summary.pendingValue;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Créditos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Todos os créditos identificados
          </p>
        </CardContent>
      </Card>
      
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Créditos Aprovados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(approvedValue)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((approvedValue / totalValue) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
      
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Créditos Recuperados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(recoveredValue)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((recoveredValue / totalValue) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
      
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Créditos Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{formatCurrency(pendingValue)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {((pendingValue / totalValue) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditSummaryCards;
