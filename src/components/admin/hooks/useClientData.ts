
import { useState, useEffect } from 'react';
import { useClientStore } from '@/hooks/useClientStore';
import { Client } from '@/types/client';

export const useClientData = (searchQuery: string) => {
  const { clients } = useClientStore();
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredClients(clients);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(query) ||
      client.cnpj.toLowerCase().includes(query) ||
      client.segment.toLowerCase().includes(query) ||
      client.contactName.toLowerCase().includes(query)
    );
    
    setFilteredClients(filtered);
  }, [clients, searchQuery]);
  
  return {
    clients,
    filteredClients
  };
};
