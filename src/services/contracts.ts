import { supabase } from '@/lib/supabase'
import { Contract, ContractFilters, ContractResponse, CreateContractData, UpdateContractData } from '@/types/contract'

export const contractService = {
  async createContract(data: CreateContractData) {
    const { error } = await supabase
      .from('contracts')
      .insert(data)

    if (error) throw error
  },

  async updateContract(id: string, data: UpdateContractData) {
    const { error } = await supabase
      .from('contracts')
      .update(data)
      .eq('id', id)

    if (error) throw error
  },

  async getContract(id: string): Promise<Contract> {
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        proposal:proposals (
          id,
          number,
          type,
          value,
          description,
          client:clients (
            id,
            name,
            document,
            email
          )
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async listContracts(filters: ContractFilters): Promise<ContractResponse> {
    let query = supabase
      .from('contracts')
      .select(`
        *,
        proposal:proposals (
          id,
          number,
          type,
          value,
          description,
          client:clients (
            id,
            name,
            document,
            email
          )
        )
      `, { count: 'exact' })

    if (filters.search) {
      query = query.or(`number.ilike.%${filters.search}%`)
    }

    if (filters.proposal_id) {
      query = query.eq('proposal_id', filters.proposal_id)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    const { from, to } = getPagination(filters.page, filters.limit)
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      contracts: data || [],
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