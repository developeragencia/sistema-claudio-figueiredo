import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients } from '@/hooks/useClients';
import { Skeleton } from '@/components/ui/skeleton';

interface TransactionFiltersProps {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  clientFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClientChange: (value: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchTerm,
  statusFilter,
  typeFilter,
  clientFilter,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClientChange
}) => {
  const { data: clientsData, isLoading: isLoadingClients } = useClients({
    limit: 100, // Carrega mais clientes para o filtro
    status: 'active', // Apenas clientes ativos
  });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 flex-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por descrição, número do documento ou cliente..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Filter className="text-muted-foreground h-4 w-4" />
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
            <SelectItem value="processing">Em processamento</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="rejected">Rejeitado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os tipos</SelectItem>
            <SelectItem value="IRRF">IRRF</SelectItem>
            <SelectItem value="PIS">PIS</SelectItem>
            <SelectItem value="COFINS">COFINS</SelectItem>
            <SelectItem value="CSLL">CSLL</SelectItem>
          </SelectContent>
        </Select>
        {isLoadingClients ? (
          <Skeleton className="h-10 w-[180px]" />
        ) : (
          <Select value={clientFilter} onValueChange={onClientChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os clientes</SelectItem>
              {clientsData?.data.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters; 