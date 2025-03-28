
import React from 'react';
import { Bell } from 'lucide-react';

const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-card rounded-lg border border-border/60 mt-4">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Bell className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">Nenhuma notificação</h3>
      <p className="text-muted-foreground text-center max-w-md mt-2">
        Você não possui notificações no momento. Novas notificações aparecerão aqui.
      </p>
    </div>
  );
};

export default EmptyNotifications;
