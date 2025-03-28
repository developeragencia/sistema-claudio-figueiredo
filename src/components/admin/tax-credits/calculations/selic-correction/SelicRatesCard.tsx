
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SelicRate } from './types';
import { formatPercentage } from './utils';

interface SelicRatesCardProps {
  selicRates: SelicRate[];
  currentSelicRate: number;
  loadingRates: boolean;
  onRefreshRates: () => void;
}

const SelicRatesCard: React.FC<SelicRatesCardProps> = ({
  selicRates,
  currentSelicRate,
  loadingRates,
  onRefreshRates,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Taxa Selic Atual</h3>
          <Button variant="outline" size="sm" onClick={onRefreshRates} disabled={loadingRates}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loadingRates ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
        
        <div className="grid place-items-center py-4">
          {loadingRates ? (
            <Skeleton className="h-16 w-28" />
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{formatPercentage(currentSelicRate)}</p>
              <p className="text-sm text-muted-foreground">Taxa mensal</p>
            </div>
          )}
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Taxa (%)</TableHead>
                <TableHead className="text-right">Acumulada (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingRates ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : (
                selicRates.map((rate, index) => (
                  <TableRow key={`${rate.month}-${rate.year}`}>
                    <TableCell>
                      {`${rate.month}/${rate.year}`}
                    </TableCell>
                    <TableCell className="text-right">{formatPercentage(rate.rate)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(rate.accumulated)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelicRatesCard;
