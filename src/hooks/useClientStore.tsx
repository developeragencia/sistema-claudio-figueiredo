
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client as ClientType } from '@/types/client';
import { toast } from 'sonner';

interface ClientStore {
  activeClient: ClientType | null;
  recentClients: ClientType[];
  allClients: ClientType[]; // This is the correct property name
  setActiveClient: (client: ClientType | null) => void;
  addClient: (client: ClientType) => void;
  updateClient: (id: string, data: Partial<ClientType>) => void;
  removeClient: (id: string) => void;
  clearActiveClient: () => void;
  // Alias for backward compatibility
  get clients(): ClientType[];
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      activeClient: null,
      recentClients: [],
      allClients: [
        {
          id: '1',
          name: 'Empresa ACME Ltda',
          cnpj: '12.345.678/0001-90',
          documentNumber: '12.345.678/0001-90',
          email: 'contato@acme.com.br',
          phone: '(11) 3456-7890',
          address: 'Av. Paulista, 1000',
          city: 'São Paulo',
          state: 'SP',
          contactName: 'João Silva',
          contactEmail: 'joao@acme.com.br',
          contactPhone: '(11) 98765-4321',
          status: 'ACTIVE',
          createdAt: '2023-06-01T10:00:00Z',
          updatedAt: '2023-06-01T10:00:00Z',
          segment: 'Tecnologia',
          type: 'private',
        },
        {
          id: '2',
          name: 'Indústrias XYZ S/A',
          cnpj: '98.765.432/0001-10',
          documentNumber: '98.765.432/0001-10',
          email: 'financeiro@xyz.com.br',
          phone: '(11) 2345-6789',
          address: 'Rua Augusta, 500',
          city: 'São Paulo',
          state: 'SP',
          contactName: 'Maria Oliveira',
          contactEmail: 'maria@xyz.com.br',
          contactPhone: '(11) 98765-4321',
          status: 'ACTIVE',
          createdAt: '2023-07-15T14:30:00Z',
          updatedAt: '2023-07-15T14:30:00Z',
          segment: 'Indústria',
          type: 'private',
        },
        {
          id: '3',
          name: 'Tech Solutions Brasil',
          cnpj: '56.789.123/0001-45',
          documentNumber: '56.789.123/0001-45',
          email: 'contato@techsolutions.com.br',
          phone: '(21) 9876-5432',
          address: 'Av. Rio Branco, 100',
          city: 'Rio de Janeiro',
          state: 'RJ',
          contactName: 'Roberto Santos',
          contactEmail: 'roberto@techsolutions.com.br',
          contactPhone: '(21) 98765-4321',
          status: 'ACTIVE',
          createdAt: '2023-08-10T09:15:00Z',
          updatedAt: '2023-08-10T09:15:00Z',
          segment: 'Tecnologia',
          type: 'private',
        },
      ],
      // Add a getter that returns allClients as clients
      get clients() {
        return get().allClients;
      },
      setActiveClient: (client) => {
        set((state) => {
          // Update recent clients
          let recentClients = [...state.recentClients];
          
          if (client) {
            // Remove if already exists
            recentClients = recentClients.filter(c => c.id !== client.id);
            // Add to beginning of array
            recentClients.unshift(client);
            // Limit to 5 recent clients
            recentClients = recentClients.slice(0, 5);
            
            // Show toast notification
            toast.success(`Cliente ativo: ${client.name}`, {
              description: `CNPJ: ${client.cnpj}`,
              duration: 3000,
            });
          }
          
          return {
            activeClient: client,
            recentClients
          };
        });
      },
      clearActiveClient: () => {
        set({ activeClient: null });
        toast.info('Cliente ativo removido', {
          duration: 2000,
        });
      },
      addClient: (client) => {
        set((state) => ({
          allClients: [...state.allClients, client]
        }));
      },
      updateClient: (id, data) => {
        set((state) => {
          const updatedClients = state.allClients.map(client => 
            client.id === id ? { ...client, ...data } : client
          );
          
          // Update active client if it's the one being modified
          let updatedActiveClient = state.activeClient;
          if (state.activeClient && state.activeClient.id === id) {
            updatedActiveClient = { ...state.activeClient, ...data };
          }
          
          // Update recent clients if needed
          const updatedRecentClients = state.recentClients.map(client => 
            client.id === id ? { ...client, ...data } : client
          );
          
          return {
            allClients: updatedClients,
            activeClient: updatedActiveClient,
            recentClients: updatedRecentClients
          };
        });
      },
      removeClient: (id) => {
        set((state) => {
          // Remove from all clients
          const updatedClients = state.allClients.filter(client => client.id !== id);
          
          // Remove from recent clients
          const updatedRecentClients = state.recentClients.filter(client => client.id !== id);
          
          // Reset active client if it's the one being removed
          const updatedActiveClient = 
            state.activeClient && state.activeClient.id === id 
              ? null 
              : state.activeClient;
          
          return {
            allClients: updatedClients,
            recentClients: updatedRecentClients,
            activeClient: updatedActiveClient
          };
        });
      }
    }),
    {
      name: 'client-store'
    }
  )
);
