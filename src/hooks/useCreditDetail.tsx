
import { useState } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { HistoryItem } from '@/types/declarations';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  size: string;
  date: string;
}

export const useCreditDetail = (creditId: string) => {
  const [loading, setLoading] = useState(false);
  
  // Sample documents for the credit
  const documents: Document[] = [
    {
      id: 'doc-1',
      name: 'Declaração PIS/COFINS.pdf',
      size: '2.4 MB',
      date: '2023-02-15T10:30:00Z'
    },
    {
      id: 'doc-2',
      name: 'Planilha de Cálculos.xlsx',
      size: '1.8 MB',
      date: '2023-02-10T14:45:00Z'
    },
    {
      id: 'doc-3',
      name: 'Relatório de Análise.pdf',
      size: '3.1 MB',
      date: '2023-03-01T09:15:00Z'
    }
  ];
  
  // Sample history items
  const history: HistoryItem[] = [
    {
      id: 'hist-1',
      action: 'Crédito submetido para aprovação',
      date: '2023-01-15T10:45:00Z',
      user: 'João Silva',
      status: 'PENDING'
    },
    {
      id: 'hist-2',
      action: 'Documentação complementar solicitada',
      date: '2023-02-05T11:30:00Z',
      user: 'Maria Oliveira',
      status: 'PROCESSING'
    },
    {
      id: 'hist-3',
      action: 'Crédito aprovado',
      date: '2023-03-02T14:30:00Z',
      user: 'Pedro Santos',
      status: 'APPROVED'
    }
  ];
  
  // Example tax credit with properly typed fields
  const creditDetail: TaxCredit = {
    id: creditId,
    clientId: 'client-1',
    clientName: 'Empresa XYZ',
    documentNumber: '12.345.678/0001-99',
    creditType: 'PIS/COFINS',
    creditAmount: 120000.50,
    originalAmount: 150000.00,
    periodStart: '2022-01-01',
    periodEnd: '2022-12-31',
    status: 'APPROVED',
    submittedAt: '2023-01-15T10:45:00Z',
    approvedAt: '2023-03-02T14:30:00Z',
    createdAt: '2023-01-10T08:30:00Z',
    updatedAt: '2023-03-02T14:30:00Z',
    notes: 'Crédito aprovado após verificação de documentação completa.',
    attachmentsCount: 5
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatDateTime = (dateString: string | Date) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };
  
  const handleEditCredit = () => {
    toast.info('Editar crédito', {
      description: `Abrindo formulário para editar crédito #${creditId}`,
    });
  };
  
  const handleStatusChange = () => {
    toast.info('Alterar status', {
      description: `Abrindo formulário para alterar status do crédito #${creditId}`,
    });
  };
  
  const handleExportReport = () => {
    toast.success('Exportação iniciada', {
      description: `O relatório do crédito #${creditId} está sendo gerado`,
    });
  };
  
  const handleDeleteCredit = () => {
    toast.warning('Confirmar exclusão', {
      description: `Você está prestes a excluir o crédito #${creditId}`,
    });
  };
  
  return {
    credit: creditDetail,
    documents,
    history,
    loading,
    isLoading: loading,
    formatCurrency,
    formatDate,
    formatDateTime,
    handleEditCredit,
    handleStatusChange,
    handleExportReport,
    handleDeleteCredit
  };
};

export default useCreditDetail;
