import api from '@/lib/api';
import { UserProfile, User } from '@/types/user';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  position?: string;
  bio?: string;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface UpdateAvatarResponse {
  avatarUrl: string;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface GetNotificationsParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}

interface NotificationsResponse {
  data: Notification[];
  total: number;
  unreadCount: number;
}

export const userService = {
  // Perfil
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    try {
      const response = await api.put<UserProfile>('/users/profile', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  async updateAvatar(file: File): Promise<UpdateAvatarResponse> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post<UpdateAvatarResponse>('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
      throw error;
    }
  },

  async updateNotificationPreferences(preferences: NotificationPreferences): Promise<UserProfile> {
    try {
      const response = await api.put<UserProfile>('/users/notification-preferences', preferences);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar preferências de notificação:', error);
      throw error;
    }
  },

  // Notificações
  async getNotifications({
    page = 1,
    limit = 10,
    unreadOnly = false,
  }: GetNotificationsParams = {}): Promise<NotificationsResponse> {
    try {
      const response = await api.get<NotificationsResponse>('/notifications', {
        params: {
          page,
          limit,
          unreadOnly,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw error;
    }
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await api.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      throw error;
    }
  },

  async markAllNotificationsAsRead(): Promise<void> {
    try {
      await api.put('/notifications/read-all');
    } catch (error) {
      console.error('Erro ao marcar todas notificações como lidas:', error);
      throw error;
    }
  },

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await api.delete(`/notifications/${notificationId}`);
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      throw error;
    }
  },

  async enablePushNotifications(): Promise<void> {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Registra o service worker para push notifications
        const registration = await navigator.serviceWorker.register('/sw.js');
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });

        // Envia a subscription para o backend
        await api.post('/notifications/push-subscription', subscription);
      }
    } catch (error) {
      console.error('Erro ao habilitar notificações push:', error);
      throw error;
    }
  },

  // Backup e Restauração
  async exportUserData(): Promise<Blob> {
    try {
      const response = await api.get('/users/export', {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao exportar dados do usuário:', error);
      throw error;
    }
  },

  async importUserData(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('data', file);

      await api.post('/users/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Erro ao importar dados do usuário:', error);
      throw error;
    }
  },
}; 