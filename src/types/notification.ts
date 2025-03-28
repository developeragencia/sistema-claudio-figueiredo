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
  unreadCount: number;
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  hasUnreadNotifications: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  deleteAllNotifications: () => Promise<void>;
  handleNotificationClick: (notification: Notification) => void;
  handleRemove: (id: string) => void;
  handleClearAll: () => void;
  handleMarkAllAsRead: () => void;
}

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  INFO: 'Informação',
  WARNING: 'Aviso',
  ERROR: 'Erro',
  SUCCESS: 'Sucesso'
};

export const NOTIFICATION_TYPE_COLORS: Record<NotificationType, string> = {
  INFO: 'blue',
  WARNING: 'yellow',
  ERROR: 'red',
  SUCCESS: 'green'
};

export interface UseNotificationReturn {
  notification: Notification | null;
  isLoading: boolean;
  error: Error | null;
  updateNotification: (data: UpdateNotificationData) => Promise<void>;
  deleteNotification: () => Promise<void>;
} 