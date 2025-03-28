
import React from 'react';
import { Building, CornerDownRight, User } from 'lucide-react';
import { useActiveClient } from '@/hooks/useActiveClient';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const ClientActiveHeader = () => {
  const { activeClient } = useActiveClient();

  if (!activeClient) return null;

  // Map the status values correctly
  const getStatusBadge = () => {
    const status = activeClient.status;
    
    if (status === "ACTIVE") {
      return { text: 'Ativo', className: 'bg-green-500/20 text-green-700 dark:text-green-300' };
    } else if (status === "INACTIVE") {
      return { text: 'Inativo', className: 'bg-amber-500/20 text-amber-700 dark:text-amber-300' };
    } else if (status === "PROSPECT") {
      return { text: 'Prospecto', className: 'bg-blue-500/20 text-blue-700 dark:text-blue-300' };
    } else {
      return { text: 'Desconhecido', className: 'bg-gray-500/20 text-gray-700 dark:text-gray-300' };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="bg-card/50 backdrop-blur-sm border-b border-primary/5 py-2 px-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Building className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{activeClient.name}</h3>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs px-1.5 h-5",
                  statusBadge.className
                )}
              >
                {statusBadge.text}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{activeClient.cnpj}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-primary/5 border-primary/10">
            <User className="h-3 w-3 mr-1" />
            <span>{activeClient.contactName}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ClientActiveHeader;
