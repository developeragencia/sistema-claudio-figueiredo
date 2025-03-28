import { User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthState {
  user: SupabaseUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
  __isAuthError: true;
  name: string;
}

export interface AuthResponse {
  data: {
    user: SupabaseUser | null;
    session: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      token_type: string;
      user: SupabaseUser;
    } | null;
  };
  error: AuthError | null;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: SupabaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface Role {
  name: string;
  id: string;
}

export interface User extends SupabaseUser {
  roles: Role[];
  permissions?: string[];
} 