
import { useState, useEffect } from 'react';
import { Client } from '@/types/client';

// Mock data for clients
const mockClients: Client[] = [
  {
    id: "1",
    name: "Empresa ABC Ltda",
    cnpj: "12.345.678/0001-90",
    documentNumber: "12.345.678/0001-90",
    status: 'ACTIVE',
    type: 'private',
    segment: "Tecnologia",
    address: "Av. Paulista, 1000, São Paulo - SP",
    city: "São Paulo",
    state: "SP",
    contactName: "João Silva",
    contactEmail: "contato@empresaabc.com.br",
    contactPhone: "(11) 3456-7890",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    email: "contato@empresaabc.com.br",
    phone: "(11) 3456-7890",
  },
  {
    id: "2",
    name: "Indústria XYZ S.A.",
    cnpj: "23.456.789/0001-10",
    documentNumber: "23.456.789/0001-10",
    status: 'ACTIVE',
    type: 'public',
    segment: "Manufatura",
    address: "Rua Industrial, 500, Guarulhos - SP",
    city: "Guarulhos",
    state: "SP",
    contactName: "Maria Oliveira",
    contactEmail: "financeiro@industriaxyz.com.br",
    contactPhone: "(11) 2345-6789",
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-02-10T09:15:00Z",
    email: "financeiro@industriaxyz.com.br",
    phone: "(11) 2345-6789",
  },
  {
    id: "3",
    name: "Comércio DEF Eireli",
    cnpj: "34.567.890/0001-21",
    documentNumber: "34.567.890/0001-21",
    status: 'INACTIVE',
    type: 'private',
    segment: "Varejo",
    address: "Rua Comercial, 200, Campinas - SP",
    city: "Campinas",
    state: "SP",
    contactName: "Carlos Santos",
    contactEmail: "contato@comerciodef.com.br",
    contactPhone: "(11) 4567-8901",
    createdAt: "2023-03-05T11:45:00Z",
    updatedAt: "2023-06-18T16:30:00Z",
    email: "contato@comerciodef.com.br",
    phone: "(11) 4567-8901",
  },
  {
    id: "4",
    name: "Serviços GHI S.A.",
    cnpj: "45.678.901/0001-32",
    documentNumber: "45.678.901/0001-32",
    status: 'ACTIVE',
    type: 'public',
    segment: "Consultoria",
    address: "Av. Brasil, 1500, Rio de Janeiro - RJ",
    city: "Rio de Janeiro",
    state: "RJ",
    contactName: "Ana Souza",
    contactEmail: "atendimento@servicosghi.com.br",
    contactPhone: "(11) 5678-9012",
    createdAt: "2023-04-20T08:00:00Z",
    updatedAt: "2023-04-20T08:00:00Z",
    email: "atendimento@servicosghi.com.br",
    phone: "(11) 5678-9012",
  },
  {
    id: "5",
    name: "Transportes JKL Ltda",
    cnpj: "56.789.012/0001-43",
    documentNumber: "56.789.012/0001-43",
    status: 'ACTIVE',
    type: 'private',
    segment: "Logística",
    address: "Rodovia BR 101, Km 200, Florianópolis - SC",
    city: "Florianópolis",
    state: "SC",
    contactName: "Roberto Lima",
    contactEmail: "operacoes@transportesjkl.com.br",
    contactPhone: "(11) 6789-0123",
    createdAt: "2023-05-15T14:30:00Z",
    updatedAt: "2023-05-15T14:30:00Z",
    email: "operacoes@transportesjkl.com.br",
    phone: "(11) 6789-0123",
  }
];

export const useClientData = (searchQuery: string) => {
  const [clients] = useState<Client[]>(mockClients);
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredClients(clients);
      return;
    }
    
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.cnpj.includes(searchQuery) ||
      (client.contactName && client.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (client.contactEmail && client.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setFilteredClients(filtered);
  }, [clients, searchQuery]);
  
  return {
    clients,
    filteredClients,
  };
};
