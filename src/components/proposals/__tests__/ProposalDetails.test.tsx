import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProposalDetails from '../ProposalDetails';
import { useProposal, useUpdateProposalStatus, useConvertToContract } from '@/hooks/useProposals';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Mock dos hooks
vi.mock('@/hooks/useProposals', () => ({
  useProposal: vi.fn(),
  useUpdateProposalStatus: vi.fn(),
  useConvertToContract: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockProposal = {
  id: '1',
  title: 'Proposta Teste',
  description: 'Descrição da proposta',
  client: {
    razaoSocial: 'Cliente Teste',
  },
  totalValue: 1000,
  status: 'PENDING',
  createdAt: '2024-01-01T00:00:00.000Z',
  validUntil: '2024-12-31T00:00:00.000Z',
  attachments: [
    {
      name: 'documento.pdf',
      url: 'http://exemplo.com/documento.pdf',
    },
  ],
};

describe('ProposalDetails', () => {
  const mockUpdateStatus = vi.fn();
  const mockConvertToContract = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useProposal as jest.Mock).mockReturnValue({
      data: mockProposal,
      isLoading: false,
    });
    (useUpdateProposalStatus as jest.Mock).mockReturnValue({
      mutate: mockUpdateStatus,
    });
    (useConvertToContract as jest.Mock).mockReturnValue({
      mutate: mockConvertToContract,
    });
  });

  it('deve renderizar os detalhes da proposta corretamente', () => {
    render(<ProposalDetails proposalId="1" />);

    expect(screen.getByText('Proposta Teste')).toBeInTheDocument();
    expect(screen.getByText('Cliente Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();
    expect(screen.getByText('Descrição da proposta')).toBeInTheDocument();
  });

  it('deve mostrar loading state', () => {
    (useProposal as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<ProposalDetails proposalId="1" />);

    expect(screen.getByText('Carregando detalhes da proposta...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando proposta não for encontrada', () => {
    (useProposal as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<ProposalDetails proposalId="1" />);

    expect(screen.getByText('Proposta não encontrada')).toBeInTheDocument();
  });

  it('deve mostrar botões de aprovação para cliente quando proposta estiver pendente', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'CLIENT' },
    });

    render(<ProposalDetails proposalId="1" />);

    expect(screen.getByText('Aprovar')).toBeInTheDocument();
    expect(screen.getByText('Rejeitar')).toBeInTheDocument();
  });

  it('deve mostrar botão de converter para contrato para admin quando proposta estiver aprovada', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'MASTER_ADMIN' },
    });
    (useProposal as jest.Mock).mockReturnValue({
      data: { ...mockProposal, status: 'APPROVED' },
      isLoading: false,
    });

    render(<ProposalDetails proposalId="1" />);

    expect(screen.getByText('Converter em Contrato')).toBeInTheDocument();
  });

  it('deve chamar updateStatus ao aprovar proposta', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'CLIENT' },
    });

    render(<ProposalDetails proposalId="1" />);

    const approveButton = screen.getByText('Aprovar');
    fireEvent.click(approveButton);

    expect(mockUpdateStatus).toHaveBeenCalledWith(
      { proposalId: '1', status: 'APPROVED' },
      expect.any(Object)
    );
  });

  it('deve chamar updateStatus ao rejeitar proposta', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'CLIENT' },
    });

    render(<ProposalDetails proposalId="1" />);

    const rejectButton = screen.getByText('Rejeitar');
    fireEvent.click(rejectButton);

    expect(mockUpdateStatus).toHaveBeenCalledWith(
      { proposalId: '1', status: 'REJECTED' },
      expect.any(Object)
    );
  });

  it('deve chamar convertToContract ao converter proposta', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'MASTER_ADMIN' },
    });
    (useProposal as jest.Mock).mockReturnValue({
      data: { ...mockProposal, status: 'APPROVED' },
      isLoading: false,
    });

    render(<ProposalDetails proposalId="1" />);

    const convertButton = screen.getByText('Converter em Contrato');
    fireEvent.click(convertButton);

    expect(mockConvertToContract).toHaveBeenCalledWith(
      { proposalId: '1' },
      expect.any(Object)
    );
  });

  it('deve renderizar anexos corretamente', () => {
    render(<ProposalDetails proposalId="1" />);

    expect(screen.getByText('documento.pdf')).toBeInTheDocument();
    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toHaveAttribute('href', 'http://exemplo.com/documento.pdf');
  });

  it('deve mostrar toast de sucesso ao aprovar proposta', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'CLIENT' },
    });
    mockUpdateStatus.mockImplementation((_, { onSuccess }) => onSuccess());

    render(<ProposalDetails proposalId="1" />);

    const approveButton = screen.getByText('Aprovar');
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Status da proposta atualizado com sucesso');
    });
  });

  it('deve mostrar toast de erro ao falhar aprovação', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'CLIENT' },
    });
    mockUpdateStatus.mockImplementation((_, { onError }) => onError());

    render(<ProposalDetails proposalId="1" />);

    const approveButton = screen.getByText('Aprovar');
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar status da proposta');
    });
  });
}); 