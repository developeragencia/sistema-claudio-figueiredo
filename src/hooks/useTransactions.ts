import { useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transactionService';
import { Transaction } from '@/types/transaction';

interface UseTransactionsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  type?: string;
  clientId?: string;
}

export function useTransactions({
  page,
  limit,
  search,
  status,
  type,
  clientId,
}: UseTransactionsParams) {
  return useQuery({
    queryKey: ['transactions', { page, limit, search, status, type, clientId }],
    queryFn: () => transactionService.getTransactions({ page, limit, search, status, type, clientId }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useTransaction(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => transactionService.getTransactionById(id),
    initialData: () => {
      // Tenta encontrar a transação no cache da lista
      const queries = queryClient.getQueriesData<{ data: Transaction[] }>(['transactions']);
      const transaction = queries
        .flatMap(([, data]) => data?.data || [])
        .find(t => t.id === id);
      
      return transaction;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useTransactionReport(id: string) {
  return useQuery({
    queryKey: ['transaction-report', id],
    queryFn: () => transactionService.downloadReport(id),
    enabled: false, // Não busca automaticamente
  });
} 