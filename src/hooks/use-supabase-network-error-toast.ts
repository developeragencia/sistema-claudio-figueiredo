import { useToast } from '@/components/ui/use-toast';

export function useSupabaseNetworkErrorToast() {
  const { toast } = useToast();

  const showNetworkError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Network Error') {
      message = 'Erro de rede';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Rede',
      description: message,
    });
  };

  return {
    showNetworkError,
  };
} 