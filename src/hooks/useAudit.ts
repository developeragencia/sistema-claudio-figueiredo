import { useQuery } from '@tanstack/react-query'
import { auditService } from '@/services/audit'
import { AuditLogFilters } from '@/types/audit'

export function useAuditLogs(filters: AuditLogFilters = {}) {
  return useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: () => auditService.listAuditLogs(filters)
  })
}

export function useCreateAuditLog() {
  return auditService.createAuditLog
} 