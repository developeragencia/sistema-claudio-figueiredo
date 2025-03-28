import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useClients } from '@/hooks/useClients';
import { Client } from '@/types/user';
import { Building2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveClientSelectorProps {
  className?: string;
}

const ActiveClientSelector: React.FC<ActiveClientSelectorProps> = ({ className }) => {
  const { user, updateUser } = useAuth();
  const { data: clients, isLoading } = useClients({
    enabled: user?.role !== 'CLIENT',
    assignedOnly: user?.role === 'SALES_REP',
    status: 'active',
  });

  const handleClientChange = (clientId: string) => {
    updateUser({
      ...user!,
      clientId: clientId === 'none' ? undefined : clientId,
    });
  };

  const getFilteredClients = (): Client[] => {
    if (!clients) return [];
    
    switch (user?.role) {
      case 'MASTER_ADMIN':
      case 'OFFICE_TEAM':
        return clients;
      case 'SALES_REP':
        return clients;
      case 'CLIENT':
        return clients.filter(client =>
          client.id === user.clientId
        );
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Carregando clientes...</span>
      </div>
    );
  }

  const filteredClients = getFilteredClients();

  if (user?.role === 'CLIENT') {
    const client = filteredClients[0];
    if (!client) return null;

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Building2 className="h-4 w-4" />
        <span className="font-medium">{client.razaoSocial}</span>
        {client.nomeFantasia && (
          <span className="text-muted-foreground">
            ({client.nomeFantasia})
          </span>
        )}
      </div>
    );
  }

  return (
    <Select
      value={user?.clientId || 'none'}
      onValueChange={handleClientChange}
    >
      <SelectTrigger className={cn("w-[300px]", className)}>
        <SelectValue placeholder="Selecione um cliente" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clientes</SelectLabel>
          <SelectItem value="none">Nenhum cliente selecionado</SelectItem>
          {filteredClients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              <div className="flex items-center gap-2">
                <span>{client.razaoSocial}</span>
                {client.nomeFantasia && (
                  <span className="text-muted-foreground">
                    ({client.nomeFantasia})
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ActiveClientSelector; 