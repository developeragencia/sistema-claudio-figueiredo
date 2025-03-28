
import { useState } from 'react';
import { Declaration, StatusType, DeclarationDetails, Attachment, HistoryItem } from '@/types/declarations';

export const useDeclarationData = (id?: string) => {
  const [declarations, setDeclarations] = useState<Declaration[]>([
    {
      id: '1',
      title: 'Declaração de Imposto de Renda 2023',
      description: 'Declaração anual de IR da empresa XYZ',
      status: 'PENDING',
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: '2023-01-16T14:20:00Z',
      clientId: 'client-1',
      clientName: 'Empresa XYZ Ltda',
      documentNumber: '12.345.678/0001-99',
      fiscalYear: '2022',
      fiscalPeriod: 'Anual',
      deadline: '2023-04-30T23:59:59Z',
      assignedTo: 'João Silva',
      taxType: 'IRPJ',
      amount: 25000.00,
      attachmentsCount: 5
    },
    {
      id: '2',
      title: 'Declaração de ICMS Janeiro/2023',
      status: 'COMPLETED',
      createdAt: '2023-02-05T09:15:00Z',
      clientId: 'client-2',
      clientName: 'Comércio ABC S/A',
      documentNumber: '98.765.432/0001-10',
      fiscalYear: '2023',
      fiscalPeriod: 'Janeiro',
      assignedTo: 'Maria Oliveira',
      taxType: 'ICMS',
      amount: 12350.75,
      attachmentsCount: 3
    },
    {
      id: '3',
      title: 'Declaração de PIS/COFINS 1º Trimestre',
      description: 'Declaração trimestral de PIS/COFINS',
      status: 'PROCESSING',
      createdAt: '2023-03-10T11:45:00Z',
      clientId: 'client-1',
      clientName: 'Empresa XYZ Ltda',
      documentNumber: '12.345.678/0001-99',
      fiscalYear: '2023',
      fiscalPeriod: '1º Trimestre',
      deadline: '2023-04-15T23:59:59Z',
      taxType: 'PIS/COFINS',
      amount: 18750.25,
      attachmentsCount: 2
    }
  ]);

  // Sample attachments
  const sampleAttachments: Attachment[] = [
    {
      id: 'att-1',
      fileName: 'Declaração IRPJ.pdf',
      fileSize: 1024000,
      fileType: 'application/pdf',
      uploadedAt: '2023-01-20T14:30:00Z',
      uploadedBy: 'João Silva',
      downloadUrl: '/downloads/declaration-irpj.pdf',
      name: 'Declaração IRPJ.pdf',
      size: '1 MB',
      date: '2023-01-20T14:30:00Z'
    },
    {
      id: 'att-2',
      fileName: 'Comprovantes.zip',
      fileSize: 3072000,
      fileType: 'application/zip',
      uploadedAt: '2023-01-25T10:15:00Z',
      uploadedBy: 'Maria Oliveira',
      downloadUrl: '/downloads/receipts.zip',
      name: 'Comprovantes.zip',
      size: '3 MB',
      date: '2023-01-25T10:15:00Z'
    },
    {
      id: 'att-3',
      fileName: 'Balanço Patrimonial.xlsx',
      fileSize: 512000,
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadedAt: '2023-01-30T09:45:00Z',
      uploadedBy: 'Carlos Souza',
      downloadUrl: '/downloads/balance-sheet.xlsx',
      name: 'Balanço Patrimonial.xlsx',
      size: '500 KB',
      date: '2023-01-30T09:45:00Z'
    }
  ];

  // Sample history items
  const sampleHistory: HistoryItem[] = [
    {
      id: 'hist-1',
      action: 'Declaração criada',
      date: '2023-01-15T10:30:00Z',
      user: 'João Silva',
      status: 'PENDING'
    },
    {
      id: 'hist-2',
      action: 'Documentos anexados',
      date: '2023-01-20T14:30:00Z',
      user: 'Maria Oliveira',
      details: 'Adicionados 3 documentos'
    },
    {
      id: 'hist-3',
      action: 'Em processamento',
      date: '2023-01-25T09:15:00Z',
      user: 'Sistema',
      status: 'PROCESSING'
    }
  ];

  // Sample declaration details with title property
  const declarationDetail: DeclarationDetails = {
    id: id || '1',
    title: 'Declaração de Imposto de Renda 2022', // Ensure title property is here
    type: 'Declaração de Imposto de Renda',
    status: 'PENDING',
    periodName: 'Anual 2022',
    fiscalYear: '2022',
    dueDate: '2023-04-30T23:59:59Z',
    submissionDate: '2023-01-15T10:30:00Z',
    protocol: 'IRPJ2022123456789',
    amount: 'R$ 25.000,00',
    taxOffice: 'Delegacia da Receita Federal São Paulo',
    submittedBy: 'João Silva',
    company: 'Empresa XYZ Ltda',
    cnpj: '12.345.678/0001-99',
    attachments: sampleAttachments,
    history: sampleHistory
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeclarations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Data is already set in useState
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar declarações');
      setLoading(false);
    }
  };

  const updateDeclarationStatus = (id: string, status: StatusType) => {
    setDeclarations(prev => 
      prev.map(decl => 
        decl.id === id ? { ...decl, status, updatedAt: new Date().toISOString() } : decl
      )
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return { 
    declarations, 
    declaration: declarationDetail,
    loading, 
    error, 
    fetchDeclarations,
    updateDeclarationStatus,
    formatDate
  };
};
