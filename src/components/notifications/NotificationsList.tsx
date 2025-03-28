
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Notification } from '@/hooks/useNotificationStore';
import { CheckIcon, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationClick: (id: string, link?: string) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
}

const NotificationsList = ({
  notifications,
  onNotificationClick,
  onRemove
}: NotificationsListProps) => {
  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ptBR
    });
  };

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "p-4 bg-card rounded-lg border border-border/60 flex items-start gap-3 cursor-pointer transition-colors",
            !notification.read ? "bg-primary/5" : "",
            "hover:border-primary/30"
          )}
          onClick={() => onNotificationClick(notification.id, notification.link)}
        >
          <NotificationIcon type={notification.type} />
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className={cn(
                "font-medium text-sm",
                !notification.read && "text-primary"
              )}>
                {notification.title}
              </h3>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(notification.createdAt)}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {notification.message}
            </p>
            
            <div className="flex justify-between items-center mt-2">
              {notification.read ? (
                <span className="text-xs text-muted-foreground flex items-center">
                  <CheckIcon className="h-3 w-3 mr-1" /> Lida
                </span>
              ) : (
                <span className="text-xs text-primary flex items-center font-medium">
                  Não lida
                </span>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => onRemove(notification.id, e)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface NotificationIconProps {
  type: 'info' | 'warning' | 'error' | 'success';
}

const NotificationIcon = ({ type }: NotificationIconProps) => {
  const iconClasses = {
    info: "bg-blue-100 text-blue-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700"
  };

  return (
    <div className={cn(
      "h-10 w-10 rounded-full flex items-center justify-center",
      iconClasses[type]
    )}>
      <div className={cn(
        "h-3 w-3 rounded-full",
        {
          "bg-blue-500": type === "info",
          "bg-amber-500": type === "warning",
          "bg-red-500": type === "error",
          "bg-green-500": type === "success"
        }
      )} />
    </div>
  );
};

export default NotificationsList;
