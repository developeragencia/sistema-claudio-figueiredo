
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { AuditAction } from '../types';

interface AuditFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  actionFilter: string | null;
  setActionFilter: (value: string) => void;
  userFilter: string | null;
  setUserFilter: (value: string) => void;
  dateFilter: { from: Date | null; to: Date | null };
  setDateFilter: (value: { from: Date | null; to: Date | null }) => void;
  onExport: () => void;
}

const AuditFilters: React.FC<AuditFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  actionFilter,
  setActionFilter,
  userFilter,
  setUserFilter,
  dateFilter,
  setDateFilter,
  onExport,
}) => {
  // Action types for filter
  const actionTypes: { label: string; value: AuditAction | "all" }[] = [
    { label: "Todas Ações", value: "all" },
    { label: "Criação", value: "create" },
    { label: "Atualização", value: "update" },
    { label: "Exclusão", value: "delete" },
    { label: "Mudança de Status", value: "status_change" },
    { label: "Cálculo", value: "calculation" },
    { label: "Exportação", value: "export" },
    { label: "Importação", value: "import" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar nos logs de auditoria..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <div className="flex-1 sm:max-w-[200px]">
          <Select
            value={actionFilter || "all"}
            onValueChange={setActionFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Ação" />
            </SelectTrigger>
            <SelectContent>
              {actionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onExport}
          className="sm:ml-auto"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default AuditFilters;
