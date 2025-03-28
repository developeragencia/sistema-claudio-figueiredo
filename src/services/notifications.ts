import { supabase } from '@/lib/supabase';
import { 
  Notification, 
  NotificationsResponse, 
  NotificationFilters,
  CreateNotificationData,
  UpdateNotificationData 
} from '@/types/notifications';
import { logger } from '@/lib/logger';

class NotificationService {
  private readonly tableName = 'notifications';

  async getNotifications(filters: NotificationFilters = {}): Promise<NotificationsResponse> {
    try {
      let query = supabase.from(this.tableName).select('*', { count: 'exact' });

      if (filters.read !== undefined) {
        query = query.eq('read', filters.read);
      }

      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      if (filters.startDate) {
        query = query.gte('createdAt', filters.startDate);
      }

      if (filters.endDate) {
        query = query.lte('createdAt', filters.endDate);
      }

      const { from, to } = this.getPagination(filters.page, filters.limit);
      query = query.range(from, to);

      const { data, count, error } = await query;

      if (error) {
        throw error;
      }

      const unreadCount = data?.filter(n => !n.read).length || 0;

      return {
        data: data || [],
        total: count || 0,
        unreadCount,
        page: filters.page || 1,
        limit: filters.limit || 10
      };
    } catch (error) {
      logger.error('Erro ao buscar notificações', { error });
      return {
        data: [],
        total: 0,
        unreadCount: 0,
        page: 1,
        limit: 10,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  async create(data: CreateNotificationData): Promise<Notification> {
    try {
      const { data: notification, error } = await supabase
        .from(this.tableName)
        .insert({
          ...data,
          read: false,
          createdAt: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return notification;
    } catch (error) {
      logger.error('Erro ao criar notificação', { error });
      throw error;
    }
  }

  async markAsRead(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ read: true })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error('Erro ao marcar notificação como lida', { error });
      throw error;
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ read: true })
        .eq('read', false);

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error('Erro ao marcar todas as notificações como lidas', { error });
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error('Erro ao remover notificação', { error });
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .neq('id', '0'); // Delete all records

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error('Erro ao limpar todas as notificações', { error });
      throw error;
    }
  }

  private getPagination(page = 1, limit = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return { from, to };
  }
}

export const notificationService = new NotificationService(); 