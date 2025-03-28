import { supabase } from '@/lib/supabase'
import { CreateProposalData, Proposal, ProposalFilters, ProposalResponse, UpdateProposalData } from '@/types/proposal'

export const proposalService = {
  async createProposal(data: CreateProposalData) {
    const { error } = await supabase
      .from('proposals')
      .insert(data)

    if (error) throw error
  },

  async updateProposal(id: string, data: UpdateProposalData) {
    const { error } = await supabase
      .from('proposals')
      .update(data)
      .eq('id', id)

    if (error) throw error
  },

  async deleteProposal(id: string) {
    const { error } = await supabase
      .from('proposals')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async getProposal(id: string): Promise<Proposal> {
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        *,
        client:clients (
          id,
          name,
          document,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async listProposals(filters: ProposalFilters): Promise<ProposalResponse> {
    let query = supabase
      .from('proposals')
      .select(`
        *,
        client:clients (
          id,
          name,
          document,
          email
        )
      `, { count: 'exact' })

    if (filters.search) {
      query = query.or(`number.ilike.%${filters.search}%`)
    }

    if (filters.client_id) {
      query = query.eq('client_id', filters.client_id)
    }

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    const { from, to } = getPagination(filters.page, filters.limit)
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      proposals: data || [],
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