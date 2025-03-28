
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';
import { ComparisonItem } from './types';
import StatusBadge from './StatusBadge';
import { formatCurrency } from './utils';

interface ComparisonTableProps {
  data: ComparisonItem[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="font-medium">Nota Fiscal</TableHead>
            <TableHead className="font-medium">Fornecedor</TableHead>
            <TableHead className="font-medium">Data</TableHead>
            <TableHead className="text-right font-medium">Valor (R$)</TableHead>
            <TableHead className="text-right font-medium">Retido (R$)</TableHead>
            <TableHead className="text-right font-medium">Devido (R$)</TableHead>
            <TableHead className="text-right font-medium">Diferença (R$)</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="text-center font-medium">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
              <TableCell>{item.invoiceNumber}</TableCell>
              <TableCell>{item.supplierName}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right font-mono">{formatCurrency(item.value)}</TableCell>
              <TableCell className="text-right font-mono">{formatCurrency(item.retainedValue)}</TableCell>
              <TableCell className="text-right font-mono">{formatCurrency(item.correctValue)}</TableCell>
              <TableCell 
                className={`text-right font-medium font-mono ${
                  item.difference > 0 
                    ? 'text-green-600' 
                    : item.difference < 0 
                      ? 'text-amber-600' 
                      : ''
                }`}
              >
                {formatCurrency(item.difference)}
              </TableCell>
              <TableCell><StatusBadge status={item.status} /></TableCell>
              <TableCell className="text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visualizar detalhes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gerar relatório</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
