
import React, { useState } from 'react';
import { useActiveClient } from '@/hooks/useActiveClient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, ChevronDown, X, Building, Eye, Edit, 
  CheckCircle, AlertCircle, UserCog 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ClientOperationsAccess from './ClientOperationsAccess';

const ActiveClientHeader = () => {
  const { 
    activeClient, 
    clearActiveClient, 
    hasViewAccess, 
    hasEditAccess, 
    hasApprovalAccess,
    isClientAdmin,
    isRepresentative
  } = useActiveClient();
  
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false);
  
  // Format CNPJ with dots and dashes
  const formatCNPJ = (cnpj) => {
    if (!cnpj) return '';
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  if (!activeClient) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-background border px-4 py-3 rounded-lg mb-4">
      <div className="flex items-center">
        <Building className="h-5 w-5 mr-2 text-primary" />
        <div>
          <span className="font-medium text-sm">Cliente Ativo: </span>
          <span className="font-bold text-sm">{activeClient.name}</span>
          <span className="text-xs text-muted-foreground ml-2">
            {formatCNPJ(activeClient.cnpj)}
          </span>
        </div>
        
        <Badge variant="outline" className="ml-3 bg-primary/10 text-primary border-primary/20">
          <Shield className="h-3 w-3 mr-1" />
          Ativo
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <UserCog className="h-3.5 w-3.5" />
              Acesso
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minhas permissões</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Visualização
                {hasViewAccess ? 
                  <CheckCircle className="ml-auto h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="ml-auto h-4 w-4 text-red-500" />
                }
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edição
                {hasEditAccess ? 
                  <CheckCircle className="ml-auto h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="ml-auto h-4 w-4 text-red-500" />
                }
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Aprovação
                {hasApprovalAccess ? 
                  <CheckCircle className="ml-auto h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="ml-auto h-4 w-4 text-red-500" />
                }
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Administrador
                {isClientAdmin ? 
                  <CheckCircle className="ml-auto h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="ml-auto h-4 w-4 text-red-500" />
                }
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                Representante
                {isRepresentative ? 
                  <CheckCircle className="ml-auto h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="ml-auto h-4 w-4 text-red-500" />
                }
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsAccessDialogOpen(true)}>
              <UserCog className="mr-2 h-4 w-4" />
              Ver detalhes de acesso
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={clearActiveClient}
        >
          <X className="h-3.5 w-3.5" />
          Remover
        </Button>
      </div>

      <Dialog open={isAccessDialogOpen} onOpenChange={setIsAccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes de Acesso</DialogTitle>
            <DialogDescription>
              Permissões de acesso para o cliente {activeClient.name}.
            </DialogDescription>
          </DialogHeader>
          
          <ClientOperationsAccess client={activeClient} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveClientHeader;
