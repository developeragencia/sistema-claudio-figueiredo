import { useToast } from '@/components/ui/use-toast';

export function useSupabasePermissionErrorToast() {
  const { toast } = useToast();

  const showPermissionError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Permission Error') {
      message = 'Erro de permissão';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Permissão',
      description: message,
    });
  };

  return {
    showPermissionError,
  };
} 