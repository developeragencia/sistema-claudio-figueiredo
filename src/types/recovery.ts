
export interface RecoveryProcess {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  creditType: string;
  processType: string;
  originalAmount: number;
  recoveredAmount: number;
  recoveryPercent: number;
  startDate: string;
  currentStatus: string;
  status: 'INICIAL' | 'EM_ANDAMENTO' | 'PARCIAL' | 'CONCLUIDO';
  responsiblePerson: string;
  processNumber: string;
  completionDate?: string;
}

export interface RecoverySummary {
  totalProcesses: number;
  completedProcesses: number;
  inProgressProcesses: number;
  successRate: number;
  // Adding these properties that are being accessed in components
  totalCredits: number;
  recoveredAmount: number;
  avgRecoveryRate: number;
}
