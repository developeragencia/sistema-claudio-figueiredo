import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';
import { supabase } from '@/lib/supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
      getUser: vi.fn()
    },
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        getPublicUrl: vi.fn()
      }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        or: vi.fn(),
        eq: vi.fn()
      }))
    }))
  }
}));

describe('AuthService', () => {
  const mockUser: User = {
    id: '123',
    email: 'test@example.com',
    user_metadata: { name: 'Test User' },
    app_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    role: null,
    updated_at: null,
    phone: null,
    confirmation_sent_at: null,
    confirmed_at: null,
    email_confirmed_at: null,
    phone_confirmed_at: null,
    last_sign_in_at: null,
    recovery_sent_at: null,
    identities: [],
    factors: []
  };

  const mockSession: Session = {
    access_token: 'token123',
    refresh_token: 'refresh123',
    expires_in: 3600,
    token_type: 'bearer',
    user: mockUser,
    expires_at: Math.floor(Date.now() / 1000) + 3600
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signIn', () => {
    it('should sign in successfully', async () => {
      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
        data: { user: mockUser, session: mockSession },
        error: null
      });

      const result = await authService.signIn('test@example.com', 'password123');
      expect(result).toEqual({ user: mockUser, session: mockSession });
    });

    it('should throw error on failed sign in', async () => {
      const error = new AuthError('Invalid credentials', 401, 'invalid_credentials');
      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
        data: { user: null, session: null },
        error
      });

      await expect(authService.signIn('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      vi.mocked(supabase.auth.signOut).mockResolvedValueOnce({
        data: { user: null, session: null },
        error: null
      });
      await expect(authService.signOut()).resolves.not.toThrow();
    });

    it('should throw error on failed sign out', async () => {
      const error = new AuthError('Network error', 500, 'network_error');
      vi.mocked(supabase.auth.signOut).mockResolvedValueOnce({
        data: null,
        error
      });
      await expect(authService.signOut()).rejects.toThrow('Network error');
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValueOnce({
        data: { user: null },
        error: null
      });
      const result = await authService.resetPassword('test@example.com');
      expect(result).toEqual({ success: true });
    });

    it('should throw error on failed password reset', async () => {
      const error = new AuthError('User not found', 404, 'user_not_found');
      vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValueOnce({
        data: null,
        error
      });
      await expect(authService.resetPassword('wrong@example.com')).rejects.toThrow('User not found');
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: mockUser },
        error: null
      });

      const user = await authService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it('should return null when no user is authenticated', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: null
      });

      const user = await authService.getCurrentUser();
      expect(user).toBeNull();
    });

    it('should throw error on failed user fetch', async () => {
      const error = new AuthError('Network error', 500, 'network_error');
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error
      });

      await expect(authService.getCurrentUser()).rejects.toThrow('Network error');
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      vi.mocked(supabase.auth.updateUser).mockResolvedValueOnce({
        data: { user: mockUser },
        error: null
      });

      const result = await authService.updateUser({ name: 'New Name' });
      expect(result).toEqual({ success: true });
    });

    it('should throw error on failed user update', async () => {
      const error = new AuthError('Update failed', 500, 'update_failed');
      vi.mocked(supabase.auth.updateUser).mockResolvedValueOnce({
        data: { user: null },
        error
      });

      await expect(authService.updateUser({ name: 'New Name' })).rejects.toThrow('Update failed');
    });
  });
}); 