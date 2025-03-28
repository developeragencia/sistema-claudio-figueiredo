import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notifications';
import { Notification, UseNotificationsReturn } from '@/types/notifications';
import { logger } from '@/lib/logger';

export function useNotifications(): UseNotificationsReturn {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    staleTime: 1000 * 60 // 1 minute
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      logger.error('Erro ao marcar notificação como lida', { error });
    }
  });

  const { mutate: removeNotification } = useMutation({
    mutationFn: (id: string) => notificationService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      logger.error('Erro ao remover notificação', { error });
    }
  });

  const { mutate: clearAllNotifications } = useMutation({
    mutationFn: () => notificationService.clearAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      logger.error('Erro ao limpar todas as notificações', { error });
    }
  });

  const { mutate: markAllAsRead } = useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      logger.error('Erro ao marcar todas as notificações como lidas', { error });
    }
  });

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleRemove = (id: string) => {
    removeNotification(id);
  };

  const handleClearAll = () => {
    clearAllNotifications();
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return {
    notifications: data?.data || [],
    hasUnreadNotifications: (data?.unreadCount || 0) > 0,
    handleNotificationClick,
    handleRemove,
    handleClearAll,
    handleMarkAllAsRead,
    isLoading,
    error
  };
} 