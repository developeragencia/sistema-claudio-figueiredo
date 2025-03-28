import api from '@/lib/api';
import { supabase } from '@/lib/supabase';
import type { 
  Proposal, 
  ProposalFilters, 
  ProposalStatus, 
  ProposalResponse,
  ProposalTimeline,
  ProposalEvent,
  Contract
} from '@/types/proposal';
import { logger } from '@/lib/logger';

export interface CreateProposalData {
  title: string;
  description: string;
  client: {
    id: string;
    name: string;
    cnpj: string;
  };
  totalValue: number;
  validUntil: string;
  details: {
    estimatedValue: number;
    description: string;
    periodStart: string;
    periodEnd: string;
    additionalNotes?: string;
  };
  salesRepId?: string;
}

export interface UpdateProposalData {
  title?: string;
  description?: string;
  totalValue?: number;
  validUntil?: string;
  details?: {
    estimatedValue?: number;
    description?: string;
    periodStart?: string;
    periodEnd?: string;
    additionalNotes?: string;
  };
  salesRepId?: string;
}

interface GetProposalsParams extends ProposalFilters {
  page?: number;
  limit?: number;
}

interface ProposalsResponse {
  proposals: Proposal[];
  total: number;
  page: number;
  totalPages: number;
}

class ProposalService {
  async getProposals(params?: GetProposalsParams): Promise<ProposalsResponse> {
    try {
      const { data } = await api.get<ProposalsResponse>('/proposals', { params });
      return data;
    } catch (error) {
      console.error('Erro ao buscar propostas:', error);
      throw error;
    }
  }

  async getProposal(id: string): Promise<Proposal> {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*, timeline(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Proposta não encontrada');

      return this.mapProposalFromDB(data);
    } catch (error) {
      logger.error('Erro ao buscar proposta:', error);
      throw error;
    }
  }

  async createProposal(data: CreateProposalData): Promise<Proposal> {
    try {
      const { data: proposal, error } = await supabase
        .from('proposals')
        .insert([{
          title: data.title,
          description: data.description,
          client: data.client,
          total_value: data.totalValue,
          valid_until: data.validUntil,
          status: 'DRAFT',
          details: data.details,
          sales_rep_id: data.salesRepId,
          timeline: [{
            id: crypto.randomUUID(),
            status: 'DRAFT',
            updatedAt: new Date().toISOString(),
            updatedBy: data.salesRepId || 'system',
            comments: 'Proposta criada'
          }],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      if (!proposal) throw new Error('Erro ao criar proposta');

      return this.mapProposalFromDB(proposal);
    } catch (error) {
      logger.error('Erro ao criar proposta:', error);
      throw error;
    }
  }

  async updateProposal(id: string, data: UpdateProposalData): Promise<Proposal> {
    try {
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      if (data.title) updateData.title = data.title;
      if (data.description) updateData.description = data.description;
      if (data.totalValue) updateData.total_value = data.totalValue;
      if (data.validUntil) updateData.valid_until = data.validUntil;
      if (data.details) updateData.details = { ...data.details };

      const { data: proposal, error } = await supabase
        .from('proposals')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!proposal) throw new Error('Proposta não encontrada');

      return this.mapProposalFromDB(proposal);
    } catch (error) {
      logger.error('Erro ao atualizar proposta:', error);
      throw error;
    }
  }

  async updateStatus(id: string, data: UpdateProposalStatusData): Promise<Proposal> {
    try {
      const proposal = await this.getProposal(id);
      const timeline = [...proposal.timeline, {
        id: crypto.randomUUID(),
        status: data.status,
        comments: data.comments,
        updatedAt: new Date().toISOString(),
        updatedBy: (await supabase.auth.getUser()).data.user?.id || 'system'
      }];

      const { data: updatedProposal, error } = await supabase
        .from('proposals')
        .update({
          status: data.status,
          timeline,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!updatedProposal) throw new Error('Proposta não encontrada');

      return this.mapProposalFromDB(updatedProposal);
    } catch (error) {
      logger.error('Erro ao atualizar status da proposta:', error);
      throw error;
    }
  }

  async deleteProposal(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      logger.error('Erro ao excluir proposta:', error);
      throw error;
    }
  }

  async convertToContract(id: string, contractData: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contract> {
    try {
      const { data: contract, error: contractError } = await supabase
        .from('contracts')
        .insert([{
          ...contractData,
          proposal_id: id,
          status: 'ACTIVE',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (contractError) throw contractError;
      if (!contract) throw new Error('Erro ao criar contrato');

      await this.updateStatus(id, {
        status: 'CONVERTED',
        comments: `Convertida em contrato ${contract.id}`
      });

      return contract;
    } catch (error) {
      logger.error('Erro ao converter proposta em contrato:', error);
      throw error;
    }
  }

  async downloadAttachment(proposalId: string, attachmentId: string): Promise<Blob> {
    try {
      const { data } = await api.get<Blob>(
        `/proposals/${proposalId}/attachments/${attachmentId}`,
        { responseType: 'blob' }
      );
      return data;
    } catch (error) {
      console.error('Erro ao baixar anexo:', error);
      throw error;
    }
  }

  async listProposals(params: ProposalFilters = {}): Promise<ProposalResponse> {
    try {
      let query = supabase
        .from('proposals')
        .select('*, timeline(*)', { count: 'exact' });

      if (params.status?.length) {
        query = query.in('status', params.status);
      }
      if (params.clientId) {
        query = query.eq('client_id', params.clientId);
      }
      if (params.salesRepId) {
        query = query.eq('sales_rep_id', params.salesRepId);
      }
      if (params.search) {
        query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`);
      }

      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;

      query = query
        .range(start, start + limit - 1)
        .order('created_at', { ascending: false });

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        proposals: data?.map(this.mapProposalFromDB) || [],
        total: count || 0,
        page,
        limit
      };
    } catch (error) {
      logger.error('Erro ao buscar propostas:', error);
      throw error;
    }
  }

  private mapProposalFromDB(data: any): Proposal {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      client: data.client,
      totalValue: data.total_value,
      validUntil: data.valid_until,
      status: data.status,
      details: data.details || {
        estimatedValue: 0,
        description: '',
        periodStart: '',
        periodEnd: '',
        additionalNotes: ''
      },
      timeline: data.timeline?.map((entry: any) => ({
        id: entry.id,
        status: entry.status,
        comments: entry.comments,
        updatedAt: entry.updated_at,
        updatedBy: entry.updated_by
      })) || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      salesRepId: data.sales_rep_id
    };
  }
}

export const proposalService = new ProposalService();
