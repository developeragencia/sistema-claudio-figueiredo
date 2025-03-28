
import { Client } from '@/types/client';

// Extend Client type to include user role permissions
export interface ClientWithPermissions extends Client {
  userRoles?: {
    canViewOperations: boolean;
    canEditOperations: boolean;
    canApproveOperations: boolean;
    isAdmin: boolean;
    isRepresentative: boolean;
  }
  tags?: string[]; // Add tags property
}

export interface ClientStore {
  activeClient: ClientWithPermissions | null;
  recentClients: ClientWithPermissions[];
  allClients: ClientWithPermissions[]; 
  pendingProposals: number;
  setActiveClient: (client: ClientWithPermissions | null) => void;
  addClient: (client: ClientWithPermissions) => void;
  updateClient: (id: string, data: Partial<ClientWithPermissions>) => void;
  removeClient: (id: string) => void;
  clearActiveClient: () => void;
  setPendingProposals: (count: number) => void;
  // Alias for backward compatibility
  clients: ClientWithPermissions[];
}
