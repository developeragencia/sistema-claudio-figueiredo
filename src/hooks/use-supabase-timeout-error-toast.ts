import { useToast } from '@/components/ui/use-toast';

export function useSupabaseTimeoutErrorToast() {
  const { toast } = useToast();

  const showTimeoutError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Timeout Error') {
      message = 'Tempo limite excedido';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Timeout',
      description: message,
    });
  };

  return {
    showTimeoutError,
  };
} 