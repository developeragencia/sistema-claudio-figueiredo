import { useCallback, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useToast } from '@/components/ui/use-toast';
import { type User } from '@supabase/supabase-js';

interface UseSupabaseOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useSupabase(options: UseSupabaseOptions = {}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const supabase = createClient();

  const execute = useCallback(
    async (promise: Promise<any>) => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await promise;

        if (error) {
          throw error;
        }

        if (options.onSuccess) {
          options.onSuccess(data);
        }

        toast({
          title: 'Sucesso',
          description: 'Operação realizada com sucesso.',
        });

        return data;
      } catch (err: any) {
        setError(err);

        if (options.onError) {
          options.onError(err);
        }

        toast({
          variant: 'destructive',
          title: 'Erro',
          description: err.message,
        });

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options, toast]
  );

  return {
    user,
    loading,
    error,
    execute,
    supabase,
  };
} 