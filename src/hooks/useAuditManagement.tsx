import { useState, useEffect, useCallback } from 'react';
import { Audit, AuditSummary } from '@/types/audit';
import { toast } from 'sonner';

// Mock data for now
const mockAudits: Audit[] = [
  {
    id: '1',
    title: 'Auditoria Fiscal PIS/COFINS',
    status: 'in_progress',
    type: 'fiscal',
    date: '2023-05-15',
    clientId: '101',
    clientName: 'Empresa ABC Ltda',
    description: 'Auditoria completa para verificação de créditos tributários PIS/COFINS.',
    findings: 'Discrepâncias identificadas nos cálculos de compensação.',
    recommendations: 'Revisar procedimentos de apuração de créditos.',
    documents: ['doc1.pdf', 'doc2.pdf'],
    assignedTo: 'José Silva',
    createdAt: '2023-05-10',
    updatedAt: '2023-05-15',
  },
  // Add more mock audits as needed
];

const mockSummary: AuditSummary = {
  total: 10,
  inProgress: 3,
  completed: 5,
  pending: 2,
  highRisk: 1,
};

export const useAuditManagement = () => {
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [auditSummary, setAuditSummary] = useState<AuditSummary>(mockSummary);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAudit, setCurrentAudit] = useState<Audit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Computed property for filtered audits
  const filteredAudits = audits.filter(audit => {
    const matchesSearch = searchQuery === '' || 
      audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    const matchesType = typeFilter === 'all' || audit.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Alias for summary to maintain backward compatibility
  const summary = auditSummary;

  // Action handlers
  const viewDetails = useCallback((auditId: string) => {
    console.log('View details for audit', auditId);
    toast.info(`Visualizando detalhes da auditoria ${auditId}`);
    // Additional implementation
  }, []);

  const downloadDocuments = useCallback((auditId: string) => {
    console.log('Download documents for audit', auditId);
    toast.info(`Baixando documentos da auditoria ${auditId}`);
    // Additional implementation
  }, []);

  const editAudit = useCallback((auditId: string) => {
    console.log('Edit audit', auditId);
    const audit = audits.find(a => a.id === auditId);
    if (audit) {
      setCurrentAudit(audit);
      setIsEditMode(true);
      setIsFormOpen(true);
      toast.info(`Editando auditoria ${auditId}`);
    }
  }, [audits]);

  const deleteAudit = useCallback((auditId: string) => {
    console.log('Delete audit', auditId);
    toast.error(`Auditoria ${auditId} removida`);
    setAudits(prev => prev.filter(a => a.id !== auditId));
  }, []);

  const approveAudit = useCallback((auditId: string) => {
    console.log('Approve audit', auditId);
    toast.success(`Auditoria ${auditId} aprovada`);
    setAudits(prev => prev.map(a => a.id === auditId ? {...a, status: 'completed'} : a));
  }, []);

  const addNewAudit = useCallback((newAudit: Audit) => {
    console.log('Add new audit', newAudit);
    setAudits(prev => [...prev, newAudit]);
    toast.success('Nova auditoria criada com sucesso');
  }, []);

  const filterAudits = useCallback((query: string, status: string, type: string) => {
    setSearchQuery(query);
    setStatusFilter(status);
    setTypeFilter(type);
  }, []);

  // Compatibility wrappers
  const handleViewDetails = useCallback((auditId: string) => viewDetails(auditId), [viewDetails]);
  const handleDownloadDocuments = useCallback((auditId: string) => downloadDocuments(auditId), [downloadDocuments]);
  const handleEditAudit = useCallback((auditId: string) => editAudit(auditId), [editAudit]);
  const handleDeleteAudit = useCallback((auditId: string) => deleteAudit(auditId), [deleteAudit]);
  const handleApproveAudit = useCallback((auditId: string) => approveAudit(auditId), [approveAudit]);
  
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    // Mock refresh - in a real app would fetch from API
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Dados atualizados');
    }, 1000);
  }, []);

  const handleCreateAudit = useCallback(() => {
    setCurrentAudit(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  }, []);

  const handleSaveAudit = useCallback((audit: Audit) => {
    if (isEditMode && currentAudit) {
      // Update existing audit
      setAudits(prev => prev.map(a => a.id === currentAudit.id ? {...audit, id: currentAudit.id} : a));
      toast.success(`Auditoria ${currentAudit.id} atualizada`);
    } else {
      // Add new audit
      const newId = String(Date.now());
      const newAudit = {...audit, id: newId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()};
      addNewAudit(newAudit);
    }
    setIsFormOpen(false);
    setCurrentAudit(null);
    setIsEditMode(false);
  }, [isEditMode, currentAudit, addNewAudit]);

  // Other compatibility wrappers
  const onViewDetails = handleViewDetails;
  const onDownloadDocuments = handleDownloadDocuments;
  const onEdit = handleEditAudit;
  const onDelete = handleDeleteAudit;
  const onApprove = handleApproveAudit;

  return {
    audits,
    auditSummary,
    isLoading,
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
    handleViewDetails,
    handleDownloadDocuments,
    handleEditAudit,
    handleDeleteAudit,
    handleApproveAudit,
    
    // Original action methods
    viewDetails,
    downloadDocuments,
    editAudit,
    deleteAudit,
    approveAudit,
    addNewAudit,
    filterAudits,
    
    // New compatibility methods
    onViewDetails,
    onDownloadDocuments,
    onEdit,
    onDelete,
    onApprove
  };
};

export default useAuditManagement;
