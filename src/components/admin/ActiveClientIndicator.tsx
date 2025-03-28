import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, X } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  cnpj?: string;
  segment?: string;
  type?: 'public' | 'private';
  city?: string;
  state?: string;
}

interface ActiveClientIndicatorProps {
  client: Client | null;
  onClear?: () => void;
  onSelect?: (client: Client) => void;
  recentClients?: Client[];
}

export function ActiveClientIndicator({ 
  client, 
  onClear, 
  onSelect,
  recentClients = []
}: ActiveClientIndicatorProps) {
  if (!client) {
    return (
      <Badge variant="outline" className="ml-auto">
        Nenhum cliente selecionado
      </Badge>
    );
  }

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 bg-primary/5 border-primary/10 text-primary">
            <Building className="h-3.5 w-3.5 mr-1.5" />
            <span className="max-w-[140px] truncate font-medium">
              {client.name}
            </span>
            {client.cnpj && (
              <Badge variant="outline" className="ml-2 text-[10px] px-1.5 bg-white/20">
                {client.cnpj}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-3">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Cliente Ativo</h4>
                <p className="text-sm text-muted-foreground">
                  Todas as ações serão vinculadas a este cliente
                </p>
              </div>
              {onClear && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClear}
                  className="h-6 w-6 text-muted-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            
            <div className="p-3 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{client.name}</p>
                  {client.cnpj && (
                    <p className="text-xs text-muted-foreground">
                      CNPJ: {client.cnpj}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                {client.segment && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Segmento:</span>
                    <span>{client.segment}</span>
                  </div>
                )}
                {client.type && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="capitalize">
                      {client.type === 'public' ? 'Público' : 'Privado'}
                    </span>
                  </div>
                )}
                {client.city && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Cidade:</span>
                    <span>{client.city}</span>
                  </div>
                )}
                {client.state && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Estado:</span>
                    <span>{client.state}</span>
                  </div>
                )}
              </div>
            </div>
            
            {recentClients.length > 0 && onSelect && (
              <div>
                <h5 className="text-sm font-medium mb-1.5">Clientes Recentes</h5>
                <div className="space-y-1">
                  {recentClients
                    .filter(recentClient => recentClient.id !== client.id)
                    .slice(0, 3)
                    .map(recentClient => (
                      <Button
                        key={recentClient.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelect(recentClient)}
                        className="w-full justify-start text-xs h-auto py-1"
                      >
                        <Building className="h-3 w-3 mr-1.5" />
                        <span className="max-w-[180px] truncate">
                          {recentClient.name}
                        </span>
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
