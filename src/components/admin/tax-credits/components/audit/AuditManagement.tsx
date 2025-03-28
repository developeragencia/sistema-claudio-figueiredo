
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import AuditHeader from './AuditHeader';
import AuditStatusCards from './AuditStatusCards';
import AuditTabs from './AuditTabs';
import { Audit } from '@/types/audit';

// Sample audit data
const sampleAudits: Audit[] = [
  {
    id: "audit-001",
    clientName: "Empresa ABC Ltda",
    auditType: "Fiscal",
    date: "12/06/2023",
    status: "Em Andamento",
    priority: "Alta",
    assignedTo: "Carlos Silva",
    documentNumber: "12.345.678/0001-90",
    startDate: "2023-06-01",
    deadline: "2023-07-01",
    documentsCount: 5,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-05T14:30:00Z",
    title: "Auditoria Fiscal 2023",
    client: "empresa-abc",
    type: "fiscal"
  },
  {
    id: "audit-002",
    clientName: "XYZ Comércio S.A.",
    auditType: "Tributária",
    date: "15/06/2023",
    status: "Concluída",
    priority: "Média",
    assignedTo: "Ana Oliveira",
    documentNumber: "23.456.789/0001-12",
    startDate: "2023-05-15",
    deadline: "2023-06-15",
    documentsCount: 8,
    createdAt: "2023-05-15T10:00:00Z",
    updatedAt: "2023-06-15T14:30:00Z",
    title: "Auditoria Tributária XYZ",
    client: "xyz-comercio",
    type: "tributaria"
  },
  {
    id: "audit-003",
    clientName: "Tech Solutions Inc.",
    auditType: "Contábil",
    date: "10/06/2023",
    status: "Pendente",
    priority: "Baixa",
    assignedTo: "João Santos",
    documentNumber: "34.567.890/0001-23",
    startDate: "2023-06-05",
    deadline: "2023-07-05",
    documentsCount: 3,
    createdAt: "2023-06-05T10:00:00Z",
    updatedAt: "2023-06-05T14:30:00Z",
    title: "Auditoria Contábil Tech",
    client: "tech-solutions",
    type: "contabil"
  },
  {
    id: "audit-004",
    clientName: "Indústria Nacional Ltda",
    auditType: "Fiscal",
    date: "05/06/2023",
    status: "Em Andamento",
    priority: "Alta",
    assignedTo: "Mariana Costa",
    documentNumber: "45.678.901/0001-34",
    startDate: "2023-05-20",
    deadline: "2023-06-20",
    documentsCount: 10,
    createdAt: "2023-05-20T10:00:00Z",
    updatedAt: "2023-06-01T14:30:00Z",
    title: "Auditoria Fiscal Indústria",
    client: "industria-nacional",
    type: "fiscal"
  }
];

const AuditManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [audits, setAudits] = useState<Audit[]>(sampleAudits);

  // Handler functions for action buttons
  const handleViewDetails = (auditId: string) => {
    toast({
      title: "Visualizando detalhes",
      description: `Visualizando auditoria ${auditId}`,
    });
  };

  const handleDownloadDocuments = (auditId: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando documentos da auditoria ${auditId}`,
    });
  };

  const handleEdit = (auditId: string) => {
    toast({
      title: "Editar auditoria",
      description: `Editando auditoria ${auditId}`,
    });
  };

  const handleDelete = (auditId: string) => {
    toast({
      title: "Excluir auditoria",
      description: `Excluindo auditoria ${auditId}`,
      variant: "destructive",
    });
  };

  const handleApprove = (auditId: string) => {
    toast({
      title: "Aprovar auditoria",
      description: `Auditoria ${auditId} aprovada com sucesso`,
      variant: "success",
    });
  };

  const handleNewAudit = () => {
    toast({
      title: "Nova auditoria",
      description: "Criando nova auditoria",
    });
  };

  return (
    <div className="space-y-6">
      <AuditHeader onNewAudit={handleNewAudit} />
      <AuditStatusCards audits={audits} />
      <AuditTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        audits={audits}
        onViewDetails={handleViewDetails}
        onDownloadDocuments={handleDownloadDocuments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default AuditManagement;
