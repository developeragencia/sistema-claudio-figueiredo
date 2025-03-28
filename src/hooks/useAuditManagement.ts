
import { useState, useEffect } from 'react';
import { Audit, AuditSummary } from '../types/audit';
import { toast } from 'sonner';

// Estado inicial para resumo de auditoria
const initialSummary: AuditSummary = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  inProgress: 0,
  totalAudits: 0,
  pendingAudits: 0,
  completedAudits: 0,
  inProgressAudits: 0,
  emAndamento: 0,
  pendentes: 0,
  concluidas: 0
};

// Dados de exemplo para auditoria
const mockAudits: Audit[] = [
  {
    id: '1',
    title: 'Auditoria Fiscal - IRRF 2022',
    client: 'Empresa ABC Ltda',
    clientName: 'Empresa ABC Ltda',
    type: 'IRRF',
    auditType: 'IRRF',
    status: 'pending',
    createdAt: new Date(2022, 5, 15).toISOString(),
    updatedAt: new Date(2022, 5, 15).toISOString(),
    dueDate: new Date(2022, 8, 15).toISOString(),
    assignedTo: 'Carlos Oliveira',
    priority: 'high',
    description: 'Auditoria de retenções de IRRF do ano fiscal 2022'
  },
  {
    id: '2',
    title: 'Revisão de Créditos - PIS/COFINS',
    client: 'Indústrias XYZ S.A.',
    clientName: 'Indústrias XYZ S.A.',
    type: 'PIS/COFINS',
    auditType: 'PIS/COFINS',
    status: 'approved',
    createdAt: new Date(2022, 4, 10).toISOString(),
    updatedAt: new Date(2022, 6, 20).toISOString(),
    dueDate: new Date(2022, 7, 10).toISOString(),
    assignedTo: 'Ana Silva',
    priority: 'medium',
    description: 'Revisão dos créditos de PIS/COFINS do primeiro trimestre'
  },
  {
    id: '3',
    title: 'Análise de Compensações Tributárias',
    client: 'Comércio Rápido Ltda',
    clientName: 'Comércio Rápido Ltda',
    type: 'Compensação',
    auditType: 'Compensação',
    status: 'in_progress',
    createdAt: new Date(2022, 3, 5).toISOString(),
    updatedAt: new Date(2022, 3, 25).toISOString(),
    dueDate: new Date(2022, 6, 5).toISOString(),
    assignedTo: 'Roberto Gomes',
    priority: 'low',
    description: 'Análise das compensações tributárias realizadas no último ano'
  },
  {
    id: '4',
    title: 'Auditoria de INSS',
    client: 'Serviços Técnicos ME',
    clientName: 'Serviços Técnicos ME',
    type: 'INSS',
    auditType: 'INSS',
    status: 'rejected',
    createdAt: new Date(2022, 2, 8).toISOString(),
    updatedAt: new Date(2022, 2, 28).toISOString(),
    dueDate: new Date(2022, 5, 8).toISOString(),
    assignedTo: 'Carlos Oliveira',
    priority: 'high',
    description: 'Auditoria das contribuições de INSS sobre folha de pagamento'
  },
  {
    id: '5',
    title: 'Revisão de Obrigações Acessórias',
    client: 'Consultoria Financeira S.A.',
    clientName: 'Consultoria Financeira S.A.',
    type: 'Obrigações',
    auditType: 'Obrigações',
    status: 'pending',
    createdAt: new Date(2022, 1, 20).toISOString(),
    updatedAt: new Date(2022, 1, 20).toISOString(),
    dueDate: new Date(2022, 4, 20).toISOString(),
    assignedTo: 'Mariana Costa',
    priority: 'medium',
    description: 'Revisão do cumprimento das obrigações acessórias do exercício anterior'
  }
];

