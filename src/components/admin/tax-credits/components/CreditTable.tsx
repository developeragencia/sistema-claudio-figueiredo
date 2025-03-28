
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch, Edit, Trash2, RefreshCcw } from 'lucide-react';
import { TaxCredit } from '@/types/tax-credits';
import StatusBadge from './StatusBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CreditTableProps {
  credits: TaxCredit[];
  isLoading: boolean;
  onViewDetails: (creditId: string) => void;
  onEditCredit?: (credit: TaxCredit) => void;
  onDeleteCredit?: (credit: TaxCredit) => void;
  onStatusChange?: (credit: TaxCredit) => void;
  onEdit?: (credit: TaxCredit) => void;
  onDelete?: (credit: TaxCredit) => void;
}

const CreditTable: React.FC<CreditTableProps> = ({ 
  credits, 
  isLoading, 
  onViewDetails,
  onEdit,
  onDelete,
  onStatusChange,
  onEditCredit,
  onDeleteCredit
}) => {
  // Use the appropriate handlers (support both naming conventions)
  const handleEdit = (credit: TaxCredit) => {
    if (onEditCredit) {
      onEditCredit(credit);
    } else if (onEdit) {
      onEdit(credit);
    }
  };
  
  const handleDelete = (credit: TaxCredit) => {
    if (onDeleteCredit) {
      onDeleteCredit(credit);
    } else if (onDelete) {
      onDelete(credit);
    }
  };
  
  const handleStatusChange = (credit: TaxCredit) => {
    if (onStatusChange) {
      onStatusChange(credit);
    }
  };

  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Cliente</th>
            <th className="py-3 px-4 text-left font-medium">Documento</th>
            <th className="py-3 px-4 text-left font-medium">Tipo</th>
            <th className="py-3 px-4 text-left font-medium">Valor</th>
            <th className="py-3 px-4 text-left font-medium">Período</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-right font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b">
                <td colSpan={7} className="py-4 px-4">
                  <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : credits.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 px-4 text-center text-muted-foreground">
                Nenhum crédito tributário encontrado.
              </td>
            </tr>
          ) : (
            credits.map((credit) => (
              <tr key={credit.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{credit.clientName}</td>
                <td className="py-3 px-4">{credit.documentNumber}</td>
                <td className="py-3 px-4">{credit.creditType}</td>
                <td className="py-3 px-4">{formatCurrency(credit.creditAmount)}</td>
                <td className="py-3 px-4">
                  {new Date(credit.periodStart).toLocaleDateString('pt-BR')} a {new Date(credit.periodEnd).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={credit.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onViewDetails(credit.id)}
                      title="Ver detalhes"
                    >
                      <FileSearch className="h-4 w-4" />
                      <span className="sr-only">Ver detalhes</span>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(credit)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(credit)}>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          <span>Alterar status</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(credit)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreditTable;
