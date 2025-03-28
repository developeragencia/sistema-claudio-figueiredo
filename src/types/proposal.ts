import { User } from './user';

export type ProposalStatus = 'DRAFT' | 'ANALYSIS' | 'APPROVED' | 'REJECTED' | 'CONVERTED';

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  DRAFT: 'Rascunho',
  ANALYSIS: 'Em Análise',
  APPROVED: 'Aprovada',
  REJECTED: 'Rejeitada',
  CONVERTED: 'Convertida'
};

export const PROPOSAL_STATUS_COLORS: Record<ProposalStatus, string> = {
  DRAFT: 'text-gray-500',
  ANALYSIS: 'text-yellow-500',
  APPROVED: 'text-green-500',
  REJECTED: 'text-red-500',
  CONVERTED: 'text-blue-500'
};

export interface ProposalDetails {
  estimatedValue: number;
  description: string;
  periodStart?: string;
  periodEnd?: string;
  additionalNotes?: string;
  serviceDescription?: string;
}

export interface ProposalTimeline {
  id: string;
  status: ProposalStatus;
  comments?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Client {
  id: string;
  name: string;
  cnpj: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  client: Client;
  totalValue: number;
  validUntil: string;
  status: ProposalStatus;
  details: ProposalDetails;
  timeline: ProposalTimeline[];
  createdAt: string;
  updatedAt: string;
  salesRepId?: string;
}

export interface ProposalFilters {
  status?: ProposalStatus[];
  clientId?: string;
  salesRepId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProposalResponse {
  proposals: Proposal[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProposalData {
  title: string;
  description: string;
  client: Client;
  totalValue: number;
  validUntil: string;
  details: ProposalDetails;
  salesRepId?: string;
}

export interface UpdateProposalData {
  id: string;
  title?: string;
  description?: string;
  totalValue?: number;
  validUntil?: string;
  details?: Partial<ProposalDetails>;
}

export interface UpdateProposalStatusData {
  status: ProposalStatus;
  comments?: string;
}

export interface Contract {
  id: string;
  proposalId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
  startDate: string;
  endDate: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  salesRepId: string;
}

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ProposalTimelineEvent {
  id: string;
  type: 'CREATED' | 'UPDATED' | 'ANALYZED' | 'APPROVED' | 'REJECTED' | 'CONVERTED';
  description: string;
  userName: string;
  metadata?: any;
  createdAt: string;
}

export interface ProposalEvent {
  id: string;
  proposalId: string;
  type: 'STATUS_CHANGE' | 'COMMENT' | 'DOCUMENT_ADDED';
  description: string;
  userId: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ProposalService {
  id: string;
  name: string;
  description: string;
  value: number;
  recurrence: 'one_time' | 'monthly' | 'yearly';
}

// Tipos para análise automática de créditos
export interface CreditAnalysis {
  id: string;
  clientId: string;
  period: {
    start: string;
    end: string;
  };
  transactions: CreditTransaction[];
  summary: {
    totalCredits: number;
    totalRetentions: number;
    potentialCredits: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface CreditTransaction {
  id: string;
  date: string;
  supplier: {
    id: string;
    name: string;
    cnpj: string;
    retentionType: 'full' | 'partial' | 'exempt';
    retentionReason?: string;
  };
  value: number;
  retentionValue: number;
  retentionRules: {
    ruleId: string;
    description: string;
    appliedValue: number;
  }[];
  status: 'identified' | 'pending_review' | 'approved' | 'rejected';
  observations?: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

export interface ContractDocument {
  id: string;
  contractId: string;
  type: 'CONTRACT' | 'AMENDMENT' | 'ATTACHMENT';
  name: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface UseProposalsReturn {
  proposals: Proposal[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  createProposal: (data: CreateProposalData) => Promise<Proposal>;
  updateProposal: (id: string, data: UpdateProposalData) => Promise<Proposal>;
  updateStatus: (id: string, data: UpdateProposalStatusData) => Promise<Proposal>;
  deleteProposal: (id: string) => Promise<void>;
}

export interface UseProposalReturn {
  proposal: Proposal | null;
  isLoading: boolean;
  error: Error | null;
  updateStatus: (status: ProposalStatus, comments: string) => Promise<void>;
}
