import api from '@/lib/api';
import { Transaction } from '@/types/transaction';

interface GetTransactionsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  type?: string;
  clientId?: string;
}

interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

export const transactionService = {
  async getTransactions({
    page = 1,
    limit = 10,
    search = '',
    status = '',
    type = '',
    clientId = '',
  }: GetTransactionsParams): Promise<TransactionsResponse> {
    try {
      const response = await api.get<TransactionsResponse>('/transactions', {
        params: {
          page,
          limit,
          search,
          status: status !== 'all' ? status : '',
          type: type !== 'all' ? type : '',
          clientId,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  },

  async getTransactionById(id: string): Promise<Transaction> {
    try {
      const response = await api.get<Transaction>(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transação:', error);
      throw error;
    }
  },

  async downloadReport(id: string): Promise<Blob> {
    try {
      const response = await api.get(`/transactions/${id}/report`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
      throw error;
    }
  },
}; 