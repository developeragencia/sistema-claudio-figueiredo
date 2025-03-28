export type NotificationType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationData {
  type: NotificationType;
  message: string;
  link?: string;
}

export interface UpdateNotificationData {
  read?: boolean;
}

export interface NotificationFilters {
  type?: NotificationType;
  read?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  deleteAllNotifications: () => Promise<void>;
}

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  INFO: 'Informação',
  WARNING: 'Alerta',
  ERROR: 'Erro',
  SUCCESS: 'Sucesso'
};

export const NOTIFICATION_TYPE_COLORS: Record<NotificationType, string> = {
  INFO: 'bg-blue-500',
  WARNING: 'bg-yellow-500',
  ERROR: 'bg-red-500',
  SUCCESS: 'bg-green-500'
}; 