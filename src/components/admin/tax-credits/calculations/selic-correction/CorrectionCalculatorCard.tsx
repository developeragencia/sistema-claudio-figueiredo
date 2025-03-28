
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, DownloadCloud } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MonetaryCorrection } from './types';
import { formatCurrency } from './utils';

interface CorrectionCalculatorCardProps {
  creditValue: string;
  setCreditValue: (value: string) => void;
  creditDate: string;
  setCreditDate: (value: string) => void;
  calculateCorrection: () => void;
  corrections: MonetaryCorrection[];
  onExportHistory: () => void;
}

const CorrectionCalculatorCard: React.FC<CorrectionCalculatorCardProps> = ({
  creditValue,
  setCreditValue,
  creditDate,
  setCreditDate,
  calculateCorrection,
  corrections,
  onExportHistory,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-medium">Calcular Correção Monetária</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="creditValue">Valor do Crédito (R$)</Label>
            <Input
              id="creditValue"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={creditValue}
              onChange={(e) => setCreditValue(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="creditDate">Data do Crédito (DD/MM/AAAA)</Label>
            <Input
              id="creditDate"
              placeholder="01/01/2023"
              value={creditDate}
              onChange={(e) => setCreditDate(e.target.value)}
            />
          </div>
          
          <Button className="w-full" onClick={calculateCorrection}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Calcular Correção
          </Button>
        </div>
        
        <div className="pt-4">
          <h4 className="font-medium mb-2">Últimos Cálculos</h4>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-right">Original (R$)</TableHead>
                  <TableHead className="text-right">Corrigido (R$)</TableHead>
                  <TableHead className="text-right">Diferença (R$)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {corrections.map((correction) => (
                  <TableRow key={correction.id}>
                    <TableCell>{correction.creditId}</TableCell>
                    <TableCell className="text-right">{formatCurrency(correction.originalValue)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(correction.correctedValue)}</TableCell>
                    <TableCell className="text-right text-green-600 font-medium">
                      {formatCurrency(correction.difference)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" onClick={onExportHistory}>
              <DownloadCloud className="mr-2 h-4 w-4" />
              Exportar Histórico
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrectionCalculatorCard;
