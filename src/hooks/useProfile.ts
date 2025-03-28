import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './useAuth';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      updateUser(data);
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil.",
      });
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: userService.updateAvatar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      updateUser((prev) => ({ ...prev, avatar: data.avatarUrl }));
      toast({
        title: "Avatar atualizado",
        description: "Seu avatar foi atualizado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar avatar",
        description: error.message || "Ocorreu um erro ao atualizar seu avatar.",
      });
    },
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: userService.updateNotificationPreferences,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      updateUser(data);
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram atualizadas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar preferências",
        description: error.message || "Ocorreu um erro ao atualizar suas preferências de notificação.",
      });
    },
  });
}

export function useExportUserData() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: userService.exportUserData,
    onSuccess: (data) => {
      // Cria um link para download do arquivo
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user-data.json');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Dados exportados",
        description: "Seus dados foram exportados com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao exportar dados",
        description: error.message || "Ocorreu um erro ao exportar seus dados.",
      });
    },
  });
}

export function useImportUserData() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: userService.importUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Dados importados",
        description: "Seus dados foram importados com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao importar dados",
        description: error.message || "Ocorreu um erro ao importar seus dados.",
      });
    },
  });
} 