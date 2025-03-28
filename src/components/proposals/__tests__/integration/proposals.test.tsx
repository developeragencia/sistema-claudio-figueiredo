import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ProposalList from '../../ProposalList';
import ProposalFilters from '../../ProposalFilters';
import ProposalDetails from '../../ProposalDetails';
import ProposalForm from '../../ProposalForm';
import { useAuth } from '@/hooks/useAuth';
import { useProposals, useProposal, useCreateProposal, useUpdateProposal } from '@/hooks/useProposals';
import { useClients } from '@/hooks/useClients';
import { toast } from 'sonner';
import type { ProposalFormData } from '@/types/proposal';

// Mock dos hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/hooks/useProposals', () => ({
  useProposals: vi.fn(),
  useProposal: vi.fn(),
  useCreateProposal: vi.fn(),
  useUpdateProposal: vi.fn(),
}));

vi.mock('@/hooks/useClients', () => ({
  useClients: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
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

describe('Propostas - Testes de Integração', () => {
  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'MASTER_ADMIN', id: '1' },
    });
    (useClients as jest.Mock).mockReturnValue({
      data: mockClients,
      isLoading: false,
    });
  });

  describe('Fluxo de Listagem e Filtragem', () => {
    beforeEach(() => {
      (useProposals as jest.Mock).mockReturnValue({
        data: mockProposals,
        isLoading: false,
      });
    });

    it('deve listar propostas e aplicar filtros', async () => {
      render(
        <TestWrapper>
          <>
            <ProposalFilters onFilterChange={() => {}} />
            <ProposalList />
          </>
        </TestWrapper>
      );

      // Verifica se as propostas são exibidas
      expect(screen.getByText('Proposta 1')).toBeInTheDocument();
      expect(screen.getByText('Proposta 2')).toBeInTheDocument();

      // Aplica filtro de busca
      const searchInput = screen.getByPlaceholderText('Buscar propostas...');
      fireEvent.change(searchInput, { target: { value: 'Proposta 1' } });

      // Aplica filtro de status
      const statusSelect = screen.getByText('Todos os status');
      fireEvent.click(statusSelect);
      const pendingOption = screen.getByText('Pendente');
      fireEvent.click(pendingOption);

      await waitFor(() => {
        expect(useProposals).toHaveBeenCalledWith(
          expect.objectContaining({
            search: 'Proposta 1',
            status: ['PENDING'],
          })
        );
      });
    });
  });

  describe('Fluxo de Criação de Proposta', () => {
    const mockCreateProposal = vi.fn();

    beforeEach(() => {
      (useCreateProposal as jest.Mock).mockReturnValue({
        mutate: mockCreateProposal,
        isLoading: false,
      });
    });

    it('deve criar uma nova proposta com sucesso', async () => {
      mockCreateProposal.mockImplementation((data: ProposalFormData, { onSuccess }: { onSuccess: () => void }) => onSuccess());

      render(
        <TestWrapper>
          <ProposalForm onSuccess={() => {}} />
        </TestWrapper>
      );

      // Preenche o formulário
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

      // Submete o formulário
      const submitButton = screen.getByText('Criar Proposta');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateProposal).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('Proposta criada com sucesso');
      });
    });
  });

  describe('Fluxo de Visualização e Edição', () => {
    const mockUpdateProposal = vi.fn();

    beforeEach(() => {
      (useProposal as jest.Mock).mockReturnValue({
        data: mockProposals[0],
        isLoading: false,
      });
      (useUpdateProposal as jest.Mock).mockReturnValue({
        mutate: mockUpdateProposal,
        isLoading: false,
      });
    });

    it('deve visualizar e editar uma proposta existente', async () => {
      mockUpdateProposal.mockImplementation((_, { onSuccess }) => onSuccess());

      render(
        <TestWrapper>
          <>
            <ProposalDetails proposalId="1" />
            <ProposalForm
              proposal={mockProposals[0]}
              onSuccess={() => {}}
            />
          </>
        </TestWrapper>
      );

      // Verifica se os detalhes são exibidos
      expect(screen.getByText('Proposta 1')).toBeInTheDocument();
      expect(screen.getByText('Cliente 1')).toBeInTheDocument();
      expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();

      // Edita a proposta
      const titleInput = screen.getByDisplayValue('Proposta 1');
      fireEvent.change(titleInput, {
        target: { value: 'Proposta Atualizada' },
      });

      const submitButton = screen.getByText('Atualizar Proposta');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateProposal).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('Proposta atualizada com sucesso');
      });
    });
  });

  describe('Fluxo de Navegação', () => {
    beforeEach(() => {
      (useProposals as jest.Mock).mockReturnValue({
        data: mockProposals,
        isLoading: false,
      });
    });

    it('deve navegar entre as páginas corretamente', async () => {
      render(
        <TestWrapper>
          <ProposalList />
        </TestWrapper>
      );

      // Clica no botão de ver detalhes
      const viewButtons = screen.getAllByText('Ver detalhes');
      fireEvent.click(viewButtons[0]);

      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/proposals/1');
      });
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve exibir mensagens de erro apropriadas', async () => {
      const mockCreateProposalWithError = vi.fn().mockImplementation((_, { onError }) => onError());
      (useCreateProposal as jest.Mock).mockReturnValue({
        mutate: mockCreateProposalWithError,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <ProposalForm onSuccess={() => {}} />
        </TestWrapper>
      );

      // Tenta submeter o formulário sem preencher os campos obrigatórios
      const submitButton = screen.getByText('Criar Proposta');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('O título é obrigatório')).toBeInTheDocument();
        expect(screen.getByText('A descrição é obrigatória')).toBeInTheDocument();
        expect(screen.getByText('O cliente é obrigatório')).toBeInTheDocument();
      });

      // Preenche o formulário e força um erro no servidor
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

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao criar proposta');
      });
    });
  });
}); 