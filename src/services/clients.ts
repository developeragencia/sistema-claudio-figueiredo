import { supabase } from '@/lib/supabase'
import { Client, ClientFilters, ClientResponse, CreateClientData, UpdateClientData } from '@/types/client'

export const clientService = {
  async createClient(data: CreateClientData) {
    const { error } = await supabase
      .from('clients')
      .insert(data)

    if (error) throw error
  },

  async updateClient(id: string, data: UpdateClientData) {
    const { error } = await supabase
      .from('clients')
      .update(data)
      .eq('id', id)

    if (error) throw error
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clients')
      .update({ status: 'inactive' })
      .eq('id', id)

    if (error) throw error
  },

  async getClient(id: string): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async listClients(filters: ClientFilters): Promise<ClientResponse> {
    let query = supabase
      .from('clients')
      .select('*', { count: 'exact' })

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,document.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    const { from, to } = getPagination(filters.page, filters.limit)
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      clients: data || [],
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