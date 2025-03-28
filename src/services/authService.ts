import { supabase } from '@/lib/supabase';
import { AuthResponse, LoginCredentials, ResetPasswordData, UpdatePasswordData } from '@/types/auth';
import { User } from '@/types/user';
import { logger } from '@/lib/logger';
import { RateLimiter } from '@/lib/rateLimiting';
import { validatePassword } from '@/lib/passwordValidation';
import type { AuthError, User as SupabaseUser } from '@supabase/supabase-js';
import type { 
  UserResponse,
  CreateUserData,
  UpdateUserData,
  UserFilters 
} from '@/types/user';

// Rate limiter para tentativas de login
const loginRateLimiter = new RateLimiter(5 * 60 * 1000); // 5 tentativas por minuto

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Realiza o login do usuário
   */
  async login({ email, password }: LoginCredentials): Promise<UserResponse> {
    try {
      // Verifica o rate limit
      if (!loginRateLimiter.isAllowed(email)) {
        logger.warn('Rate limit excedido para login', { email });
        throw new Error('Muitas tentativas de login. Tente novamente mais tarde.');
      }

      logger.info('Tentativa de login', { email });

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        logger.error('Erro no login', { email, error: error.message });
        throw error;
      }

      if (!user) {
        logger.error('Usuário não encontrado');
        throw new Error('Usuário não encontrado');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const userData: User = {
        id: user.id,
        email: user.email || '',
        name: profile?.name,
        role: profile?.role,
        status: profile?.status,
        avatar_url: profile?.avatar_url,
        created_at: profile?.created_at,
        updated_at: profile?.updated_at,
        app_metadata: user.app_metadata,
        user_metadata: user.user_metadata,
        aud: user.aud,
      };

      logger.info('Login realizado com sucesso', { email });

      return { user: userData };
    } catch (error) {
      loginRateLimiter.increment(email);
      logger.error('Erro inesperado no login', { email, error });
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário
   */
  async logout(): Promise<void> {
    try {
      logger.info('Iniciando logout');
      const { error } = await supabase.auth.signOut();

      if (error) {
        logger.error('Erro no logout', { error: error.message });
        throw error;
      }

      logger.info('Logout realizado com sucesso');
    } catch (error) {
      logger.error('Erro inesperado no logout', { error });
      throw error;
    }
  }

  /**
   * Solicita redefinição de senha
   */
  async resetPassword(data: ResetPasswordData): Promise<void> {
    const { email } = data;
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  /**
   * Atualiza a senha do usuário
   */
  async updatePassword(data: UpdatePasswordData): Promise<void> {
    const { password } = data;
    
    // Valida a senha
    const validationResult = validatePassword(password);
    if (validationResult.errors.length > 0) {
      throw new Error(validationResult.errors[0]);
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
  }

  /**
   * Retorna o usuário atual
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      logger.info('Buscando usuário atual');

      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        logger.info('Nenhum usuário autenticado');
        return null;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const currentUser: User = {
        id: user.id,
        email: user.email || '',
        name: profile?.name,
        role: profile?.role,
        status: profile?.status,
        avatar_url: profile?.avatar_url,
        created_at: profile?.created_at,
        updated_at: profile?.updated_at,
        app_metadata: user.app_metadata,
        user_metadata: user.user_metadata,
        aud: user.aud,
      };

      logger.info('Usuário atual recuperado com sucesso', { email: currentUser.email });

      return currentUser;
    } catch (error) {
      logger.error('Erro inesperado ao buscar usuário atual', { error });
      throw error;
    }
  }

  /**
   * Atualiza os dados do usuário
   */
  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    try {
      logger.info('Atualizando perfil do usuário', { userId });

      const { data: updatedUser, error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Erro ao atualizar perfil', { userId, error: error.message });
        throw error;
      }

      logger.info('Perfil atualizado com sucesso', { userId });

      return updatedUser as User;
    } catch (error) {
      logger.error('Erro inesperado na atualização do perfil', { userId, error });
      throw error;
    }
  }

  /**
   * Atualiza o avatar do usuário
   */
  async updateUserAvatar(userId: string, file: File): Promise<string> {
    try {
      logger.info('Iniciando upload do avatar', { userId });

      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        logger.error('Erro no upload do avatar', { userId, error: uploadError.message });
        throw uploadError;
      }

      const { data: { publicUrl } } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Atualiza o avatar_url no perfil do usuário
      await this.updateUserProfile(userId, { avatar_url: publicUrl });

      logger.info('Avatar atualizado com sucesso', { userId });

      return publicUrl;
    } catch (error) {
      logger.error('Erro inesperado no upload do avatar', { userId, error });
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { success: true };
  }

  async updatePassword(password: string) {
    const validationResult = validatePassword(password);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) throw error;
    return { success: true };
  }

  async getCurrentUser(): Promise<SupabaseUser | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async updateAvatar(file: File) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl }, error: urlError } = await supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    if (urlError) throw urlError;

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    });

    if (updateError) throw updateError;

    return { url: publicUrl };
  }

  async updateUser(data: { name?: string; email?: string }) {
    const { error } = await supabase.auth.updateUser({
      email: data.email,
      data: { name: data.name }
    });

    if (error) throw error;
    return { success: true };
  }

  async getUsers(filters: UserFilters = {}): Promise<User[]> {
    let query = supabase.from('profiles').select('*');

    if (filters.role) {
      query = query.eq('role', filters.role);
    }

    const { data: profiles, error } = await query;

    if (error) throw error;

    const users = await Promise.all(
      profiles.map(async (profile) => {
        const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(profile.id);
        if (userError) throw userError;
        if (!user) throw new Error('Usuário não encontrado');

        return {
          id: user.id,
          email: user.email || '',
          name: profile.name,
          role: profile.role,
          status: profile.status,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          app_metadata: user.app_metadata,
          user_metadata: user.user_metadata,
          aud: user.aud,
        };
      })
    );

    return users;
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) throw error;
  }

  async createUser(data: CreateUserData): Promise<User> {
    const { email, password, ...profileData } = data;

    // Valida a senha
    const validationResult = validatePassword(password);
    if (validationResult.errors.length > 0) {
      throw new Error(validationResult.errors[0]);
    }

    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    if (!user) throw new Error('Erro ao criar usuário');

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, ...profileData }]);

    if (profileError) throw profileError;

    return this.getUserById(user.id);
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', id);

    if (profileError) throw profileError;

    return this.getUserById(id);
  }

  async getUserById(id: string): Promise<User> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!profile) throw new Error('Usuário não encontrado');

    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(id);
    
    if (userError) throw userError;
    if (!user) throw new Error('Usuário não encontrado');

    return {
      id: user.id,
      email: user.email || '',
      name: profile.name,
      role: profile.role,
      status: profile.status,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata,
      aud: user.aud,
    };
  }
}

export const authService = AuthService.getInstance(); 