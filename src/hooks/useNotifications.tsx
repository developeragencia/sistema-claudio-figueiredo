
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNotificationStore } from '@/hooks/useNotificationStore';

export const useNotifications = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAll
  } = useNotificationStore();
  const { toast } = useToast();

  // Mark notifications as viewed when the page is opened
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length > 0) {
      const timeout = setTimeout(() => {
        markAllAsRead();
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [notifications, markAllAsRead]);

  const handleNotificationClick = useCallback((id: string, link?: string) => {
    markAsRead(id);
    
    // Return the link for navigation
    if (link) {
      // Check if the link exists before returning it
      const validRoutes = [
        '/admin', 
        '/credits/details/', 
        '/declarations', 
        '/analysis/report/',
        '/notifications'
      ];
      
      const isValidRoute = validRoutes.some(route => {
        if (typeof link === 'string') {
          return link.startsWith(route);
        }
        return false;
      });
      
      if (isValidRoute) {
        return link;
      } else {
        toast({
          title: "Rota não encontrada",
          description: `A rota ${link} não está disponível no momento.`,
          variant: "destructive"
        });
        // Return a fallback route
        return '/admin';
      }
    }
    
    return null;
  }, [markAsRead, toast]);

  const handleRemove = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(id);
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso",
    });
  }, [removeNotification, toast]);

  const handleClearAll = useCallback(() => {
    clearAll();
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram removidas",
    });
  }, [clearAll, toast]);

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead();
    toast({
      title: "Notificações lidas",
      description: "Todas as notificações foram marcadas como lidas",
    });
  }, [markAllAsRead, toast]);

  const hasUnreadNotifications = notifications.some(n => !n.read);

  return {
    notifications,
    hasUnreadNotifications,
    handleNotificationClick,
    handleRemove,
    handleClearAll,
    handleMarkAllAsRead
  };
};
