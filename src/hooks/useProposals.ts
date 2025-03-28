import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { proposalService } from '@/services/proposalService';
import { logger } from '@/lib/logger';
import { toast } from 'sonner';
import type {
  ProposalResponse,
  ProposalFilters,
  CreateProposalData,
  UpdateProposalData,
  UpdateProposalStatusData,
  Proposal,
  ProposalStatus,
  UseProposalsReturn
} from '@/types/proposal';

export interface UseProposalsProps extends ProposalFilters {}

export function useProposals(filters: ProposalFilters = {}): UseProposalsReturn {
  const queryClient = useQueryClient();

  const {
    data: proposalsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['proposals', filters],
    queryFn: () => proposalService.listProposals(filters)
  });

  const createProposalMutation = useMutation({
    mutationFn: (data: CreateProposalData) => proposalService.createProposal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta criada com sucesso');
    },
    onError: (error) => {
      console.error('Error creating proposal:', error);
      toast.error('Erro ao criar proposta. Tente novamente.');
    }
  });

  const updateProposalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProposalData }) => 
      proposalService.updateProposal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta atualizada com sucesso');
    },
    onError: (error) => {
      console.error('Error updating proposal:', error);
      toast.error('Erro ao atualizar proposta. Tente novamente.');
    }
  });

  const deleteProposalMutation = useMutation({
    mutationFn: (id: string) => proposalService.deleteProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta excluída com sucesso');
    },
    onError: (error) => {
      console.error('Error deleting proposal:', error);
      toast.error('Erro ao excluir proposta. Tente novamente.');
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProposalStatusData }) =>
      proposalService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Status da proposta atualizado com sucesso');
    },
    onError: (error) => {
      console.error('Error updating proposal status:', error);
      toast.error('Erro ao atualizar status da proposta. Tente novamente.');
    }
  });

  return {
    proposals: proposalsData?.proposals || [],
    isLoading,
    error,
    total: proposalsData?.total || 0,
    page: proposalsData?.page || 1,
    limit: proposalsData?.limit || 10,
    createProposal: createProposalMutation.mutateAsync,
    updateProposal: updateProposalMutation.mutateAsync,
    deleteProposal: deleteProposalMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync
  };
}

export function useProposal(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['proposal', id],
    queryFn: () => proposalService.getProposal(id),
    enabled: !!id
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateProposalData) => {
      const { error } = await supabase.from('proposals').insert({
        client_id: data.client.id,
        title: data.title,
        description: data.description,
        total_value: data.totalValue,
        valid_until: data.validUntil.toISOString(),
        service_description: data.details.serviceDescription,
        period_start: data.details.periodStart?.toISOString(),
        period_end: data.details.periodEnd?.toISOString(),
        additional_notes: data.details.additionalNotes,
        status: 'DRAFT',
        timeline: [{
          id: crypto.randomUUID(),
          status: 'DRAFT',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system',
          comments: 'Proposta criada',
        }],
      });

      if (error) {
        logger.error('Erro ao criar proposta', { error });
        throw new Error('Erro ao criar proposta');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta criada com sucesso');
    },
    onError: (error) => {
      toast.error('Erro ao criar proposta', {
        description: 'Ocorreu um erro ao criar a proposta. Tente novamente.',
      });
    },
  });
}

export function useUpdateProposal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateProposalData) => {
      const { error } = await supabase
        .from('proposals')
        .update({
          title: data.title,
          description: data.description,
          total_value: data.totalValue,
          valid_until: data.validUntil?.toISOString(),
          service_description: data.details?.serviceDescription,
          period_start: data.details?.periodStart?.toISOString(),
          period_end: data.details?.periodEnd?.toISOString(),
          additional_notes: data.details?.additionalNotes,
        })
        .eq('id', data.id);

      if (error) {
        logger.error('Erro ao atualizar proposta', { error });
        throw new Error('Erro ao atualizar proposta');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', data.id] });
      toast.success('Proposta atualizada com sucesso');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar proposta', {
        description: 'Ocorreu um erro ao atualizar a proposta. Tente novamente.',
      });
    },
  });
}

export function useUpdateProposalStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateProposalStatusData) => {
      const timelineEntry = {
        id: crypto.randomUUID(),
        status: data.status,
        updatedAt: new Date().toISOString(),
        updatedBy: 'system',
        comments: data.comments,
      };

      const { error } = await supabase
        .from('proposals')
        .update({
          status: data.status,
          timeline: supabase.raw('timeline || ?::jsonb', [JSON.stringify([timelineEntry])]),
        })
        .eq('id', data.id);

      if (error) {
        logger.error('Erro ao atualizar status da proposta', { error });
        throw new Error('Erro ao atualizar status da proposta');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', data.id] });
      toast.success('Status atualizado com sucesso');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar status', {
        description: 'Ocorreu um erro ao atualizar o status da proposta. Tente novamente.',
      });
    },
  });
}

export function useDeleteProposal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Erro ao excluir proposta', { error });
        throw new Error('Erro ao excluir proposta');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
  });
}

export function useConvertToContract() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Proposal) => {
      const { error } = await supabase
        .from('proposals')
        .update({
          status: 'CONTRACT',
        })
        .eq('id', data.id);

      if (error) {
        logger.error('Erro ao converter proposta', { error });
        throw new Error('Erro ao converter proposta');
      }

      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', data.id] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Proposta convertida em contrato');
    },
    onError: (error) => {
      toast.error('Erro ao converter proposta', {
        description: 'Ocorreu um erro ao converter a proposta em contrato. Tente novamente.',
      });
    },
  });
}

export function useDownloadAttachment() {
  const downloadAttachment = async (params: { proposalId: string; attachmentId: string }) => {
    return supabase.storage.from('attachments').download(params.attachmentId);
  };
  
  return useMutation({
    mutationFn: downloadAttachment,
    onSuccess: (data) => {
      // Cria um URL para o blob e força o download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attachment`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error('Erro ao baixar anexo', {
        description: 'Ocorreu um erro ao baixar o anexo. Tente novamente.',
      });
    },
  });
}
