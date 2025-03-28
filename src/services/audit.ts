import { supabase } from '@/lib/supabase'
import { AuditLog, AuditLogFilters, AuditLogResponse } from '@/types/audit'

export const auditService = {
  async createAuditLog(userId: string, action: string, entity: string, entityId: string, details: any) {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        entity,
        entity_id: entityId,
        details
      })

    if (error) throw error
  },

  async listAuditLogs(filters: AuditLogFilters): Promise<AuditLogResponse> {
    let query = supabase
      .from('audit_logs')
      .select(`
        *,
        user:users (
          id,
          name,
          email
        )
      `, { count: 'exact' })

    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id)
    }

    if (filters.action) {
      query = query.eq('action', filters.action)
    }

    if (filters.entity) {
      query = query.eq('entity', filters.entity)
    }

    if (filters.entity_id) {
      query = query.eq('entity_id', filters.entity_id)
    }

    if (filters.start_date) {
      query = query.gte('created_at', filters.start_date)
    }

    if (filters.end_date) {
      query = query.lte('created_at', filters.end_date)
    }

    const { from, to } = getPagination(filters.page, filters.limit)
    query = query.range(from, to)
    query = query.order('created_at', { ascending: false })

    const { data, error, count } = await query

    if (error) throw error

    return {
      logs: data || [],
      total: count || 0,
      page: filters.page || 1,
      limit: filters.limit || 10
    }
  }
}

function getPagination(page = 1, limit = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1
  return { from, to }
} 