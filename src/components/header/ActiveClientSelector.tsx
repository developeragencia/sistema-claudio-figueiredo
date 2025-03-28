import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActiveClient } from '@/contexts/ActiveClientContext';
import { Client } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { fetchUserClients } from '@/services/clientService';

export function ActiveClientSelector() {
  const { client: activeClient, setActiveClient } = useActiveClient();
  
  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ['userClients'],
    queryFn: fetchUserClients,
  });

  const handleClientChange = (cnpj: string) => {
    const selectedClient = clients.find(c => c.cnpj === cnpj) || null;
    setActiveClient(selectedClient);
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Carregando clientes...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium">Cliente Ativo:</span>
      <Select
        value={activeClient?.cnpj || ''}
        onValueChange={handleClientChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Selecione um cliente" />
        </SelectTrigger>
        <SelectContent>
          {clients.map((client) => (
            <SelectItem
              key={client.cnpj}
              value={client.cnpj}
              disabled={!client.active}
            >
              {client.corporateName} - {client.cnpj}
              {!client.active && ' (Inativo)'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 