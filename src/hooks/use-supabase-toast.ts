import { useToast } from '@/components/ui/use-toast';
import { type AuthError } from '@supabase/supabase-js';

export function useSupabaseToast() {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: 'Sucesso',
      description: message,
    });
  };

  const showError = (error: AuthError) => {
    let message = error.message;

    switch (error.message) {
      case 'Invalid login credentials':
        message = 'Email ou senha inválidos';
        break;
      case 'Email not confirmed':
        message = 'Email não confirmado';
        break;
      case 'User not found':
        message = 'Usuário não encontrado';
        break;
      case 'Password is too short':
        message = 'A senha deve ter no mínimo 6 caracteres';
        break;
      case 'Email already taken':
        message = 'Este email já está em uso';
        break;
    }

    toast({
      variant: 'destructive',
      title: 'Erro',
      description: message,
    });
  };

  return {
    showSuccess,
    showError,
  };
} 