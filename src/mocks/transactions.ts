import { Transaction } from '@/types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Recuperação de crédito IRRF',
    type: 'IRRF',
    value: 5432.10,
    date: '2023-10-15',
    dueDate: '2023-11-15',
    status: 'completed',
    documentNumber: 'DCOMP-123456',
    clientId: '1',
    clientName: 'Empresa ACME Ltda',
    processingDate: '2023-10-18',
    notes: 'Crédito verificado e homologado pela Receita Federal'
  },
  {
    id: '2',
    description: 'Recuperação de crédito PIS',
    type: 'PIS',
    value: 2145.85,
    date: '2023-10-10',
    dueDate: '2023-11-10',
    status: 'processing',
    documentNumber: 'DCOMP-123457',
    clientId: '2',
    clientName: 'Indústrias XYZ S/A',
    processingDate: null,
    notes: 'Aguardando homologação da Receita Federal'
  },
  {
    id: '3',
    description: 'Recuperação de crédito COFINS',
    type: 'COFINS',
    value: 8752.35,
    date: '2023-10-05',
    dueDate: '2023-11-05',
    status: 'completed',
    documentNumber: 'DCOMP-123458',
    clientId: '3',
    clientName: 'Tech Solutions Brasil',
    processingDate: '2023-10-12',
    notes: 'Crédito verificado e homologado pela Receita Federal'
  },
  {
    id: '4',
    description: 'Recuperação de crédito CSLL',
    type: 'CSLL',
    value: 1523.45,
    date: '2023-09-25',
    dueDate: '2023-10-25',
    status: 'pending',
    documentNumber: 'DCOMP-123459',
    clientId: '1',
    clientName: 'Empresa ACME Ltda',
    processingDate: null,
    notes: 'Documentação em análise'
  },
  {
    id: '5',
    description: 'Recuperação de crédito IRRF',
    type: 'IRRF',
    value: 3256.78,
    date: '2023-09-20',
    dueDate: '2023-10-20',
    status: 'rejected',
    documentNumber: 'DCOMP-123460',
    clientId: '2',
    clientName: 'Indústrias XYZ S/A',
    processingDate: '2023-09-30',
    notes: 'Documentação incompleta. É necessário reenviar com as correções solicitadas.'
  }
]; 