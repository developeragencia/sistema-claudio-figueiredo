import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { type User, type AuthError } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error);
        return { error };
      }

      setUser(data.user);
      return { data };
    } catch (err) {
      console.error('Error signing in:', err);
      return { error: err as AuthError };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error);
        return { error };
      }

      return { data };
    } catch (err) {
      console.error('Error signing up:', err);
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setError(error);
        return { error };
      }

      setUser(null);
      return { data: true };
    } catch (err) {
      console.error('Error signing out:', err);
      return { error: err as AuthError };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setError(error);
        return { error };
      }

      return { data };
    } catch (err) {
      console.error('Error resetting password:', err);
      return { error: err as AuthError };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error);
        return { error };
      }

      return { data };
    } catch (err) {
      console.error('Error updating password:', err);
      return { error: err as AuthError };
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };
} 