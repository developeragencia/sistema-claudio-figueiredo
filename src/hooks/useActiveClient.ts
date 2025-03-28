
import { useClientStore } from './useClientStore';
import { toast } from 'sonner';
import { Client } from '@/types/client';

export const useActiveClient = () => {
  const store = useClientStore();
  
  return {
    activeClient: store.activeClient,
    clients: store.clients,
    setActiveClient: (client: Client) => {
      store.setActiveClient(client);
      toast.success(`Cliente ativo: ${client.name}`, {
        description: `CNPJ: ${client.cnpj}`,
      });
    },
    clearActiveClient: () => {
      store.clearActiveClient();
      toast.info('Cliente ativo removido');
    },
    recentClients: store.recentClients,
    hasViewAccess: store.activeClient?.userRoles?.canViewOperations || false,
    hasEditAccess: store.activeClient?.userRoles?.canEditOperations || false,
    hasApprovalAccess: store.activeClient?.userRoles?.canApproveOperations || false,
    isClientAdmin: store.activeClient?.userRoles?.isAdmin || false,
    isRepresentative: store.activeClient?.userRoles?.isRepresentative || false,
    handleSelectClient: (clientId: string) => {
      const client = store.clients.find(c => c.id === clientId);
      if (client) {
        store.setActiveClient(client);
      }
    }
  };
};
