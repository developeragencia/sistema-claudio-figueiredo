
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreditFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  onExportData?: () => void;
}

const CreditFilters: React.FC<CreditFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  onExportData,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end mb-4">
      <div className="flex-1 space-y-1">
        <label htmlFor="search" className="text-sm font-medium">
          Buscar
        </label>
        <Input
          id="search"
          placeholder="Buscar por cliente, documento..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="w-full sm:w-[180px] space-y-1">
        <label htmlFor="statusFilter" className="text-sm font-medium">
          Status
        </label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger id="statusFilter">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="APPROVED">Aprovado</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="REJECTED">Rejeitado</SelectItem>
            <SelectItem value="ANALYZING">Em Análise</SelectItem>
            <SelectItem value="RECOVERED">Recuperado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-[180px] space-y-1">
        <label htmlFor="typeFilter" className="text-sm font-medium">
          Tipo
        </label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger id="typeFilter">
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="PIS/COFINS">PIS/COFINS</SelectItem>
            <SelectItem value="ICMS">ICMS</SelectItem>
            <SelectItem value="IPI">IPI</SelectItem>
            <SelectItem value="IRRF">IRRF</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {onExportData && (
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onExportData}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      )}
    </div>
  );
};

export default CreditFilters;
