'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';
import { useAuth as useSupabaseAuth } from '@/hooks/use-auth';

type AuthContextType = ReturnType<typeof useSupabaseAuth>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useSupabaseAuth();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          auth.user = session.user;
        } else {
          auth.user = null;
        }
        auth.loading = false;
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [auth.user, auth.loading, supabase.auth]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        auth.user = data.user;
        router.push('/dashboard');
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso!",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Erro ao fazer login",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      auth.user = null;
      router.push('/login');
      toast({
        title: "Sucesso",
        description: "Logout realizado com sucesso!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Erro ao fazer logout",
      });
      throw error;
    }
  };

  const value = {
    ...auth,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
