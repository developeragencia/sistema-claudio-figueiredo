import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';
import { useAuth } from '../../contexts/AuthContext';

// Mock do hook de autenticação
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = vi.fn();
  const mockResetPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      resetPassword: mockResetPassword,
      isLoading: false,
      error: null,
    });
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/esqueceu sua senha/i)).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('deve validar formato de e-mail', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    await userEvent.type(emailInput, 'email-invalido');

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('deve chamar login com credenciais corretas', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('deve mostrar erro de autenticação', () => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      resetPassword: mockResetPassword,
      isLoading: false,
      error: 'Credenciais inválidas',
    });

    render(<LoginForm />);

    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('deve mostrar loading durante autenticação', () => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      resetPassword: mockResetPassword,
      isLoading: true,
      error: null,
    });

    render(<LoginForm />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('deve abrir modal de reset de senha', async () => {
    render(<LoginForm />);

    const resetPasswordLink = screen.getByText(/esqueceu sua senha/i);
    fireEvent.click(resetPasswordLink);

    await waitFor(() => {
      expect(screen.getByText(/redefinir senha/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail para redefinição/i)).toBeInTheDocument();
    });
  });

  it('deve enviar solicitação de reset de senha', async () => {
    render(<LoginForm />);

    // Abrir modal de reset
    const resetPasswordLink = screen.getByText(/esqueceu sua senha/i);
    fireEvent.click(resetPasswordLink);

    // Preencher e enviar formulário
    const emailInput = screen.getByLabelText(/e-mail para redefinição/i);
    await userEvent.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });
  });

  it('deve validar e-mail no formulário de reset de senha', async () => {
    render(<LoginForm />);

    // Abrir modal de reset
    const resetPasswordLink = screen.getByText(/esqueceu sua senha/i);
    fireEvent.click(resetPasswordLink);

    // Tentar enviar sem preencher e-mail
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    });

    // Preencher e-mail inválido
    const emailInput = screen.getByLabelText(/e-mail para redefinição/i);
    await userEvent.type(emailInput, 'email-invalido');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('deve fechar modal de reset de senha', async () => {
    render(<LoginForm />);

    // Abrir modal
    const resetPasswordLink = screen.getByText(/esqueceu sua senha/i);
    fireEvent.click(resetPasswordLink);

    // Verificar se modal está aberto
    expect(screen.getByText(/redefinir senha/i)).toBeInTheDocument();

    // Fechar modal
    const closeButton = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeButton);

    // Verificar se modal foi fechado
    await waitFor(() => {
      expect(screen.queryByText(/redefinir senha/i)).not.toBeInTheDocument();
    });
  });

  it('deve limpar campos após envio bem-sucedido', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  it('deve manter campos preenchidos após erro', async () => {
    mockLogin.mockRejectedValue(new Error('Erro de autenticação'));

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  });
}); 