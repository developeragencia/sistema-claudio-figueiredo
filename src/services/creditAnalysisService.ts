
import api from '@/lib/api';
import { CreditAnalysis } from '@/types/proposal';

interface GetCreditAnalysisParams {
  clientId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  page?: number;
  limit?: number;
}

interface CreditAnalysisResponse {
  data: CreditAnalysis[];
  total: number;
  page: number;
  totalPages: number;
}

interface StartAnalysisParams {
  clientId: string;
  startDate: string;
  endDate: string;
}

export const creditAnalysisService = {
  async getCreditAnalyses(params?: GetCreditAnalysisParams): Promise<CreditAnalysisResponse> {
    try {
      const { data } = await api.get<CreditAnalysisResponse>('/credit-analyses', { params });
      return data;
    } catch (error) {
      console.error('Erro ao buscar análises de crédito:', error);
      throw error;
    }
  },

  async getCreditAnalysisById(id: string): Promise<CreditAnalysis> {
    try {
      const { data } = await api.get<CreditAnalysis>(`/credit-analyses/${id}`);
      return data;
    } catch (error) {
      console.error('Erro ao buscar análise de crédito:', error);
      throw error;
    }
  },

  async startAnalysis(params: StartAnalysisParams): Promise<CreditAnalysis> {
    try {
      const { data } = await api.post<CreditAnalysis>('/credit-analyses', params);
      return data;
    } catch (error) {
      console.error('Erro ao iniciar análise de crédito:', error);
      throw error;
    }
  },

  async cancelAnalysis(id: string): Promise<void> {
    try {
      await api.delete(`/credit-analyses/${id}`);
    } catch (error) {
      console.error('Erro ao cancelar análise de crédito:', error);
      throw error;
    }
  },

  async uploadTransactionFile(analysisId: string, file: File): Promise<CreditAnalysis> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post<CreditAnalysis>(
        `/credit-analyses/${analysisId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return data;
    } catch (error) {
      console.error('Erro ao fazer upload de arquivo de transações:', error);
      throw error;
    }
  },

  async approveTransaction(analysisId: string, transactionId: string): Promise<CreditAnalysis> {
    try {
      const { data } = await api.post<CreditAnalysis>(
        `/credit-analyses/${analysisId}/transactions/${transactionId}/approve`
      );
      return data;
    } catch (error) {
      console.error('Erro ao aprovar transação:', error);
      throw error;
    }
  },

  async rejectTransaction(
    analysisId: string,
    transactionId: string,
    reason: string
  ): Promise<CreditAnalysis> {
    try {
      const { data } = await api.post<CreditAnalysis>(
        `/credit-analyses/${analysisId}/transactions/${transactionId}/reject`,
        { reason }
      );
      return data;
    } catch (error) {
      console.error('Erro ao rejeitar transação:', error);
      throw error;
    }
  },

  async downloadReport(analysisId: string): Promise<Blob> {
    try {
      const { data } = await api.get<Blob>(`/credit-analyses/${analysisId}/report`, {
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
      throw error;
    }
  },

  async downloadTransactionAttachment(
    analysisId: string,
    transactionId: string,
    attachmentId: string
  ): Promise<Blob> {
    try {
      const { data } = await api.get<Blob>(
        `/credit-analyses/${analysisId}/transactions/${transactionId}/attachments/${attachmentId}`,
        { responseType: 'blob' }
      );
      return data;
    } catch (error) {
      console.error('Erro ao baixar anexo de transação:', error);
      throw error;
    }
  },
};
