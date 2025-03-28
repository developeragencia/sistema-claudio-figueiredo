import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from '../ResetPasswordForm';
import { useAuth } from '../../contexts/AuthContext';
import { validatePassword } from '../../lib/passwordValidation';

// Mock dos hooks e funções
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../lib/passwordValidation', () => ({
  validatePassword: vi.fn(),
}));

describe('ResetPasswordForm', () => {
  const mockUpdatePassword = vi.fn();
  const mockToken = 'reset-token-123';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      updatePassword: mockUpdatePassword,
      isLoading: false,
      error: null,
    });
    vi.mocked(validatePassword).mockReturnValue({
      isValid: true,
      errors: [],
    });
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<ResetPasswordForm token={mockToken} />);

    expect(screen.getByLabelText(/nova senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /redefinir senha/i })).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', async () => {
    render(<ResetPasswordForm token={mockToken} />);

    const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nova senha é obrigatória/i)).toBeInTheDocument();
      expect(screen.getByText(/confirmação de senha é obrigatória/i)).toBeInTheDocument();
    });

    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('deve validar senhas diferentes', async () => {
    render(<ResetPasswordForm token={mockToken} />);

    const passwordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password456');

    const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/as senhas não conferem/i)).toBeInTheDocument();
    });

    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('deve validar força da senha', async () => {
    vi.mocked(validatePassword).mockReturnValue({
      isValid: false,
      errors: ['A senha deve conter pelo menos um número'],
    });

    render(<ResetPasswordForm token={mockToken} />);

    const passwordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(passwordInput, 'weakpassword');
    await userEvent.type(confirmPasswordInput, 'weakpassword');

    const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/a senha deve conter pelo menos um número/i)).toBeInTheDocument();
    });

    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('deve atualizar senha com sucesso', async () => {
    render(<ResetPasswordForm token={mockToken} />);

    const passwordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(passwordInput, 'StrongPass123!');
    await userEvent.type(confirmPasswordInput, 'StrongPass123!');

    const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith({
        password: 'StrongPass123!',
        token: mockToken,
      });
    });
  });

  it('deve mostrar indicador de força da senha', async () => {
    render(<ResetPasswordForm token={mockToken} />);

    const passwordInput = screen.getByLabelText(/nova senha/i);

    // Senha fraca
    await userEvent.type(passwordInput, 'weak');
    expect(screen.getByText(/fraca/i)).toBeInTheDocument();

    // Senha forte
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongPass123!');
    expect(screen.getByText(/forte/i)).toBeInTheDocument();
  });

  it('deve mostrar erro de atualização', () => {
    vi.mocked(useAuth).mockReturnValue({
      updatePassword: mockUpdatePassword,
      isLoading: false,
      error: 'Erro ao atualizar senha',
    });

    render(<ResetPasswordForm token={mockToken} />);

    expect(screen.getByText('Erro ao atualizar senha')).toBeInTheDocument();
  });

  it('deve mostrar loading durante atualização', () => {
    vi.mocked(useAuth).mockReturnValue({
      updatePassword: mockUpdatePassword,
      isLoading: true,
      error: null,
    });

    render(<ResetPasswordForm token={mockToken} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /redefinir senha/i })).toBeDisabled();
  });

  it('deve limpar campos após atualização bem-sucedida', async () => {
    mockUpdatePassword.mockResolvedValue({ success: true });

    render(<ResetPasswordForm token={mockToken} />);

    const passwordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(passwordInput, 'StrongPass123!');
    await userEvent.type(confirmPasswordInput, 'StrongPass123!');

    const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(passwordInput).toHaveValue('');
      expect(confirmPasswordInput).toHaveValue('');
    });
  });

  it('deve manter campos preenchidos após erro', async () => {
    mockUpdatePassword.mockRejectedValue(new Error('Erro ao atualizar senha'));

    render(<ResetPasswordForm token={mockToken} />);

    const passwordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(passwordInput, 'StrongPass123!');
    await userEvent.type(confirmPasswordInput, 'StrongPass123!');

    const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(passwordInput).toHaveValue('StrongPass123!');
      expect(confirmPasswordInput).toHaveValue('StrongPass123!');
    });
  });
}); 