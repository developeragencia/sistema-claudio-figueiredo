import type { Proposal, Client } from './proposal';

export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ProposalResponse extends PaginatedResponse<Proposal> {}

export interface ClientResponse extends PaginatedResponse<Client> {}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
} 