import { Role } from './auth';

export type UserRole = 'ADMIN' | 'MANAGER' | 'ANALYST' | 'USER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  MANAGER: 'Gerente',
  ANALYST: 'Analista',
  USER: 'Usuário'
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateUserData {
  name?: string;
  role?: UserRole;
  status?: UserStatus;
  avatar_url?: string;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

export interface UserResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name: string;
  roles: string[];
  clientId?: string;
}

export interface UserUpdateInput {
  name?: string;
  roles?: string[];
  clientId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  position?: string;
  department?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  role: UserRole;
  status?: UserStatus;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  position?: string;
  phone?: string;
  department?: string;
  bio?: string;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
}

export interface Client {
  id: string;
  cnpj: string;
  corporateName: string;
  tradeName: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  assignedUsers: string[]; // IDs dos usuários com acesso
  salesRepId?: string; // ID do representante comercial
}

export interface CreateClientData {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  type?: 'public' | 'private';
}

export interface UpdateClientData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  type?: 'public' | 'private';
  status?: 'active' | 'inactive';
}

export interface ClientsResponse {
  data: Client[];
  total: number;
}

export interface ActiveClientContext {
  client: Client | null;
  setActiveClient: (client: Client | null) => void;
}

export interface UserPermissions {
  canViewAllClients: boolean;
  canEditClients: boolean;
  canCreateProposals: boolean;
  canApproveProposals: boolean;
  canViewFinancialData: boolean;
  canExportData: boolean;
  canManageUsers: boolean;
}

export interface UpdatePasswordData {
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UseUsersReturn {
  users: User[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  createUser: (data: CreateUserData) => Promise<User>;
  updateUser: (id: string, data: UpdateUserData) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

export interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  updateUser: (data: Partial<User>) => Promise<void>;
  deleteUser: () => Promise<void>;
}
