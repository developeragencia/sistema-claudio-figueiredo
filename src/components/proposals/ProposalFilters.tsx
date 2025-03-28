import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Search, X } from 'lucide-react';
import { PROPOSAL_STATUS_LABELS, ProposalStatus } from '@/types/proposal';
import { useClients } from '@/hooks/useClients';
import { useAuth } from '@/hooks/useAuth';

interface ProposalFiltersProps {
  className?: string;
  onFilterChange: (filters: {
    status?: ProposalStatus[];
    clientId?: string;
    salesRepId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }) => void;
}

const ProposalFilters: React.FC<ProposalFiltersProps> = ({ className, onFilterChange }) => {
  const { user } = useAuth();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<ProposalStatus[]>([]);
  const [clientId, setClientId] = React.useState<string>();
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const { data: clients, isLoading: isLoadingClients } = useClients({
    enabled: user?.role !== 'CLIENT',
    assignedOnly: user?.role === 'SALES_REP',
  });

  const handleFilterChange = () => {
    onFilterChange({
      search: search || undefined,
      status: status.length > 0 ? status : undefined,
      clientId,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
      salesRepId: user?.role === 'SALES_REP' ? user.id : undefined,
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus([]);
    setClientId(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    onFilterChange({});
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [search, status, clientId, startDate, endDate]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Buscar propostas..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleClearFilters}
        >
          <X className="h-4 w-4" />
          Limpar filtros
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-[180px]">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status[0] || ''}
            onValueChange={(value) => setStatus(value ? [value as ProposalStatus] : [])}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROPOSAL_STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {user?.role !== 'CLIENT' && (
          <div className="w-[250px]">
            <Label htmlFor="client">Cliente</Label>
            <Select
              value={clientId || ''}
              onValueChange={(value) => setClientId(value || undefined)}
              disabled={isLoadingClients}
            >
              <SelectTrigger id="client">
                <SelectValue placeholder="Todos os clientes" />
              </SelectTrigger>
              <SelectContent>
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.razaoSocial}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="w-[180px]">
          <Label>Data inicial</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-[180px]">
          <Label>Data final</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? (
                  format(endDate, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                locale={ptBR}
                disabled={(date) =>
                  startDate ? date < startDate : false
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ProposalFilters; 