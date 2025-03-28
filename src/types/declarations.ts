// Define status types used across the application

export type StatusType = 
  | 'PENDING'
  | 'PROCESSING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CANCELED'
  | 'COMPLETED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ANALYZING'
  | 'RECOVERED';

export type DeclarationType = 'DARF' | 'GFIP' | 'SEFIP' | 'DCTF' | 'DIRF' | 'EFD_REINF' | 'ESOCIAL';

export type DeclarationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

export const DECLARATION_STATUS_LABELS: Record<DeclarationStatus, string> = {
  PENDING: 'Pendente',
  PROCESSING: 'Em Processamento',
  COMPLETED: 'Concluída',
  ERROR: 'Erro'
};

export const DECLARATION_STATUS_COLORS: Record<DeclarationStatus, string> = {
  PENDING: 'bg-yellow-500',
  PROCESSING: 'bg-blue-500',
  COMPLETED: 'bg-green-500',
  ERROR: 'bg-red-500'
};

export interface Declaration {
  id: string;
  companyName: string;
  cnpj: string;
  type: DeclarationType;
  period: string;
  value: number;
  details: DeclarationDetails;
  status: DeclarationStatus;
  dueDate: string;
  submissionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeclarationTableProps {
  declarations: Declaration[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export interface CompanyInfo {
  companyName: string;
  cnpj: string;
  address?: string;
  phone?: string;
  email?: string;
}

// Add missing types needed for other components
export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
  downloadUrl: string;
  // Add properties needed by AttachmentsCard
  name: string;
  size: string;
  date: string;
}

export interface HistoryItem {
  id: string;
  action: string;
  date: string;
  user: string;
  details?: string;
  status?: StatusType; // Keep as optional to maintain compatibility
}

// Add a new interface for declaration details
export interface DeclarationDetails {
  taxType?: string;
  taxCode?: string;
  referenceNumber?: string;
  observations?: string;
  attachments?: {
    name: string;
    url: string;
  }[];
}

export interface DeclarationFilters {
  type?: DeclarationType;
  status?: DeclarationStatus;
  period?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface DeclarationResponse {
  declarations: Declaration[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateDeclarationData {
  companyName: string;
  cnpj: string;
  type: DeclarationType;
  period: string;
  value: number;
  details: DeclarationDetails;
  dueDate: string;
}

export interface UpdateDeclarationData {
  companyName?: string;
  type?: DeclarationType;
  period?: string;
  value?: number;
  details?: DeclarationDetails;
  status?: DeclarationStatus;
  dueDate?: string;
  submissionDate?: string;
}

export interface CompanyInfoCardProps {
  declaration: Declaration;
}

export interface UseDeclarationsReturn {
  declarations: Declaration[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  createDeclaration: (data: CreateDeclarationData) => Promise<void>;
  updateDeclaration: (id: string, data: UpdateDeclarationData) => Promise<void>;
  deleteDeclaration: (id: string) => Promise<void>;
}

export const DECLARATION_TYPE_LABELS: Record<DeclarationType, string> = {
  DARF: 'DARF',
  GFIP: 'GFIP',
  SEFIP: 'SEFIP',
  DCTF: 'DCTF',
  DIRF: 'DIRF',
  EFD_REINF: 'EFD-REINF',
  ESOCIAL: 'e-Social'
};
