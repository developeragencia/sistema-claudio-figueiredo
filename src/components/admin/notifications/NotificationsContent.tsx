
import React, { useState } from 'react';
import { 
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Trash2,
  RefreshCw,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'info' | 'warning';
  date: string;
  read: boolean;
}

const NotificationsContent: React.FC = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  
  // Mock notifications for demonstration
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Auditoria concluída',
      message: 'A auditoria #1234 foi concluída com sucesso.',
      type: 'success',
      date: '2023-08-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      title: 'Prazo expirando',
      message: 'O prazo para envio da declaração #5678 expira em 2 dias.',
      type: 'warning',
      date: '2023-08-14T15:45:00Z',
      read: true
    },
    {
      id: '3',
      title: 'Novo cliente cadastrado',
      message: 'O cliente "Empresa XYZ" foi cadastrado no sistema.',
      type: 'info',
      date: '2023-08-14T09:20:00Z',
      read: true
    },
    {
      id: '4',
      title: 'Erro no processamento',
      message: 'Erro ao processar o arquivo de importação. Verifique o formato.',
      type: 'alert',
      date: '2023-08-13T17:10:00Z',
      read: false
    }
  ]);

  const refreshNotifications = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Notificações atualizadas",
        description: "Suas notificações foram atualizadas com sucesso."
      });
    }, 1000);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })));
    
    toast({
      title: "Notificações marcadas como lidas",
      description: "Todas as notificações foram marcadas como lidas."
    });
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    
    toast({
      title: "Notificações excluídas",
      description: "Todas as notificações foram excluídas com sucesso."
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <Clock className="h-5 w-5 text-amber-500" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notificações</h1>
          <p className="text-muted-foreground">
            Gerencie suas notificações e alertas do sistema
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="default" 
            className="w-full sm:w-auto"
            onClick={markAllAsRead}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={refreshNotifications}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button 
            variant="destructive" 
            className="w-full sm:w-auto"
            onClick={deleteAllNotifications}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Limpar todas
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter('all')}>
              Todas
            </TabsTrigger>
            <TabsTrigger value="unread" onClick={() => setFilter('unread')}>
              Não lidas
            </TabsTrigger>
            <TabsTrigger value="alert" onClick={() => setFilter('alert')}>
              Alertas
            </TabsTrigger>
            <TabsTrigger value="warning" onClick={() => setFilter('warning')}>
              Avisos
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center text-sm text-muted-foreground">
            <Filter className="h-4 w-4 mr-1" />
            Filtro: {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma notificação</h3>
                  <p className="text-muted-foreground">
                    Não há notificações para exibir neste momento.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {filteredNotifications.map((notification) => (
                    <li 
                      key={notification.id} 
                      className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getTypeIcon(notification.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                                  Nova
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              {formatDate(notification.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => markAsRead(notification.id)}
                              title="Marcar como lida"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => deleteNotification(notification.id)}
                            title="Excluir notificação"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* All other TabsContent have the same structure */}
        <TabsContent value="unread" className="mt-0">
          {/* Same card structure as "all" tab */}
        </TabsContent>
        
        <TabsContent value="alert" className="mt-0">
          {/* Same card structure as "all" tab */}
        </TabsContent>
        
        <TabsContent value="warning" className="mt-0">
          {/* Same card structure as "all" tab */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsContent;
