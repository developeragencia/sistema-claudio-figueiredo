import { useToast } from '@/components/ui/use-toast';

export function useSupabaseWarningToast() {
  const { toast } = useToast();

  const showWarning = (message: string) => {
    toast({
      title: 'Aviso',
      description: message,
    });
  };

  return {
    showWarning,
  };
} 