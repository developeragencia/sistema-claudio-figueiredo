import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Tipos para as tabelas do Supabase
export interface Client {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  client_name: string;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface UseAdminDataOptions {
  tab: string;
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

interface QueryResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function useAdminData<T extends Client | Proposal>({ 
  tab, 
  filters = {}, 
  page = 1, 
  limit = 10 
}: UseAdminDataOptions): ReturnType<typeof useQuery<QueryResult<T>, Error>> {
  return useQuery({
    queryKey: ['admin', tab, filters, page, limit],
    queryFn: async () => {
      let query = supabase
        .from(tab)
        .select('*', { count: 'exact' });

      // Aplicar filtros
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query = query.eq(key, value);
        }
      });

      // Paginação
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return {
        data: data as T[],
        total: count || 0,
        currentPage: page,
        totalPages: Math.ceil((count || 0) / limit),
      };
    },
    staleTime: 30 * 1000, // 30 segundos
  });
} 