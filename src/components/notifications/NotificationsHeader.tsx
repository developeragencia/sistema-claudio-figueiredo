
import React from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationsHeaderProps {
  hasNotifications: boolean;
  hasUnreadNotifications: boolean;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationsHeader = ({
  hasNotifications,
  hasUnreadNotifications,
  onMarkAllAsRead,
  onClearAll
}: NotificationsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <div className="flex items-center">
        <Bell className="h-5 w-5 mr-2 text-primary" />
        <h1 className="text-2xl font-bold">Notificações</h1>
      </div>
      
      {hasNotifications && (
        <div className="flex gap-2 w-full sm:w-auto">
          {hasUnreadNotifications && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={onMarkAllAsRead}
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={onClearAll}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar todas
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsHeader;
