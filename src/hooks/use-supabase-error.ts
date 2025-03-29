import { useState } from 'react';
import { type AuthError } from '@supabase/supabase-js';

export function useError() {
  const [error, setError] = useState<AuthError | null>(null);

  const handleError = (error: AuthError) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  const getErrorMessage = () => {
    if (!error) return '';

    switch (error.message) {
      case 'Invalid login credentials':
        return 'Email ou senha inválidos';
      case 'Email not confirmed':
        return 'Email não confirmado';
      case 'User not found':
        return 'Usuário não encontrado';
      case 'Password is too short':
        return 'A senha deve ter no mínimo 6 caracteres';
      case 'Email already taken':
        return 'Este email já está em uso';
      default:
        return error.message;
    }
  };

  return {
    error,
    handleError,
    clearError,
    getErrorMessage,
  };
} 