import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProposalList from '../ProposalList';
import { useProposals } from '@/hooks/useProposals';
import { ProposalStatus } from '@/types/proposal';

// Mock dos hooks
vi.mock('@/hooks/useProposals', () => ({
  useProposals: vi.fn(),
}));

const mockProposals = [
  {
    id: '1',
    title: 'Proposta 1',
    client: {
      razaoSocial: 'Cliente 1',
    },
    totalValue: 1000,
    status: 'PENDING' as ProposalStatus,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Proposta 2',
    client: {
      razaoSocial: 'Cliente 2',
    },
    totalValue: 2000,
    status: 'APPROVED' as ProposalStatus,
    createdAt: '2024-01-02T00:00:00.000Z',
  },
];

describe('ProposalList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar a lista de propostas corretamente', () => {
    (useProposals as jest.Mock).mockReturnValue({
      data: mockProposals,
      isLoading: false,
    });

    render(<ProposalList />);

    expect(screen.getByText('Proposta 1')).toBeInTheDocument();
    expect(screen.getByText('Cliente 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();
    expect(screen.getByText('Pendente')).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não houver propostas', () => {
    (useProposals as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<ProposalList />);

    expect(screen.getByText('Nenhuma proposta encontrada.')).toBeInTheDocument();
  });

  it('deve mostrar loading state', () => {
    (useProposals as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<ProposalList />);

    expect(screen.getAllByTestId('proposal-loading-row')).toHaveLength(5);
  });

  it('deve aplicar filtros corretamente', () => {
    const mockUseProposals = vi.fn().mockReturnValue({
      data: mockProposals,
      isLoading: false,
    });
    (useProposals as jest.Mock).mockImplementation(mockUseProposals);

    const filters = {
      status: ['PENDING'] as ProposalStatus[],
      clientId: '1',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    };

    render(<ProposalList filters={filters} />);

    expect(mockUseProposals).toHaveBeenCalledWith(expect.objectContaining(filters));
  });

  it('deve permitir navegação para detalhes da proposta', () => {
    (useProposals as jest.Mock).mockReturnValue({
      data: mockProposals,
      isLoading: false,
    });

    render(<ProposalList />);

    const viewButtons = screen.getAllByText('Ver detalhes');
    fireEvent.click(viewButtons[0]);

    // Verifica se a navegação foi acionada
    expect(window.location.pathname).toContain('/proposals/1');
  });
}); 