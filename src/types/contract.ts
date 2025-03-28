import { Client } from './client'

export type ContractStatus = 'DRAFT' | 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED'

export type ContractType = 'FIXED' | 'HOURLY' | 'PROJECT'

export interface ContractDetails {
  scope?: string
  terms?: string
  conditions?: string
  deliverables?: string[]
  milestones?: {
    description: string
    dueDate: string
    completed: boolean
  }[]
  attachments?: {
    name: string
    url: string
  }[]
}

export interface Contract {
  id: string
  title: string
  type: ContractType
  client: Client
  startDate: string
  endDate: string
  value: number
  status: ContractStatus
  details: ContractDetails
  createdAt: string
  updatedAt: string
}

export interface CreateContractData {
  title: string
  type: ContractType
  clientId: string
  startDate: string
  endDate: string
  value: number
  details: ContractDetails
}

export interface UpdateContractData {
  title?: string
  type?: ContractType
  startDate?: string
  endDate?: string
  value?: number
  status?: ContractStatus
  details?: ContractDetails
}

export interface ContractFilters {
  type?: ContractType
  status?: ContractStatus
  clientId?: string
  search?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

export interface UseContractsReturn {
  contracts: Contract[]
  total: number
  isLoading: boolean
  error: Error | null
  createContract: (data: CreateContractData) => Promise<void>
  updateContract: (id: string, data: UpdateContractData) => Promise<void>
  deleteContract: (id: string) => Promise<void>
}

export interface UseContractReturn {
  contract: Contract | null
  isLoading: boolean
  error: Error | null
  updateContract: (data: UpdateContractData) => Promise<void>
  deleteContract: () => Promise<void>
}

export interface ContractResponse {
  contracts: Contract[]
  total: number
  page: number
  limit: number
}

export const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  FIXED: 'Valor Fixo',
  HOURLY: 'Por Hora',
  PROJECT: 'Por Projeto'
}

export const CONTRACT_STATUS_LABELS: Record<ContractStatus, string> = {
  DRAFT: 'Rascunho',
  PENDING: 'Pendente',
  ACTIVE: 'Ativo',
  EXPIRED: 'Expirado',
  CANCELLED: 'Cancelado'
} 