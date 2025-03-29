
import React from 'react';
import { useNavigate  } from "@/hooks/use-router";
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@/types/client';
import { useActiveClient } from '@/hooks/useActiveClient';

export interface ClientActionHandlersProps {
  onCreateClient: () => void;
  onExportData: () => void;
  onImportData: () => void;
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  onSetActiveClient: (client: Client) => void;
}

export const useClientActionHandlers = (): ClientActionHandlersProps => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setActiveClient } = useActiveClient();
  
  const handleCreateClient = () => {
    toast({
      title: "Novo cliente",
      description: "Formulário de cadastro de cliente aberto",
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados foram exportados com sucesso",
    });
  };
  
  const handleImportData = () => {
    toast({
      title: "Importando dados",
      description: "Selecione um arquivo para importar",
    });
  };
  
  const handleViewClient = (client: Client) => {
    // Navigate to the client detail page with the client ID
    navigate(`/admin/client/${client.id}`);
  };
  
  const handleEditClient = (client: Client) => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente: ${client.name}`,
    });
  };
  
  const handleDeleteClient = (client: Client) => {
    toast({
      variant: "destructive",
      title: "Excluir cliente",
      description: `Cliente ${client.name} excluído com sucesso`,
    });
  };
  
  const handleSetActiveClient = (client: Client) => {
    setActiveClient(client);
    toast({
      title: "Cliente ativo definido",
      description: `${client.name} definido como cliente ativo`,
    });
  };
  
  return {
    onCreateClient: handleCreateClient,
    onExportData: handleExportData,
    onImportData: handleImportData,
    onViewClient: handleViewClient,
    onEditClient: handleEditClient,
    onDeleteClient: handleDeleteClient,
    onSetActiveClient: handleSetActiveClient,
  };
};
