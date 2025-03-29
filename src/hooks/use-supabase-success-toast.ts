import { useToast } from '@/components/ui/use-toast';

export function useSupabaseSuccessToast() {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: 'Sucesso',
      description: message,
    });
  };

  return {
    showSuccess,
  };
} 