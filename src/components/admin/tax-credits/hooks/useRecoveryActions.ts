
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { RecoveryProcess } from '@/types/recovery';

export interface UseRecoveryActionsReturn {
  isLoading: boolean;
  handleViewDetails: (processId: string) => void;
  handleEdit: (processId: string) => void;
  handleDelete: (processId: string) => void;
  handleApprove: (processId: string) => void;
  handleExport: (processId: string) => void;
  handleDuplicate: (processId: string) => void;
  handleShare: (processId: string) => void;
}

export const useRecoveryActions = (onNavigateToDetails?: (processId: string) => void): UseRecoveryActionsReturn => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetails = (processId: string) => {
    if (onNavigateToDetails) {
      onNavigateToDetails(processId);
    } else {
      toast({
        title: "Visualizar detalhes",
        description: `Visualizando processo #${processId}`,
      });
    }
  };

  const handleEdit = (processId: string) => {
    toast({
      title: "Editar processo",
      description: `Editando processo #${processId}`,
    });
  };

  const handleDelete = (processId: string) => {
    toast({
      title: "Excluir processo",
      description: `Processo #${processId} excluído com sucesso`,
      variant: "destructive",
    });
  };

  const handleApprove = (processId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Processo aprovado",
        description: `Processo #${processId} foi aprovado com sucesso`,
        variant: "success",
      });
    }, 1000);
  };

  const handleExport = (processId: string) => {
    toast({
      title: "Exportar processo",
      description: `Exportando processo #${processId}`,
    });
  };

  const handleDuplicate = (processId: string) => {
    toast({
      title: "Duplicar processo",
      description: `Processo #${processId} duplicado com sucesso`,
    });
  };

  const handleShare = (processId: string) => {
    toast({
      title: "Compartilhar processo",
      description: `Compartilhando processo #${processId}`,
    });
  };

  return {
    isLoading,
    handleViewDetails,
    handleEdit,
    handleDelete,
    handleApprove,
    handleExport,
    handleDuplicate,
    handleShare,
  };
};
