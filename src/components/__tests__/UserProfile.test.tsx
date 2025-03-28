import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '../UserProfile';
import { useAuth } from '../../contexts/AuthContext';

// Mock do hook de autenticação
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    avatar_url: 'https://example.com/avatar.jpg',
  };

  const mockUpdateProfile = vi.fn();
  const mockUpdateAvatar = vi.fn();
  const mockChangePassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: mockUser,
      updateProfile: mockUpdateProfile,
      updateAvatar: mockUpdateAvatar,
      changePassword: mockChangePassword,
      isLoading: false,
      error: null,
    });
  });

  it('deve renderizar informações do usuário corretamente', () => {
    render(<UserProfile />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.role)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /avatar/i })).toHaveAttribute('src', mockUser.avatar_url);
  });

  it('deve permitir edição do nome', async () => {
    render(<UserProfile />);

    const editButton = screen.getByRole('button', { name: /editar nome/i });
    fireEvent.click(editButton);

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'New Name');

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        ...mockUser,
        name: 'New Name',
      });
    });
  });

  it('deve validar nome obrigatório', async () => {
    render(<UserProfile />);

    const editButton = screen.getByRole('button', { name: /editar nome/i });
    fireEvent.click(editButton);

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    await userEvent.clear(nameInput);

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    });

    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  it('deve permitir upload de novo avatar', async () => {
    render(<UserProfile />);

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    const input = screen.getByLabelText(/alterar avatar/i);

    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(mockUpdateAvatar).toHaveBeenCalledWith(file);
    });
  });

  it('deve validar tipo de arquivo do avatar', async () => {
    render(<UserProfile />);

    const file = new File(['invalid'], 'invalid.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/alterar avatar/i);

    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText(/tipo de arquivo inválido/i)).toBeInTheDocument();
    });

    expect(mockUpdateAvatar).not.toHaveBeenCalled();
  });

  it('deve permitir alteração de senha', async () => {
    render(<UserProfile />);

    const changePasswordButton = screen.getByRole('button', { name: /alterar senha/i });
    fireEvent.click(changePasswordButton);

    const currentPasswordInput = screen.getByLabelText(/senha atual/i);
    const newPasswordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(currentPasswordInput, 'currentPass123');
    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(confirmPasswordInput, 'newPass123!');

    const submitButton = screen.getByRole('button', { name: /salvar nova senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith({
        currentPassword: 'currentPass123',
        newPassword: 'newPass123!',
      });
    });
  });

  it('deve validar senhas diferentes', async () => {
    render(<UserProfile />);

    const changePasswordButton = screen.getByRole('button', { name: /alterar senha/i });
    fireEvent.click(changePasswordButton);

    const currentPasswordInput = screen.getByLabelText(/senha atual/i);
    const newPasswordInput = screen.getByLabelText(/nova senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(currentPasswordInput, 'currentPass123');
    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(confirmPasswordInput, 'differentPass123!');

    const submitButton = screen.getByRole('button', { name: /salvar nova senha/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/as senhas não conferem/i)).toBeInTheDocument();
    });

    expect(mockChangePassword).not.toHaveBeenCalled();
  });

  it('deve mostrar loading durante operações', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: mockUser,
      updateProfile: mockUpdateProfile,
      updateAvatar: mockUpdateAvatar,
      changePassword: mockChangePassword,
      isLoading: true,
      error: null,
    });

    render(<UserProfile />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar nome/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /alterar senha/i })).toBeDisabled();
  });

  it('deve mostrar mensagens de erro', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: mockUser,
      updateProfile: mockUpdateProfile,
      updateAvatar: mockUpdateAvatar,
      changePassword: mockChangePassword,
      isLoading: false,
      error: 'Erro ao atualizar perfil',
    });

    render(<UserProfile />);

    expect(screen.getByText('Erro ao atualizar perfil')).toBeInTheDocument();
  });

  it('deve cancelar edição do nome', async () => {
    render(<UserProfile />);

    const editButton = screen.getByRole('button', { name: /editar nome/i });
    fireEvent.click(editButton);

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'New Name');

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  it('deve fechar modal de alteração de senha', async () => {
    render(<UserProfile />);

    const changePasswordButton = screen.getByRole('button', { name: /alterar senha/i });
    fireEvent.click(changePasswordButton);

    expect(screen.getByText(/alterar senha/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/alterar senha/i)).not.toBeInTheDocument();
    });
  });
}); 