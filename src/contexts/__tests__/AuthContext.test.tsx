import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { authService } from '../../services/authService';

// Mock do serviço de autenticação
vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
    resetPassword: vi.fn(),
    updatePassword: vi.fn(),
  },
}));

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="user">{auth.user ? JSON.stringify(auth.user) : 'no user'}</div>
      <div data-testid="loading">{auth.isLoading.toString()}</div>
      <div data-testid="error">{auth.error || 'no error'}</div>
      <button onClick={() => auth.login({ email: 'test@example.com', password: 'password' })}>
        Login
      </button>
      <button onClick={() => auth.logout()}>Logout</button>
      <button onClick={() => auth.resetPassword({ email: 'test@example.com' })}>
        Reset Password
      </button>
      <button onClick={() => auth.updatePassword({ password: 'newpassword', token: 'token' })}>
        Update Password
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve fornecer o estado inicial correto', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('no user');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('no error');
  });

  it('deve realizar login com sucesso', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    vi.mocked(authService.login).mockResolvedValue({
      success: true,
      user: mockUser,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
    });
    expect(screen.getByTestId('error')).toHaveTextContent('no error');
  });

  it('deve lidar com erro de login', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials');
    });
    expect(screen.getByTestId('user')).toHaveTextContent('no user');
  });

  it('deve realizar logout com sucesso', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    vi.mocked(authService.login).mockResolvedValue({
      success: true,
      user: mockUser,
    });
    vi.mocked(authService.logout).mockResolvedValue({
      success: true,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Primeiro faz login
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
    });

    // Depois faz logout
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user');
    });
  });

  it('deve lidar com erro de logout', async () => {
    vi.mocked(authService.logout).mockResolvedValue({
      success: false,
      error: 'Logout failed',
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Logout failed');
    });
  });

  it('deve enviar solicitação de reset de senha com sucesso', async () => {
    vi.mocked(authService.resetPassword).mockResolvedValue({
      success: true,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Reset Password'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('no error');
    });
  });

  it('deve lidar com erro no reset de senha', async () => {
    vi.mocked(authService.resetPassword).mockResolvedValue({
      success: false,
      error: 'Reset password failed',
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Reset Password'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Reset password failed');
    });
  });

  it('deve atualizar senha com sucesso', async () => {
    vi.mocked(authService.updatePassword).mockResolvedValue({
      success: true,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Update Password'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('no error');
    });
  });

  it('deve lidar com erro na atualização de senha', async () => {
    vi.mocked(authService.updatePassword).mockResolvedValue({
      success: false,
      error: 'Update password failed',
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Update Password'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Update password failed');
    });
  });

  it('deve mostrar estado de carregamento durante operações', async () => {
    vi.mocked(authService.login).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
  });
}); 