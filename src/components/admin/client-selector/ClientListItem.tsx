
import React from 'react';
import { Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Client } from '@/types/client';
import { cn } from '@/lib/utils';

interface ClientListItemProps {
  client: Client;
  isActive: boolean;
  onSelect: (client: Client) => void;
}

const ClientListItem = ({ client, isActive, onSelect }: ClientListItemProps) => {
  return (
    <div
      key={client.id}
      className={cn(
        "flex items-center gap-2 px-3 py-2 hover:bg-accent cursor-pointer",
        isActive && "bg-accent"
      )}
      onClick={() => onSelect(client)}
    >
      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
        <Building className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{client.name}</p>
        <p className="text-xs text-muted-foreground">{client.cnpj}</p>
      </div>
      <StatusBadge status={client.status} />
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs",
        status === 'ACTIVE' && "bg-green-500/20 text-green-700 dark:text-green-300",
        status === 'INACTIVE' && "bg-amber-500/20 text-amber-700 dark:text-amber-300",
        status === 'PROSPECT' && "bg-blue-500/20 text-blue-700 dark:text-blue-300"
      )}
    >
      {status === 'ACTIVE' && 'Ativo'}
      {status === 'INACTIVE' && 'Inativo'}
      {status === 'PROSPECT' && 'Prospect'}
    </Badge>
  );
};

export default ClientListItem;
