import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProposalForm from '../ProposalForm';
import { useClients } from '@/hooks/useClients';
import { useAuth } from '@/hooks/useAuth';
import { useCreateProposal, useUpdateProposal } from '@/hooks/useProposals';
import { toast } from 'sonner';

// Mock dos hooks
vi.mock('@/hooks/useClients', () => ({
  useClients: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/hooks/useProposals', () => ({
  useCreateProposal: vi.fn(),
  useUpdateProposal: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockClients = [
  {
    id: '1',
    razaoSocial: 'Cliente 1',
  },
  {
    id: '2',
    razaoSocial: 'Cliente 2',
  },
];

describe('ProposalForm', () => {
  const mockOnSuccess = vi.fn();
  const mockCreateProposal = vi.fn();
  const mockUpdateProposal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'MASTER_ADMIN' },
    });
    (useClients as jest.Mock).mockReturnValue({
      data: mockClients,
      isLoading: false,
    });
    (useCreateProposal as jest.Mock).mockReturnValue({
      mutate: mockCreateProposal,
      isLoading: false,
    });
    (useUpdateProposal as jest.Mock).mockReturnValue({
      mutate: mockUpdateProposal,
      isLoading: false,
    });
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<ProposalForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText('Título')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição')).toBeInTheDocument();
    expect(screen.getByLabelText('Cliente')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor Total')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de Validade')).toBeInTheDocument();
    expect(screen.getByText('Anexos')).toBeInTheDocument();
  });

  it('deve preencher o formulário com dados existentes para edição', () => {
    const existingProposal = {
      id: '1',
      title: 'Proposta Existente',
      description: 'Descrição da proposta',
      clientId: '1',
      totalValue: 1000,
      validUntil: '2024-12-31T00:00:00.000Z',
    };

    render(<ProposalForm proposal={existingProposal} onSuccess={mockOnSuccess} />);

    expect(screen.getByDisplayValue('Proposta Existente')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Descrição da proposta')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
  });

  it('deve mostrar erros de validação', async () => {
    render(<ProposalForm onSuccess={mockOnSuccess} />);

    const submitButton = screen.getByText('Criar Proposta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('O título é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('A descrição é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('O cliente é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('O valor total deve ser maior que zero')).toBeInTheDocument();
    });
  });

  it('deve criar uma nova proposta com sucesso', async () => {
    mockCreateProposal.mockImplementation((_, { onSuccess }) => onSuccess());

    render(<ProposalForm onSuccess={mockOnSuccess} />);

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText('Título'), {
      target: { value: 'Nova Proposta' },
    });
    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Descrição da nova proposta' },
    });
    
    // Seleciona o cliente
    const clientSelect = screen.getByLabelText('Cliente');
    fireEvent.click(clientSelect);
    fireEvent.click(screen.getByText('Cliente 1'));

    fireEvent.change(screen.getByLabelText('Valor Total'), {
      target: { value: '1000' },
    });

    const submitButton = screen.getByText('Criar Proposta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateProposal).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Proposta criada com sucesso');
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('deve atualizar uma proposta existente com sucesso', async () => {
    mockUpdateProposal.mockImplementation((_, { onSuccess }) => onSuccess());

    const existingProposal = {
      id: '1',
      title: 'Proposta Existente',
      description: 'Descrição da proposta',
      clientId: '1',
      totalValue: 1000,
      validUntil: '2024-12-31T00:00:00.000Z',
    };

    render(<ProposalForm proposal={existingProposal} onSuccess={mockOnSuccess} />);

    // Modifica alguns campos
    fireEvent.change(screen.getByLabelText('Título'), {
      target: { value: 'Proposta Atualizada' },
    });

    const submitButton = screen.getByText('Atualizar Proposta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProposal).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Proposta atualizada com sucesso');
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('deve lidar com erro ao criar proposta', async () => {
    mockCreateProposal.mockImplementation((_, { onError }) => onError());

    render(<ProposalForm onSuccess={mockOnSuccess} />);

    // Preenche o formulário com dados válidos
    fireEvent.change(screen.getByLabelText('Título'), {
      target: { value: 'Nova Proposta' },
    });
    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Descrição da nova proposta' },
    });
    
    const clientSelect = screen.getByLabelText('Cliente');
    fireEvent.click(clientSelect);
    fireEvent.click(screen.getByText('Cliente 1'));

    fireEvent.change(screen.getByLabelText('Valor Total'), {
      target: { value: '1000' },
    });

    const submitButton = screen.getByText('Criar Proposta');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao criar proposta');
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it('deve permitir upload de arquivos', async () => {
    render(<ProposalForm onSuccess={mockOnSuccess} />);

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-upload');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
  });

  it('deve permitir remover arquivos', async () => {
    render(<ProposalForm onSuccess={mockOnSuccess} />);

    // Adiciona um arquivo
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-upload');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    // Remove o arquivo
    await waitFor(() => {
      const removeButton = screen.getByLabelText('Remover arquivo');
      fireEvent.click(removeButton);
      expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
    });
  });

  it('deve desabilitar o formulário durante o envio', () => {
    (useCreateProposal as jest.Mock).mockReturnValue({
      mutate: mockCreateProposal,
      isLoading: true,
    });

    render(<ProposalForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText('Título')).toBeDisabled();
    expect(screen.getByLabelText('Descrição')).toBeDisabled();
    expect(screen.getByLabelText('Cliente')).toBeDisabled();
    expect(screen.getByLabelText('Valor Total')).toBeDisabled();
    expect(screen.getByText('Criar Proposta')).toBeDisabled();
  });
}); 