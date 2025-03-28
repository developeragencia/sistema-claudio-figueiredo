
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { creditAnalysisService } from '@/services/creditAnalysisService';
import { toast } from 'sonner';
import { CreditAnalysis } from '@/types/proposal';

interface UseCreditAnalysisFilters {
  clientId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

interface UploadTransactionFileParams {
  analysisId: string;
  file: File;
}

interface ApproveRejectTransactionParams {
  analysisId: string;
  transactionId: string;
  reason?: string;
}

interface DownloadAttachmentParams {
  analysisId: string;
  transactionId: string;
  attachmentId: string;
}

export function useCreditAnalyses(filters?: UseCreditAnalysisFilters) {
  return useQuery({
    queryKey: ['credit-analyses', filters],
    queryFn: () => creditAnalysisService.getCreditAnalyses(filters),
    enabled: filters?.enabled !== false,
  });
}

export function useCreditAnalysis(id: string) {
  return useQuery({
    queryKey: ['credit-analysis', id],
    queryFn: () => creditAnalysisService.getCreditAnalysisById(id),
    enabled: !!id,
  });
}

export function useStartCreditAnalysis() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: creditAnalysisService.startAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-analyses'] });
      toast.success('Análise de crédito iniciada', {
        description: 'A análise de crédito foi iniciada com sucesso.',
      });
    },
    onError: () => {
      toast.error('Erro ao iniciar análise', {
        description: 'Ocorreu um erro ao iniciar a análise de crédito. Tente novamente.',
      });
    },
  });
}

export function useCancelCreditAnalysis() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: creditAnalysisService.cancelAnalysis,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analyses'] });
      queryClient.removeQueries({ queryKey: ['credit-analysis', id] });
      toast.success('Análise de crédito cancelada', {
        description: 'A análise de crédito foi cancelada com sucesso.',
      });
    },
    onError: () => {
      toast.error('Erro ao cancelar análise', {
        description: 'Ocorreu um erro ao cancelar a análise de crédito. Tente novamente.',
      });
    },
  });
}

export function useUploadTransactionFile() {
  const queryClient = useQueryClient();
  
  const uploadFile = async (params: UploadTransactionFileParams) => {
    return creditAnalysisService.uploadTransactionFile(params.analysisId, params.file);
  };
  
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analyses'] });
      queryClient.invalidateQueries({ queryKey: ['credit-analysis', data.id] });
      toast.success('Arquivo enviado', {
        description: 'O arquivo de transações foi enviado com sucesso.',
      });
    },
    onError: () => {
      toast.error('Erro ao enviar arquivo', {
        description: 'Ocorreu um erro ao enviar o arquivo de transações. Tente novamente.',
      });
    },
  });
}

export function useApproveTransaction() {
  const queryClient = useQueryClient();
  
  const approveTransaction = async (params: ApproveRejectTransactionParams) => {
    return creditAnalysisService.approveTransaction(params.analysisId, params.transactionId);
  };
  
  return useMutation({
    mutationFn: approveTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analysis', data.id] });
      toast.success('Transação aprovada', {
        description: 'A transação foi aprovada com sucesso.',
      });
    },
    onError: () => {
      toast.error('Erro ao aprovar transação', {
        description: 'Ocorreu um erro ao aprovar a transação. Tente novamente.',
      });
    },
  });
}

export function useRejectTransaction() {
  const queryClient = useQueryClient();
  
  const rejectTransaction = async (params: ApproveRejectTransactionParams) => {
    if (!params.reason) {
      throw new Error('É necessário informar um motivo para rejeitar a transação.');
    }
    return creditAnalysisService.rejectTransaction(
      params.analysisId,
      params.transactionId,
      params.reason
    );
  };
  
  return useMutation({
    mutationFn: rejectTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analysis', data.id] });
      toast.success('Transação rejeitada', {
        description: 'A transação foi rejeitada com sucesso.',
      });
    },
    onError: (error) => {
      toast.error('Erro ao rejeitar transação', {
        description: error instanceof Error 
          ? error.message 
          : 'Ocorreu um erro ao rejeitar a transação. Tente novamente.',
      });
    },
  });
}

export function useDownloadReport() {
  return useMutation({
    mutationFn: creditAnalysisService.downloadReport,
    onSuccess: (data) => {
      // Create a URL for the blob and force download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'credit-analysis-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error('Erro ao baixar relatório', {
        description: 'Ocorreu um erro ao baixar o relatório. Tente novamente.',
      });
    },
  });
}

export function useDownloadTransactionAttachment() {
  const downloadAttachment = async (params: DownloadAttachmentParams) => {
    return creditAnalysisService.downloadTransactionAttachment(
      params.analysisId,
      params.transactionId,
      params.attachmentId
    );
  };
  
  return useMutation({
    mutationFn: downloadAttachment,
    onSuccess: (data) => {
      // Create a URL for the blob and force download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transaction-attachment');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error('Erro ao baixar anexo', {
        description: 'Ocorreu um erro ao baixar o anexo da transação. Tente novamente.',
      });
    },
  });
}
