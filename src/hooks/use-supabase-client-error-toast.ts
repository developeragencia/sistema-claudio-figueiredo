import { useToast } from '@/components/ui/use-toast';

export function useSupabaseClientErrorToast() {
  const { toast } = useToast();

  const showClientError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Client Error') {
      message = 'Erro de cliente';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Cliente',
      description: message,
    });
  };

  return {
    showClientError,
  };
} 