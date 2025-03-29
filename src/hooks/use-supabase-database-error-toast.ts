import { useToast } from '@/components/ui/use-toast';

export function useSupabaseDatabaseErrorToast() {
  const { toast } = useToast();

  const showDatabaseError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Database Error') {
      message = 'Erro de banco de dados';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Banco de Dados',
      description: message,
    });
  };

  return {
    showDatabaseError,
  };
} 