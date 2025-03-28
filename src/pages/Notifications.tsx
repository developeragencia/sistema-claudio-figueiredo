import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsList from '@/components/notifications/NotificationsList';
import EmptyNotifications from '@/components/notifications/EmptyNotifications';
import { useNotifications } from '@/hooks/useNotifications';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const { 
    notifications,
    hasUnreadNotifications,
    handleNotificationClick,
    handleRemove,
    handleClearAll,
    handleMarkAllAsRead,
    isLoading,
    error
  } = useNotifications();

  const handleNavigateToLink = (id: string, link?: string) => {
    const navigateToLink = handleNotificationClick(id, link);
    if (navigateToLink) {
      navigate(navigateToLink);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Erro ao carregar notificações
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <NotificationsHeader 
          hasNotifications={notifications.length > 0}
          hasUnreadNotifications={hasUnreadNotifications}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
        />

        {notifications.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Notificações</h1>
              
              <div className="space-x-2">
                {hasUnreadNotifications && (
                  <Button onClick={handleMarkAllAsRead} variant="outline">
                    Marcar todas como lidas
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button onClick={handleClearAll} variant="outline">
                    Limpar todas
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {notifications.map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-gray-600">{notification.message}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(notification.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyNotifications />
        )}
      </div>
    </div>
  );
};

export default Notifications;
