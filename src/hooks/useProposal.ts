import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { logger } from '@/lib/logger';
import type { Proposal, ProposalStatus } from '@/types/proposal';

interface UseProposalReturn {
  proposal: Proposal | null;
  isLoading: boolean;
  error: Error | null;
  updateStatus: (id: string, status: ProposalStatus, comment?: string) => Promise<void>;
}

export function useProposal(id: string): UseProposalReturn {
  const queryClient = useQueryClient();

  const { data: proposal, isLoading, error } = useQuery<Proposal, Error>({
    queryKey: ['proposal', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('proposals')
          .select(`
            *,
            client:clients(id, name, email, phone, cnpj, address),
            timeline:proposal_timeline(
              id,
              status,
              comment,
              user:users(id, name, email),
              created_at
            )
          `)
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        return {
          id: data.id,
          title: data.title,
          client: data.client,
          status: data.status,
          description: data.description,
          totalValue: data.total_value,
          validUntil: data.valid_until,
          details: {
            description: data.description,
            totalValue: data.total_value,
            validUntil: data.valid_until,
            services: data.services || [],
            notes: data.notes
          },
          timeline: data.timeline.map((event: any) => ({
            id: event.id,
            status: event.status,
            comment: event.comment,
            user: event.user,
            createdAt: event.created_at
          })),
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
      } catch (error) {
        logger.error('Error fetching proposal:', error);
        throw error;
      }
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, comment }: { id: string; status: ProposalStatus; comment?: string }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('Usuário não autenticado');
      }

      const { error: proposalError } = await supabase
        .from('proposals')
        .update({ status })
        .eq('id', id);

      if (proposalError) {
        logger.error('Error updating proposal status:', proposalError);
        throw proposalError;
      }

      const { error: timelineError } = await supabase
        .from('proposal_timeline')
        .insert({
          proposal_id: id,
          status,
          comment,
          user_id: user.data.user.id
        });

      if (timelineError) {
        logger.error('Error creating timeline event:', timelineError);
        throw timelineError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposal', id] });
      toast.success('Status da proposta atualizado com sucesso');
    },
    onError: (error) => {
      logger.error('Error updating proposal status:', error);
      toast.error('Erro ao atualizar status da proposta');
    }
  });

  return {
    proposal,
    isLoading,
    error,
    updateStatus: (id: string, status: ProposalStatus, comment?: string) =>
      updateStatus.mutateAsync({ id, status, comment })
  };
} 