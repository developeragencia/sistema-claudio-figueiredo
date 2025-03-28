import axios from 'axios';
import { LoginCredentials, ResetPasswordData, UpdatePasswordData } from '@/types/auth'
import { CreateUserData, UpdateUserData, User, UserFilters, UserResponse } from '@/types/user'
import { supabase } from '@/lib/supabase';

interface SignInInput {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: {
      id: string;
      name: string;
      permissions: string[];
    }[];
  };
}

interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  roleIds: string[];
}

interface CreateUserResponse {
  id: string;
  email: string;
  name: string;
  roles: {
    id: string;
    name: string;
  }[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const authService = {
  async signIn(input: SignInInput): Promise<SignInResponse> {
    const response = await api.post<SignInResponse>('/auth/signin', input);
    return response.data;
  },

  async createUser(input: CreateUserInput): Promise<CreateUserResponse> {
    const response = await api.post<CreateUserResponse>('/auth/users', input);
    return response.data;
  },

  async getCurrentUser(): Promise<SignInResponse['user']> {
    const response = await api.get<SignInResponse['user']>('/auth/me');
    return response.data;
  },

  async signOut(): Promise<void> {
    await api.post('/auth/signout');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  removeToken(): void {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return { success: true }
  },

  async updatePassword({ password, token }: UpdatePasswordData) {
    const { data, error } = await supabase.auth.updateUser({
      password,
      ...(token && { token })
    })

    if (error) throw error
    return data
  },

  async updateProfile(userId: string, data: UpdateUserData) {
    const { error } = await supabase
      .from('users')
      .update(data)
      .eq('id', userId)

    if (error) throw error
  },

  async updateAvatar(userId: string, file: File) {
    const { error } = await supabase
      .storage
      .from('avatars')
      .upload(`${userId}/${file.name}`, file)

    if (error) throw error

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(`${userId}/avatar`, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${userId}/avatar`)

    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)

    if (updateError) throw updateError

    return { publicUrl }
  },

  async listUsers(filters: UserFilters): Promise<UserResponse> {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    if (filters.role) {
      query = query.eq('role', filters.role)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    const { from, to } = getPagination(filters.page, filters.limit)
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      users: data || [],
      total: count || 0,
      page: filters.page || 1,
      limit: filters.limit || 10
    }
  },

  async updateUser(data: Partial<User>) {
    const { data: userData, error } = await supabase.auth.updateUser({
      data: {
        ...data
      }
    })
    if (error) throw error
    return userData
  },

  async getUsers(filters = {}) {
    let query = supabase
      .from('users')
      .select('*')

    if (filters.role) {
      query = query.eq('role', filters.role)
    }

    const { data, error } = await query

    if (error) throw error

    return data
  }
}

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(config => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authService.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function getPagination(page = 1, limit = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1
  return { from, to }
} 