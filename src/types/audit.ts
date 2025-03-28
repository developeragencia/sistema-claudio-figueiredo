import { User } from './user'
import { Json } from './supabase'

export interface Audit {
  id: string;
  title?: string;
  client?: string;
  clientName: string;
  type?: string;
  auditType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  assignedTo?: string;
  priority?: string;
  description?: string;
  findings?: string;
  recommendations?: string;
  clientId?: string;
  date?: string;
  startDate?: string;
  deadline?: string;
  documentsCount?: number;
  documentNumber?: string;
  documents?: string[];
  completionDate?: string;
  observations?: string;
  notes?: string;
}

export interface AuditSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  inProgress: number;
  // For backward compatibility
  totalAudits: number;
  pendingAudits: number;
  completedAudits: number;
  inProgressAudits: number;
  // Portuguese labels
  emAndamento: number;
  pendentes: number;
  concluidas: number;
}

export interface AuditLog {
  id: string
  user_id: string
  action: string
  entity: string
  entity_id: string
  details: Json
  created_at: string
  user?: Pick<User, 'id' | 'name' | 'email'>
}

export interface AuditLogFilters {
  user_id?: string
  action?: string
  entity?: string
  entity_id?: string
  start_date?: string
  end_date?: string
  page?: number
  limit?: number
}

export interface AuditLogResponse {
  logs: AuditLog[]
  total: number
  page: number
  limit: number
}

export type AuditEventType = 'USER' | 'SYSTEM' | 'SECURITY' | 'DATA';

export type AuditEventSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface AuditEvent {
  id: string;
  type: AuditEventType;
  severity: AuditEventSeverity;
  message: string;
  details: {
    action: string;
    target: string;
    metadata?: Record<string, any>;
  };
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface CreateAuditEventData {
  type: AuditEventType;
  severity: AuditEventSeverity;
  message: string;
  details: {
    action: string;
    target: string;
    metadata?: Record<string, any>;
  };
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditFilters {
  type?: AuditEventType;
  severity?: AuditEventSeverity;
  userId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface AuditResponse {
  events: AuditEvent[];
  total: number;
  page: number;
  limit: number;
}

export interface UseSystemAuditReturn {
  events: AuditEvent[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  createEvent: (data: CreateAuditEventData) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export const AUDIT_EVENT_TYPE_LABELS: Record<AuditEventType, string> = {
  USER: 'Usuário',
  SYSTEM: 'Sistema',
  SECURITY: 'Segurança',
  DATA: 'Dados'
};

export const AUDIT_EVENT_SEVERITY_LABELS: Record<AuditEventSeverity, string> = {
  INFO: 'Informação',
  WARNING: 'Alerta',
  ERROR: 'Erro',
  CRITICAL: 'Crítico'
};

export const AUDIT_EVENT_SEVERITY_COLORS: Record<AuditEventSeverity, string> = {
  INFO: 'bg-blue-500',
  WARNING: 'bg-yellow-500',
  ERROR: 'bg-red-500',
  CRITICAL: 'bg-red-700'
};
