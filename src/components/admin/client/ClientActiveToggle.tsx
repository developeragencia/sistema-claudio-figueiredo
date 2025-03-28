
import React from 'react';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Client } from '@/types/client';
import { useActiveClient } from '@/hooks/useActiveClient';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Badge } from '@/components/ui/badge';

interface ClientActiveToggleProps {
  client: Client;
  showDetails?: boolean;
}

const ClientActiveToggle: React.FC<ClientActiveToggleProps> = ({ 
  client, 
  showDetails = false 
}) => {
  const { activeClient, setActiveClient, clearActiveClient } = useActiveClient();
  const isActive = activeClient?.id === client.id;
  
  const handleToggleActive = () => {
    if (isActive) {
      clearActiveClient();
    } else {
      setActiveClient(client);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {showDetails && isActive && (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mr-2">
          <Shield className="h-3 w-3 mr-1" />
          <span>Ativo</span>
        </Badge>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ButtonEffect
                onClick={handleToggleActive}
                variant={isActive ? "destructive" : "default"}
                size="sm"
                icon={isActive ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                label={isActive ? "Desativar" : "Ativar"}
                tooltip={isActive ? "Desativar cliente atual" : "Definir como cliente ativo"}
                className={isActive ? "bg-destructive/90 hover:bg-destructive" : ""}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isActive ? "Desativar cliente atual" : "Definir como cliente ativo"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ClientActiveToggle;
