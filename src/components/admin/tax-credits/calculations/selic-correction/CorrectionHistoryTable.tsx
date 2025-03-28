
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MonetaryCorrection } from './types';
import { formatCurrency, formatPercentage } from './utils';

interface CorrectionHistoryTableProps {
  corrections: MonetaryCorrection[];
  onExport: () => void;
}

const CorrectionHistoryTable: React.FC<CorrectionHistoryTableProps> = ({
  corrections,
  onExport,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Histórico de Correções Monetárias</h3>
          <Button variant="outline" onClick={onExport}>
            <DownloadCloud className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data da Correção</TableHead>
                <TableHead className="text-right">Valor Original (R$)</TableHead>
                <TableHead className="text-right">Valor Corrigido (R$)</TableHead>
                <TableHead className="text-right">Diferença (R$)</TableHead>
                <TableHead className="text-center">Meses</TableHead>
                <TableHead className="text-right">Taxa Acumulada (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {corrections.map((correction) => (
                <TableRow key={correction.id}>
                  <TableCell>{correction.creditId}</TableCell>
                  <TableCell>{correction.correctionDate}</TableCell>
                  <TableCell className="text-right">{formatCurrency(correction.originalValue)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(correction.correctedValue)}</TableCell>
                  <TableCell className="text-right text-green-600 font-medium">
                    {formatCurrency(correction.difference)}
                  </TableCell>
                  <TableCell className="text-center">{correction.months}</TableCell>
                  <TableCell className="text-right">{formatPercentage(correction.accumulatedRate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrectionHistoryTable;
