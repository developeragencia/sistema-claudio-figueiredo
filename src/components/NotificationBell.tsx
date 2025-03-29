
import React, { useEffect, useState } from 'react';
import { useNavigate  } from "@/hooks/use-router";
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useNotificationStore, Notification } from '@/hooks/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const NotificationBell = () => {
  const { notifications, markAsRead, markAllAsRead, getUnreadCount } = useNotificationStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setUnreadCount(getUnreadCount());
  }, [notifications, getUnreadCount]);

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      // Check if the link exists before navigating
      const validRoutes = [
        '/admin', 
        '/credits/details/', 
        '/declarations', 
        '/analysis/report/', 
        '/notifications'
      ];
      
      const isValidRoute = validRoutes.some(route => {
        if (typeof notification.link === 'string') {
          return notification.link.startsWith(route);
        }
        return false;
      });
      
      if (isValidRoute) {
        navigate(notification.link);
      } else {
        toast({
          title: "Rota não encontrada",
          description: `A rota ${notification.link} não está disponível no momento.`,
          variant: "destructive"
        });
      }
    }
  };

  const handleViewAll = () => {
    navigate('/notifications');
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAllAsRead();
    toast({
      title: "Notificações lidas",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  const formatTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ptBR
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>;
      case 'warning':
        return <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>;
      case 'error':
        return <div className="h-2 w-2 rounded-full bg-destructive mr-1.5"></div>;
      case 'info':
      default:
        return <div className="h-2 w-2 rounded-full bg-primary mr-1.5"></div>;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[70vh] overflow-y-auto">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={handleMarkAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-3 cursor-pointer",
                  !notification.read && "bg-primary/5"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-center w-full">
                  {getNotificationIcon(notification.type)}
                  <span className="font-medium text-sm">{notification.title}</span>
                  {!notification.read && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                  )}
                </div>
                <p className="text-xs mt-1 text-muted-foreground">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between w-full mt-2">
                  <span className="text-[10px] text-muted-foreground">
                    {formatTime(notification.createdAt)}
                  </span>
                  {notification.read ? (
                    <span className="text-[10px] text-muted-foreground">Lida</span>
                  ) : (
                    <span className="text-[10px] text-primary font-medium">Não lida</span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex justify-center py-2 text-primary font-medium"
              onClick={handleViewAll}
            >
              Ver todas as notificações
            </DropdownMenuItem>
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Não há notificações no momento
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
