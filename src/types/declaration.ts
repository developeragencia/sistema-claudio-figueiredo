export type DeclarationType = 'DARF' | 'GFIP' | 'SEFIP' | 'INSS' | 'FGTS' | 'PIS' | 'COFINS' | 'IRPJ' | 'CSLL';

export type DeclarationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

export interface DeclarationDetails {
  taxType?: string;
  taxCode?: string;
  referenceNumber?: string;
  observations?: string;
  attachments?: string[];
}

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
  type?: DeclarationType;
  period?: string;
  value?: number;
  details?: Partial<DeclarationDetails>;
  status?: DeclarationStatus;
  dueDate?: string;
  submissionDate?: string;
}

export interface DeclarationFilters {
  search?: string;
  type?: DeclarationType;
  status?: DeclarationStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface DeclarationTableProps {
  declarations: Declaration[];
  onDeclarationClick?: (declaration: Declaration) => void;
}

export interface CompanyInfoCardProps {
  declaration: Declaration;
}

export interface DeclarationResponse {
  declarations: Declaration[];
  total: number;
  page: number;
  limit: number;
}

export const DECLARATION_TYPE_LABELS: Record<DeclarationType, string> = {
  DARF: 'DARF',
  GFIP: 'GFIP',
  SEFIP: 'SEFIP',
  INSS: 'INSS',
  FGTS: 'FGTS',
  PIS: 'PIS',
  COFINS: 'COFINS',
  IRPJ: 'IRPJ',
  CSLL: 'CSLL'
};

export const DECLARATION_STATUS_LABELS: Record<DeclarationStatus, string> = {
  PENDING: 'Pendente',
  PROCESSING: 'Em Processamento',
  COMPLETED: 'Concluída',
  ERROR: 'Erro'
};

export const DECLARATION_STATUS_COLORS: Record<DeclarationStatus, string> = {
  PENDING: 'yellow',
  PROCESSING: 'blue',
  COMPLETED: 'green',
  ERROR: 'red'
};

export interface UseDeclarationsReturn {
  declarations: Declaration[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  page: number;
  limit: number;
  createDeclaration: (data: CreateDeclarationData) => Promise<void>;
  updateDeclaration: (id: string, data: UpdateDeclarationData) => Promise<void>;
  deleteDeclaration: (id: string) => Promise<void>;
}

export interface UseDeclarationReturn {
  declaration: Declaration | null;
  isLoading: boolean;
  error: Error | null;
  updateDeclaration: (data: UpdateDeclarationData) => Promise<void>;
  deleteDeclaration: () => Promise<void>;
} 