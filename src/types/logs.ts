export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export type LogSource = 'API' | 'DATABASE' | 'AUTHENTICATION' | 'BACKGROUND_JOB' | 'INTEGRATION';

export interface LogEntry {
  id: string;
  level: LogLevel;
  source: LogSource;
  message: string;
  details: {
    context?: Record<string, any>;
    stackTrace?: string;
    metadata?: Record<string, any>;
  };
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface CreateLogEntryData {
  level: LogLevel;
  source: LogSource;
  message: string;
  details: {
    context?: Record<string, any>;
    stackTrace?: string;
    metadata?: Record<string, any>;
  };
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface LogFilters {
  level?: LogLevel;
  source?: LogSource;
  userId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface LogResponse {
  logs: LogEntry[];
  total: number;
  page: number;
  limit: number;
}

export interface UseSystemLogsReturn {
  logs: LogEntry[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  createLog: (data: CreateLogEntryData) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
}

export const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  DEBUG: 'Debug',
  INFO: 'Informação',
  WARNING: 'Alerta',
  ERROR: 'Erro',
  CRITICAL: 'Crítico'
};

export const LOG_SOURCE_LABELS: Record<LogSource, string> = {
  API: 'API',
  DATABASE: 'Banco de Dados',
  AUTHENTICATION: 'Autenticação',
  BACKGROUND_JOB: 'Tarefa em Segundo Plano',
  INTEGRATION: 'Integração'
};

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  DEBUG: 'bg-gray-500',
  INFO: 'bg-blue-500',
  WARNING: 'bg-yellow-500',
  ERROR: 'bg-red-500',
  CRITICAL: 'bg-red-700'
}; 