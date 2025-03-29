import { useToast } from '@/components/ui/use-toast';

export function useSupabaseValidationErrorToast() {
  const { toast } = useToast();

  const showValidationError = (error: Error) => {
    let message = error.message;

    if (error instanceof TypeError && error.message === 'Validation Error') {
      message = 'Erro de validação';
    }

    toast({
      variant: 'destructive',
      title: 'Erro de Validação',
      description: message,
    });
  };

  return {
    showValidationError,
  };
} 