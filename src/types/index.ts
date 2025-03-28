export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'MASTER_ADMIN';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'blocked';
}

export interface AuthResponse {
  user: User | null;
  session: any | null;
  error: Error | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  password: string;
  confirmPassword: string;
}

export interface ProposalFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TransactionFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'ANALYSIS' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  userId: string;
  clientId: string;
  amount: number;
  timeline: ProposalTimeline[];
}

export interface ProposalTimeline {
  id: string;
  status: string;
  comment?: string;
  createdAt: string;
  userId: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  description: string;
} 