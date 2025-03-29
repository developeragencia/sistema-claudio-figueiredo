import { useToast } from '@/components/ui/use-toast';

export function useSupabaseAuthErrorToast() {
  const { toast } = useToast();

  const showAuthError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Auth Error') {
      message = 'Erro de autenticação';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Autenticação',
      description: message,
    });
  };

  return {
    showAuthError,
  };
} 