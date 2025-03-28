
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

interface RecoveryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string; // Changed from filterStatus
  setStatusFilter: (status: string) => void; // Changed from setFilterStatus
  typeFilter: string; // Added typeFilter
  setTypeFilter: (type: string) => void; // Added setTypeFilter
}

const RecoveryFilters: React.FC<RecoveryFiltersProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter,
  typeFilter,
  setTypeFilter
}) => {
  const statusLabels: Record<string, string> = {
    'INICIAL': 'Inicial',
    'EM_ANDAMENTO': 'Em Andamento',
    'PARCIAL': 'Recuperação Parcial',
    'CONCLUIDO': 'Concluído'
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por cliente, processo, tipo..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <Select value={statusFilter || "all"} onValueChange={value => setStatusFilter(value === "all" ? "" : value)}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{statusFilter ? statusLabels[statusFilter] || statusFilter : "Todos os status"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="INICIAL">Inicial</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
            <SelectItem value="PARCIAL">Recuperação Parcial</SelectItem>
            <SelectItem value="CONCLUIDO">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Add credit type filter */}
      {typeFilter !== undefined && (
        <div>
          <Select value={typeFilter || "all"} onValueChange={value => setTypeFilter(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{typeFilter || "Todos os tipos"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="IRPJ">IRPJ</SelectItem>
              <SelectItem value="CSLL">CSLL</SelectItem>
              <SelectItem value="PIS/COFINS">PIS/COFINS</SelectItem>
              <SelectItem value="INSS">INSS</SelectItem>
              <SelectItem value="IRRF">IRRF</SelectItem>
              <SelectItem value="OUTROS">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default RecoveryFilters;
