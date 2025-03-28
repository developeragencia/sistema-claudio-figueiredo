import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProposalList from '../ProposalList';
import { useProposals } from '@/hooks/useProposals';
import { useAuth } from '@/hooks/useAuth';

expect.extend(toHaveNoViolations);

// Mock dos hooks
vi.mock('@/hooks/useProposals', () => ({
  useProposals: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockProposals = [
  {
    id: '1',
    title: 'Proposta 1',
    description: 'Descrição da proposta 1',
    client: {
      id: '1',
      razaoSocial: 'Cliente 1',
    },
    totalValue: 1000,
    status: 'PENDING',
    createdAt: '2024-01-01T00:00:00.000Z',
    validUntil: '2024-12-31T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Proposta 2',
    description: 'Descrição da proposta 2',
    client: {
      id: '2',
      razaoSocial: 'Cliente 2',
    },
    totalValue: 2000,
    status: 'APPROVED',
    createdAt: '2024-01-02T00:00:00.000Z',
    validUntil: '2024-12-31T00:00:00.000Z',
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('ProposalList - Testes de Acessibilidade', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'MASTER_ADMIN' },
    });
    (useProposals as jest.Mock).mockReturnValue({
      data: mockProposals,
      isLoading: false,
    });
  });

  it('não deve ter violações de acessibilidade', async () => {
    const { container } = render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('deve ter cabeçalhos de tabela com roles e escopos corretos', () => {
    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(6); // Título, Cliente, Valor, Status, Data, Ações

    headers.forEach(header => {
      expect(header).toHaveAttribute('scope', 'col');
    });
  });

  it('deve ter células de dados com roles corretos', () => {
    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('deve ter botões com nomes acessíveis', () => {
    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });

  it('deve ter status com roles e textos apropriados', () => {
    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const statusBadges = screen.getAllByRole('status');
    expect(statusBadges).toHaveLength(mockProposals.length);

    statusBadges.forEach((badge, index) => {
      const status = mockProposals[index].status;
      expect(badge).toHaveTextContent(status === 'PENDING' ? 'Pendente' : 'Aprovada');
    });
  });

  it('deve ter uma tabela com caption para descrição', () => {
    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Lista de Propostas');
  });

  it('deve ter links de navegação acessíveis', () => {
    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
      expect(link).toHaveAttribute('href');
    });
  });

  it('deve ter mensagem de carregamento acessível', () => {
    (useProposals as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const loadingMessage = screen.getByRole('alert');
    expect(loadingMessage).toHaveTextContent('Carregando propostas...');
  });

  it('deve ter mensagem de erro acessível', () => {
    (useProposals as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Erro ao carregar propostas'),
    });

    render(
      <TestWrapper>
        <ProposalList />
      </TestWrapper>
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Erro ao carregar propostas');
  });
}); 