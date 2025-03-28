
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'EM_ANDAMENTO': return 'Em Andamento';
    case 'PENDENTE': return 'Pendente';
    case 'CONCLUIDA': return 'Concluída';
    case 'CANCELADA': return 'Cancelada';
    default: return status;
  }
};

interface AuditFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string; // Changed from filterStatus
  setStatusFilter: (status: string) => void; // Changed from setFilterStatus
  typeFilter: string; // Added typeFilter
  setTypeFilter: (type: string) => void; // Added setTypeFilter
}

const AuditFilters: React.FC<AuditFiltersProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter,
  typeFilter,
  setTypeFilter
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por cliente, tipo de auditoria..."
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
              <span>{statusFilter ? getStatusLabel(statusFilter) : "Todos os status"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="CONCLUIDA">Concluída</SelectItem>
            <SelectItem value="CANCELADA">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Add type filter if needed */}
      {typeFilter !== undefined && (
        <div>
          <Select value={typeFilter || "all"} onValueChange={value => setTypeFilter(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{typeFilter ? typeFilter : "Todos os tipos"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Fiscal">Fiscal</SelectItem>
              <SelectItem value="Contábil">Contábil</SelectItem>
              <SelectItem value="Trabalhista">Trabalhista</SelectItem>
              <SelectItem value="Previdenciária">Previdenciária</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default AuditFilters;
