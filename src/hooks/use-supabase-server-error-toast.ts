import { useToast } from '@/components/ui/use-toast';

export function useSupabaseServerErrorToast() {
  const { toast } = useToast();

  const showServerError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Server Error') {
      message = 'Erro no servidor';
    }

    toast({
      variant: 'destructive',
      title: 'Erro no Servidor',
      description: message,
    });
  };

  return {
    showServerError,
  };
} 