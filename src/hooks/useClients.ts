import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { logger } from '@/lib/logger';
import { toast } from 'sonner';

export interface Client {
  id: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface ClientResponse {
  items: Client[];
  total: number;
  page: number;
  limit: number;
}

export interface ClientFilters {
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  page?: number;
  limit?: number;
}

export interface CreateClientData {
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface UpdateClientData extends Partial<CreateClientData> {
  id: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

interface UseClientsProps extends ClientFilters {}

interface UseClientsReturn {
  clients: ClientResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  createClient: (data: CreateClientData) => Promise<void>;
  updateClient: (data: UpdateClientData) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function useClients(props: UseClientsProps = {}): UseClientsReturn {
  const queryClient = useQueryClient();

  const {
    data: clients,
    isLoading,
    error
  } = useQuery<ClientResponse, Error>({
    queryKey: ['clients', props],
    queryFn: async () => {
      try {
        let query = supabase
          .from('clients')
          .select('*')
          .order('razao_social', { ascending: true });

        if (props.search) {
          query = query.or(`razao_social.ilike.%${props.search}%,cnpj.ilike.%${props.search}%`);
        }

        if (props.status) {
          query = query.eq('status', props.status);
        }

        const { data, error } = await query
          .range(((props.page || 1) - 1) * (props.limit || 10), (props.page || 1) * (props.limit || 10) - 1);

        if (error) throw error;

        const { count } = await query.count();

        return {
          items: data.map((item) => ({
            id: item.id,
            razaoSocial: item.razao_social,
            cnpj: item.cnpj,
            email: item.email,
            telefone: item.telefone,
            endereco: item.endereco,
            cidade: item.cidade,
            estado: item.estado,
            cep: item.cep,
            status: item.status,
            createdAt: item.created_at,
            updatedAt: item.updated_at
          })),
          total: count,
          page: props.page || 1,
          limit: props.limit || 10
        };
      } catch (error) {
        logger.error('Error fetching clients:', error);
        throw new Error('Não foi possível carregar os clientes');
      }
    }
  });

  const createClient = useMutation({
    mutationFn: async (data: CreateClientData) => {
      try {
        const { error } = await supabase.from('clients').insert({
          razao_social: data.razaoSocial,
          cnpj: data.cnpj,
          email: data.email,
          telefone: data.telefone,
          endereco: data.endereco,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
          status: 'ACTIVE'
        });

        if (error) throw error;
      } catch (error) {
        logger.error('Error creating client:', error);
        throw new Error('Não foi possível criar o cliente');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente criado com sucesso');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const updateClient = useMutation({
    mutationFn: async (data: UpdateClientData) => {
      try {
        const { error } = await supabase
          .from('clients')
          .update({
            ...(data.razaoSocial && { razao_social: data.razaoSocial }),
            ...(data.cnpj && { cnpj: data.cnpj }),
            ...(data.email && { email: data.email }),
            ...(data.telefone && { telefone: data.telefone }),
            ...(data.endereco && { endereco: data.endereco }),
            ...(data.cidade && { cidade: data.cidade }),
            ...(data.estado && { estado: data.estado }),
            ...(data.cep && { cep: data.cep }),
            ...(data.status && { status: data.status })
          })
          .eq('id', data.id);

        if (error) throw error;
      } catch (error) {
        logger.error('Error updating client:', error);
        throw new Error('Não foi possível atualizar o cliente');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente atualizado com sucesso');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        logger.error('Error deleting client:', error);
        throw new Error('Não foi possível excluir o cliente');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente excluído com sucesso');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return {
    clients,
    isLoading,
    error,
    createClient: createClient.mutateAsync,
    updateClient: updateClient.mutateAsync,
    deleteClient: deleteClient.mutateAsync,
    isCreating: createClient.isPending,
    isUpdating: updateClient.isPending,
    isDeleting: deleteClient.isPending
  };
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => clientService.getClientById(id),
    enabled: !!id,
  });
}

export function useAssignUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: string; data: Parameters<typeof clientService.assignUser>[1] }) =>
      clientService.assignUser(clientId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.setQueryData(['clients', data.id], data);
      toast({
        title: 'Usuário atribuído',
        description: 'O usuário foi atribuído ao cliente com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atribuir usuário',
        description: error.message || 'Ocorreu um erro ao atribuir o usuário ao cliente.',
      });
    },
  });
}

export function useUnassignUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ clientId, userId }: { clientId: string; userId: string }) =>
      clientService.unassignUser(clientId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.setQueryData(['clients', data.id], data);
      toast({
        title: 'Usuário removido',
        description: 'O usuário foi removido do cliente com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao remover usuário',
        description: error.message || 'Ocorreu um erro ao remover o usuário do cliente.',
      });
    },
  });
}

export function useValidateCNPJ() {
  return useMutation({
    mutationFn: clientService.validateCNPJ,
  });
}

export function useImportClients() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: clientService.importClients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Clientes importados',
        description: 'Os clientes foram importados com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao importar clientes',
        description: error.message || 'Ocorreu um erro ao importar os clientes.',
      });
    },
  });
}

export function useExportClients() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: clientService.exportClients,
    onSuccess: (data) => {
      // Cria um link para download do arquivo
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clients.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Clientes exportados',
        description: 'Os clientes foram exportados com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao exportar clientes',
        description: error.message || 'Ocorreu um erro ao exportar os clientes.',
      });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente excluído com sucesso');
    },
    onError: (error) => {
      console.error('Error deleting client:', error);
      toast.error('Erro ao excluir cliente');
    }
  });
} 