const useAuditManagement = () => {
  // Estado para dados de auditoria
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [auditSummary, setAuditSummary] = useState<AuditSummary>(initialSummary);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para filtragem
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Estados para manipulação de formulário e modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAudit, setCurrentAudit] = useState<Audit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Função para filtrar auditorias com base nos filtros aplicados
  const filteredAudits = audits.filter((audit) => {
    // Filtrar por pesquisa
    const matchesSearch = audit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         audit.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por status
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    
    // Filtrar por tipo
    const matchesType = typeFilter === 'all' || audit.type === typeFilter;
    
    // Retornar apenas auditorias que atendem a todos os critérios
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calcular resumo das auditorias
  const calculateSummary = () => {
    const summary = audits.reduce((acc, audit) => {
      acc.total += 1;
      acc.totalAudits += 1;
      
      switch (audit.status) {
        case 'pending':
          acc.pending += 1;
          acc.pendingAudits += 1;
          acc.pendentes += 1;
          break;
        case 'approved':
          acc.approved += 1;
          acc.completedAudits += 1;
          acc.concluidas += 1;
          break;
        case 'rejected':
          acc.rejected += 1;
          break;
        case 'in_progress':
          acc.inProgress += 1;
          acc.inProgressAudits += 1;
          acc.emAndamento += 1;
          break;
      }
      
      return acc;
    }, {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      inProgress: 0,
      totalAudits: 0,
      pendingAudits: 0,
      completedAudits: 0,
      inProgressAudits: 0,
      emAndamento: 0,
      pendentes: 0,
      concluidas: 0
    } as AuditSummary);
    
    setAuditSummary(summary);
  };

  // Atualizar resumo quando auditorias mudarem
  useEffect(() => {
    calculateSummary();
  }, [audits]);

  // Simular carregamento de dados
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handler para atualizar auditorias
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simula o recarregamento dos dados
      setIsLoading(false);
      toast.success('Dados atualizados com sucesso!');
    }, 1000);
  };

  // Handler para visualizar detalhes de uma auditoria
  const viewDetails = (auditId: string) => {
    console.log(`Exibindo detalhes da auditoria ${auditId}`);
    // Implementação real: navegação para página de detalhes ou abertura de modal
  };

  // Handler para visualizar detalhes de uma auditoria
  const onViewDetails = (auditId: string) => {
    viewDetails(auditId);
  };

  // Handler para baixar documentos
  const downloadDocuments = (auditId: string) => {
    console.log(`Baixando documentos da auditoria ${auditId}`);
    toast.success('Documentos preparados para download.');
    // Implementação real: lógica para download de documentos
  };

  // Handler para baixar documentos
  const onDownloadDocuments = (auditId: string) => {
    downloadDocuments(auditId);
  };

  // Handler para editar auditoria
  const editAudit = (auditId: string) => {
    const audit = audits.find(a => a.id === auditId);
    if (audit) {
      setCurrentAudit(audit);
      setIsEditMode(true);
      setIsFormOpen(true);
    }
  };

  // Handler para editar auditoria
  const onEdit = (auditId: string) => {
    editAudit(auditId);
  };

  // Handler para excluir auditoria
  const deleteAudit = (auditId: string) => {
    setAudits(prevAudits => prevAudits.filter(audit => audit.id !== auditId));
    toast.success('Auditoria excluída com sucesso!');
  };

  // Handler para excluir auditoria
  const onDelete = (auditId: string) => {
    deleteAudit(auditId);
  };

  // Handler para aprovar auditoria
  const approveAudit = (auditId: string) => {
    setAudits(prevAudits => 
      prevAudits.map(audit => 
        audit.id === auditId 
          ? { ...audit, status: 'approved', updatedAt: new Date().toISOString() } 
          : audit
      )
    );
    toast.success('Auditoria aprovada com sucesso!');
  };

  // Handler para aprovar auditoria
  const onApprove = (auditId: string) => {
    approveAudit(auditId);
  };

  // Handler para adicionar nova auditoria
  const addNewAudit = (newAudit: Audit) => {
    setAudits(prevAudits => [...prevAudits, newAudit]);
    toast.success('Nova auditoria adicionada com sucesso!');
  };

  // Handler para criar nova auditoria
  const handleCreateAudit = () => {
    setCurrentAudit(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Handler para salvar auditoria (novo ou edição)
  const handleSaveAudit = (auditData: Audit) => {
    if (isEditMode && currentAudit) {
      // Atualização de auditoria existente
      setAudits(prevAudits => 
        prevAudits.map(audit => 
          audit.id === currentAudit.id 
            ? { ...auditData, updatedAt: new Date().toISOString() } 
            : audit
        )
      );
      toast.success('Auditoria atualizada com sucesso!');
    } else {
      // Criação de nova auditoria
      const newAudit: Audit = {
        ...auditData,
        id: `${Date.now()}`, // Gerar ID único baseado em timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addNewAudit(newAudit);
    }
    setIsFormOpen(false);
  };

  // Calcular resumo para exibição
  const summary = {
    total: auditSummary.total,
    pending: auditSummary.pending,
    approved: auditSummary.approved,
    rejected: auditSummary.rejected,
    inProgress: auditSummary.inProgress
  };

  return {
    audits,
    auditSummary,
    isLoading,
    viewDetails,
    downloadDocuments,
    editAudit,
    deleteAudit,
    approveAudit,
    addNewAudit,
    filterAudits: calculateSummary,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredAudits,
    summary,
    isListening,
    isFormOpen,
    setIsFormOpen,
    currentAudit,
    isEditMode,
    handleRefresh,
    handleCreateAudit,
    handleSaveAudit,
    onViewDetails,
    onDownloadDocuments,
    onEdit,
    onDelete,
    onApprove
  };
};

// Export default and named export for compatibility
export default useAuditManagement;
export { useAuditManagement };
