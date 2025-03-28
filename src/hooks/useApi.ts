import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Hook para usuários
export function useUsers() {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/users');
      return response.data;
    },
  });

  const createUser = useMutation({
    mutationFn: async (userData: Omit<typeof users[0], 'id'>) => {
      const response = await api.post('/users', userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário criado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar usuário');
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({
      id,
      ...data
    }: Partial<typeof users[0]> & { id: number }) => {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar usuário');
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir usuário');
    },
  });

  return {
    users,
    isLoading,
    createUser: createUser.mutate,
    updateUser: updateUser.mutate,
    deleteUser: deleteUser.mutate,
  };
}

// Hook para contratos
export function useContracts() {
  const queryClient = useQueryClient();

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      const response = await api.get('/contracts');
      return response.data;
    },
  });

  const createContract = useMutation({
    mutationFn: async (contractData: Omit<typeof contracts[0], 'id'>) => {
      const response = await api.post('/contracts', contractData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contrato criado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar contrato');
    },
  });

  const updateContract = useMutation({
    mutationFn: async ({
      id,
      ...data
    }: Partial<typeof contracts[0]> & { id: number }) => {
      const response = await api.put(`/contracts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contrato atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar contrato');
    },
  });

  const deleteContract = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/contracts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contrato excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir contrato');
    },
  });

  return {
    contracts,
    isLoading,
    createContract: createContract.mutate,
    updateContract: updateContract.mutate,
    deleteContract: deleteContract.mutate,
  };
}

// Hook para funções/papéis
export function useRoles() {
  const queryClient = useQueryClient();

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await api.get('/roles');
      return response.data;
    },
  });

  const createRole = useMutation({
    mutationFn: async (roleData: Omit<typeof roles[0], 'id'>) => {
      const response = await api.post('/roles', roleData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Função criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar função');
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({
      id,
      ...data
    }: Partial<typeof roles[0]> & { id: number }) => {
      const response = await api.put(`/roles/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Função atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar função');
    },
  });

  const deleteRole = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/roles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Função excluída com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir função');
    },
  });

  return {
    roles,
    isLoading,
    createRole: createRole.mutate,
    updateRole: updateRole.mutate,
    deleteRole: deleteRole.mutate,
  };
}

// Hook para logs de auditoria
export function useAuditLogs() {
  const { data: auditLogs = [], isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const response = await api.get('/audit-logs');
      return response.data;
    },
  });

  return {
    auditLogs,
    isLoading,
  };
} 