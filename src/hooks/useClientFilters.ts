
import { useState, useMemo } from 'react';
import { Client } from '@/types/client';

export const useClientFilters = (clients: Client[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.documentNumber.includes(searchQuery);
      
      const matchesStatus = statusFilter ? client.status === statusFilter : true;
      
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchQuery, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredClients
  };
};
