export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
export type ClientType = 'public' | 'private';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Client {
  id: string;
  razao_social: string;
  nome_fantasia?: string;
  cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  address: Address;
  contacts: Contact[];
  status: ClientStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientData {
  razao_social: string;
  nome_fantasia?: string;
  cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  address: Address;
  contacts: Contact[];
}

export interface UpdateClientData {
  razao_social?: string;
  nome_fantasia?: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  address?: Address;
  contacts?: Contact[];
  status?: ClientStatus;
}

export interface ClientFilters {
  status?: ClientStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ClientResponse {
  clients: Client[];
  total: number;
  page: number;
  limit: number;
}

export interface UseClientsReturn {
  clients: Client[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  createClient: (data: CreateClientData) => Promise<void>;
  updateClient: (id: string, data: UpdateClientData) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export interface UseClientReturn {
  client: Client | null;
  isLoading: boolean;
  error: Error | null;
  updateClient: (data: UpdateClientData) => Promise<void>;
  deleteClient: () => Promise<void>;
}

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  BLOCKED: 'Bloqueado'
};
