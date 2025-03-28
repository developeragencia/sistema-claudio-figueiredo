import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProposalFilters from '../ProposalFilters';
import { useClients } from '@/hooks/useClients';
import { useAuth } from '@/hooks/useAuth';

// Mock dos hooks
vi.mock('@/hooks/useClients', () => ({
  useClients: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
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

describe('ProposalFilters', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'MASTER_ADMIN' },
    });
    (useClients as jest.Mock).mockReturnValue({
      data: mockClients,
      isLoading: false,
    });
  });

  it('deve renderizar todos os filtros para admin', () => {
    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByPlaceholderText('Buscar propostas...')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Data inicial')).toBeInTheDocument();
    expect(screen.getByText('Data final')).toBeInTheDocument();
  });

  it('não deve mostrar seletor de cliente para usuário CLIENT', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'CLIENT' },
    });

    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.queryByText('Cliente')).not.toBeInTheDocument();
  });

  it('deve chamar onFilterChange ao digitar na busca', async () => {
    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    const searchInput = screen.getByPlaceholderText('Buscar propostas...');
    fireEvent.change(searchInput, { target: { value: 'teste' } });

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'teste',
        })
      );
    });
  });

  it('deve chamar onFilterChange ao selecionar status', async () => {
    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    const statusSelect = screen.getByText('Todos os status');
    fireEvent.click(statusSelect);
    
    const pendingOption = screen.getByText('Pendente');
    fireEvent.click(pendingOption);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ['PENDING'],
        })
      );
    });
  });

  it('deve chamar onFilterChange ao selecionar cliente', async () => {
    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    const clientSelect = screen.getByText('Todos os clientes');
    fireEvent.click(clientSelect);
    
    const clientOption = screen.getByText('Cliente 1');
    fireEvent.click(clientOption);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          clientId: '1',
        })
      );
    });
  });

  it('deve limpar todos os filtros ao clicar no botão limpar', async () => {
    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    // Aplica alguns filtros
    const searchInput = screen.getByPlaceholderText('Buscar propostas...');
    fireEvent.change(searchInput, { target: { value: 'teste' } });

    const clearButton = screen.getByText('Limpar filtros');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({});
      expect(searchInput).toHaveValue('');
    });
  });

  it('deve desabilitar seletor de cliente durante carregamento', () => {
    (useClients as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    render(<ProposalFilters onFilterChange={mockOnFilterChange} />);

    const clientSelect = screen.getByRole('combobox', { name: /cliente/i });
    expect(clientSelect).toBeDisabled();
  });
}); 