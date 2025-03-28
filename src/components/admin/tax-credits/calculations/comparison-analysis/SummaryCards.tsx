
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from './utils';
import { TrendingUp, ListChecks, FileWarning } from 'lucide-react';

interface SummaryCardsProps {
  totalRecoverable: number;
  totalDivergent: number;
  totalItems: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalRecoverable,
  totalDivergent,
  totalItems,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="overflow-hidden border-green-100 dark:border-green-900/30 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-1 bg-green-500" />
        <CardContent className="pt-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Recuperável</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalRecoverable)}</h3>
            </div>
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-1 bg-blue-500" />
        <CardContent className="pt-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quantidade de Notas</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{totalItems}</h3>
            </div>
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <ListChecks className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-amber-100 dark:border-amber-900/30 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-1 bg-amber-500" />
        <CardContent className="pt-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Divergente</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(totalDivergent)}</h3>
            </div>
            <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
              <FileWarning className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
