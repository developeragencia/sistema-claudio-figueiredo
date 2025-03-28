
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Eye, 
  FileCheck, 
  FilePlus, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Printer, 
  RefreshCw, 
  Search, 
  ThumbsDown, 
  ThumbsUp, 
  XCircle 
} from 'lucide-react';
import { Proposal, ProposalStatus } from '@/types/proposal';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProposalTimeline from './ProposalTimeline';

const mockProposals: Proposal[] = [
  {
    id: 'prop-1',
    clientId: 'client-1',
    clientName: 'Prefeitura Municipal de São Paulo',
    cnpj: '12.345.678/0001-99',
    title: 'Recuperação de Créditos IRRF',
    description: 'Proposta para serviço de recuperação de créditos IRRF retidos indevidamente.',
    service: 'Recuperação de Créditos',
    value: 120000,
    status: 'ANALYSIS',
    createdBy: 'user-123',
    createdByName: 'Carlos Silva',
    representativeId: 'user-456',
    representativeName: 'Carlos Silva',
    createdAt: '2023-06-10T10:00:00Z',
    updatedAt: '2023-06-10T10:00:00Z',
    timeline: [
      {
        id: 'event-1',
        proposalId: 'prop-1',
        type: 'CREATED',
        description: 'Proposta criada',
        userId: 'user-123',
        userName: 'Carlos Silva',
        createdAt: '2023-06-10T10:00:00Z'
      },
      {
        id: 'event-2',
        proposalId: 'prop-1',
        type: 'UPDATED',
        description: 'Proposta enviada para análise',
        userId: 'user-123',
        userName: 'Carlos Silva',
        createdAt: '2023-06-10T10:15:00Z'
      }
    ]
  },
  {
    id: 'prop-2',
    clientId: 'client-2',
    clientName: 'Secretaria Estadual de Educação',
    cnpj: '23.456.789/0001-88',
    title: 'Auditoria Fiscal Completa',
    description: 'Serviço completo de auditoria fiscal para identificação de créditos tributários.',
    service: 'Auditoria Fiscal',
    value: 85000,
    status: 'APPROVED',
    createdBy: 'user-789',
    createdByName: 'Maria Oliveira',
    representativeId: 'user-789',
    representativeName: 'Maria Oliveira',
    approvedBy: 'user-321',
    approvedByName: 'Roberto Almeida',
    createdAt: '2023-06-05T14:30:00Z',
    updatedAt: '2023-06-07T09:15:00Z',
    approvedAt: '2023-06-07T09:15:00Z',
    timeline: [
      {
        id: 'event-3',
        proposalId: 'prop-2',
        type: 'CREATED',
        description: 'Proposta criada',
        userId: 'user-789',
        userName: 'Maria Oliveira',
        createdAt: '2023-06-05T14:30:00Z'
      },
      {
        id: 'event-4',
        proposalId: 'prop-2',
        type: 'ANALYZED',
        description: 'Proposta analisada',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-06-06T10:00:00Z'
      },
      {
        id: 'event-5',
        proposalId: 'prop-2',
        type: 'APPROVED',
        description: 'Proposta aprovada',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-06-07T09:15:00Z'
      }
    ]
  },
  {
    id: 'prop-3',
    clientId: 'client-3',
    clientName: 'Hospital Municipal Dr. João Silva',
    cnpj: '34.567.890/0001-77',
    title: 'Recuperação de Créditos INSS',
    description: 'Serviço de recuperação de créditos de INSS pagos indevidamente.',
    service: 'Recuperação de Créditos',
    value: 95000,
    status: 'REJECTED',
    createdBy: 'user-456',
    createdByName: 'Carlos Silva',
    representativeId: 'user-456',
    representativeName: 'João Pereira',
    rejectedBy: 'user-321',
    rejectedByName: 'Roberto Almeida',
    rejectionReason: 'Cliente não se enquadra nos requisitos necessários',
    createdAt: '2023-06-01T11:45:00Z',
    updatedAt: '2023-06-03T16:20:00Z',
    rejectedAt: '2023-06-03T16:20:00Z',
    timeline: [
      {
        id: 'event-6',
        proposalId: 'prop-3',
        type: 'CREATED',
        description: 'Proposta criada',
        userId: 'user-456',
        userName: 'Carlos Silva',
        createdAt: '2023-06-01T11:45:00Z'
      },
      {
        id: 'event-7',
        proposalId: 'prop-3',
        type: 'ANALYZED',
        description: 'Proposta analisada',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-06-02T14:30:00Z'
      },
      {
        id: 'event-8',
        proposalId: 'prop-3',
        type: 'REJECTED',
        description: 'Proposta rejeitada',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-06-03T16:20:00Z',
        metadata: {
          reason: 'Cliente não se enquadra nos requisitos necessários'
        }
      }
    ]
  },
  {
    id: 'prop-4',
    clientId: 'client-4',
    clientName: 'Departamento de Infraestrutura',
    cnpj: '45.678.901/0001-66',
    title: 'Recuperação de Créditos Tributários',
    description: 'Serviço completo de recuperação de créditos tributários diversos.',
    service: 'Recuperação de Créditos',
    value: 150000,
    status: 'CONVERTED',
    createdBy: 'user-456',
    createdByName: 'Carlos Silva',
    representativeId: 'user-456',
    representativeName: 'Carlos Silva',
    approvedBy: 'user-321',
    approvedByName: 'Roberto Almeida',
    contractId: 'contract-123',
    createdAt: '2023-05-25T09:30:00Z',
    updatedAt: '2023-06-01T10:15:00Z',
    approvedAt: '2023-05-28T11:20:00Z',
    convertedAt: '2023-06-01T10:15:00Z',
    timeline: [
      {
        id: 'event-9',
        proposalId: 'prop-4',
        type: 'CREATED',
        description: 'Proposta criada',
        userId: 'user-456',
        userName: 'Carlos Silva',
        createdAt: '2023-05-25T09:30:00Z'
      },
      {
        id: 'event-10',
        proposalId: 'prop-4',
        type: 'ANALYZED',
        description: 'Proposta analisada',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-05-27T14:15:00Z'
      },
      {
        id: 'event-11',
        proposalId: 'prop-4',
        type: 'APPROVED',
        description: 'Proposta aprovada',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-05-28T11:20:00Z'
      },
      {
        id: 'event-12',
        proposalId: 'prop-4',
        type: 'CONVERTED',
        description: 'Proposta convertida em contrato',
        userId: 'user-321',
        userName: 'Roberto Almeida',
        createdAt: '2023-06-01T10:15:00Z',
        metadata: {
          contractId: 'contract-123'
        }
      }
    ]
  }
];

const ProposalManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | ''>('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [isNewProposalOpen, setIsNewProposalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Filter proposals based on search query and filters
  const filteredProposals = mockProposals.filter(proposal => {
    const matchesSearch = (
      proposal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.cnpj.includes(searchQuery)
    );
    
    const matchesStatus = statusFilter ? proposal.status === statusFilter : true;
    const matchesService = serviceFilter ? proposal.service === serviceFilter : true;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  // Handle creating a new proposal
  const handleCreateProposal = () => {
    setIsNewProposalOpen(true);
  };
  
  // Handle submitting a new proposal
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Proposta criada com sucesso', {
      description: 'A proposta foi enviada para análise.'
    });
    setIsNewProposalOpen(false);
  };
  
  // Handle opening proposal details
  const handleViewDetails = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsDetailsOpen(true);
  };
  
  // Handle opening proposal timeline
  const handleViewTimeline = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsTimelineOpen(true);
  };
  
  // Handle approving a proposal
  const handleApproveProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsApproveOpen(true);
  };
  
  // Handle confirming proposal approval
  const handleConfirmApprove = () => {
    toast.success('Proposta aprovada', {
      description: 'A proposta foi aprovada e o cliente foi notificado.'
    });
    setIsApproveOpen(false);
  };
  
  // Handle rejecting a proposal
  const handleRejectProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsRejectOpen(true);
  };
  
  // Handle confirming proposal rejection
  const handleConfirmReject = () => {
    toast.success('Proposta rejeitada', {
      description: 'A proposta foi rejeitada e o cliente foi notificado.'
    });
    setIsRejectOpen(false);
    setRejectionReason('');
  };
  
  // Handle converting a proposal to a contract
  const handleConvertProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsConvertOpen(true);
  };
  
  // Handle confirming proposal conversion
  const handleConfirmConvert = () => {
    toast.success('Proposta convertida em contrato', {
      description: 'O contrato foi gerado com sucesso.'
    });
    setIsConvertOpen(false);
  };
  
  // Get status badge based on proposal status
  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'REQUEST':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300">Solicitação</Badge>;
      case 'ANALYSIS':
        return <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300">Em Análise</Badge>;
      case 'APPROVED':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Aprovada</Badge>;
      case 'REJECTED':
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-300">Rejeitada</Badge>;
      case 'CONVERTED':
        return <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-300">Convertida</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
          <p className="text-muted-foreground">
            Gerencie propostas comerciais e contratos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateProposal} className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            Nova Proposta
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="proposals">Propostas</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Propostas Comerciais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar propostas..."
                      className="pl-9 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProposalStatus | '')}>
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{statusFilter ? getStatusText(statusFilter) : 'Status'}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Todos</SelectItem>
                        <SelectItem value="REQUEST">Solicitação</SelectItem>
                        <SelectItem value="ANALYSIS">Em Análise</SelectItem>
                        <SelectItem value="APPROVED">Aprovada</SelectItem>
                        <SelectItem value="REJECTED">Rejeitada</SelectItem>
                        <SelectItem value="CONVERTED">Convertida</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{serviceFilter || 'Serviço'}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Todos</SelectItem>
                        <SelectItem value="Recuperação de Créditos">Recuperação de Créditos</SelectItem>
                        <SelectItem value="Auditoria Fiscal">Auditoria Fiscal</SelectItem>
                        <SelectItem value="Consultoria Tributária">Consultoria Tributária</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
                    <Download className="h-3.5 w-3.5" />
                    <span>Exportar</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Imprimir</span>
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="px-4 py-3 text-left font-medium">Cliente</th>
                      <th className="px-4 py-3 text-left font-medium">Proposta</th>
                      <th className="px-4 py-3 text-left font-medium">Valor</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Representante</th>
                      <th className="px-4 py-3 text-center font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProposals.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          Nenhuma proposta encontrada.
                        </td>
                      </tr>
                    ) : (
                      filteredProposals.map((proposal) => (
                        <tr key={proposal.id} className="border-b hover:bg-muted/30">
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">{proposal.clientName}</div>
                              <div className="text-xs text-muted-foreground">{proposal.cnpj}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{proposal.title}</div>
                            <div className="text-xs text-muted-foreground">{proposal.service}</div>
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {formatCurrency(proposal.value)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{formatDate(proposal.createdAt)}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> 
                              {new Date(proposal.createdAt).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(proposal.status)}
                          </td>
                          <td className="px-4 py-3">
                            {proposal.representativeName}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleViewDetails(proposal)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleViewTimeline(proposal)}
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {proposal.status === 'ANALYSIS' && (
                                    <>
                                      <DropdownMenuItem onClick={() => handleApproveProposal(proposal)}>
                                        <ThumbsUp className="h-4 w-4 mr-2 text-green-600" />
                                        <span>Aprovar</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleRejectProposal(proposal)}>
                                        <ThumbsDown className="h-4 w-4 mr-2 text-red-600" />
                                        <span>Rejeitar</span>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  
                                  {proposal.status === 'APPROVED' && (
                                    <DropdownMenuItem onClick={() => handleConvertProposal(proposal)}>
                                      <FileCheck className="h-4 w-4 mr-2 text-purple-600" />
                                      <span>Converter em Contrato</span>
                                    </DropdownMenuItem>
                                  )}
                                  
                                  <DropdownMenuItem onClick={() => handleViewDetails(proposal)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    <span>Ver Detalhes</span>
                                  </DropdownMenuItem>
                                  
                                  <DropdownMenuItem onClick={() => handleViewTimeline(proposal)}>
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>Ver Timeline</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Contratos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Gestão de Contratos</h3>
                <p className="max-w-md mx-auto mb-4">
                  Esta funcionalidade permite gerenciar todos os contratos ativos gerados a partir de propostas aprovadas.
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Implementar Gestão de Contratos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Relatórios de Propostas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Relatórios Comerciais</h3>
                <p className="max-w-md mx-auto mb-4">
                  Esta funcionalidade permitirá gerar relatórios detalhados sobre propostas, taxas de conversão e desempenho.
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Implementar Relatórios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Propostas Arquivadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Propostas Arquivadas</h3>
                <p className="max-w-md mx-auto mb-4">
                  Aqui serão listadas as propostas que foram arquivadas, mantendo o histórico completo.
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Implementar Arquivo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      
      {/* New Proposal Dialog */}
      <Dialog open={isNewProposalOpen} onOpenChange={setIsNewProposalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Proposta Comercial</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da proposta comercial abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitProposal} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nome do Cliente</Label>
                <Input
                  id="client-name"
                  placeholder="Nome do cliente"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Título da Proposta</Label>
              <Input
                id="title"
                placeholder="Título da proposta"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="service-type">Tipo de Serviço</Label>
                <Select>
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="irrf">Recuperação de Créditos IRRF</SelectItem>
                      <SelectItem value="pis-cofins">Recuperação de PIS/COFINS</SelectItem>
                      <SelectItem value="inss">Recuperação de INSS</SelectItem>
                      <SelectItem value="audit">Auditoria Fiscal Completa</SelectItem>
                      <SelectItem value="compliance">Compliance Tributário</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value">Valor Estimado (R$)</Label>
                <Input
                  id="value"
                  placeholder="0,00"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Proposta</Label>
              <Textarea
                id="description"
                placeholder="Descreva os detalhes da proposta..."
                rows={4}
                required
              />
            </div>
            
            <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsNewProposalOpen(false)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit">
                <CheckCircle className="h-4 w-4 mr-2" />
                Enviar Proposta
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Proposal Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Proposta</DialogTitle>
            <DialogDescription>
              {selectedProposal?.clientName} - {formatDate(selectedProposal?.createdAt || '')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{selectedProposal.title}</h3>
                {getStatusBadge(selectedProposal.status)}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedProposal.clientName}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">CNPJ</p>
                  <p className="font-medium">{selectedProposal.cnpj}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Serviço</p>
                  <p className="font-medium">{selectedProposal.service}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium">{formatCurrency(selectedProposal.value)}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Criada por</p>
                  <p className="font-medium">{selectedProposal.createdByName}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Representante</p>
                  <p className="font-medium">{selectedProposal.representativeName}</p>
                </div>
                
                {selectedProposal.status === 'APPROVED' && (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Aprovada por</p>
                      <p className="font-medium">{selectedProposal.approvedByName}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Data de aprovação</p>
                      <p className="font-medium">{formatDate(selectedProposal.approvedAt || '')}</p>
                    </div>
                  </>
                )}
                
                {selectedProposal.status === 'REJECTED' && (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rejeitada por</p>
                      <p className="font-medium">{selectedProposal.rejectedByName}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Data de rejeição</p>
                      <p className="font-medium">{formatDate(selectedProposal.rejectedAt || '')}</p>
                    </div>
                  </>
                )}
                
                {selectedProposal.status === 'CONVERTED' && (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Convertida em</p>
                      <p className="font-medium">{formatDate(selectedProposal.convertedAt || '')}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ID do contrato</p>
                      <p className="font-medium">{selectedProposal.contractId}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="text-sm border rounded-md p-3 bg-muted/30">{selectedProposal.description}</p>
              </div>
              
              {selectedProposal.status === 'REJECTED' && selectedProposal.rejectionReason && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Motivo da rejeição</p>
                  <div className="border border-red-200 rounded-md p-3 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
                    <AlertTriangle className="h-4 w-4 inline-block mr-2" />
                    <span>{selectedProposal.rejectionReason}</span>
                  </div>
                </div>
              )}
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Fechar
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    setIsTimelineOpen(true);
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Ver Timeline
                </Button>
                
                {selectedProposal.status === 'ANALYSIS' && (
                  <>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setIsDetailsOpen(false);
                        handleRejectProposal(selectedProposal);
                      }}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Rejeitar
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setIsDetailsOpen(false);
                        handleApproveProposal(selectedProposal);
                      }}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                  </>
                )}
                
                {selectedProposal.status === 'APPROVED' && (
                  <Button
                    onClick={() => {
                      setIsDetailsOpen(false);
                      handleConvertProposal(selectedProposal);
                    }}
                  >
                    <FileCheck className="h-4 w-4 mr-2" />
                    Converter em Contrato
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Approve Proposal Dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprovar Proposta</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja aprovar esta proposta?
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-muted/30">
                <div className="font-medium">{selectedProposal.title}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedProposal.clientName} - {formatCurrency(selectedProposal.value)}
                </div>
              </div>
              
              <div className="border border-green-200 rounded-md p-3 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300">
                <CheckCircle className="h-4 w-4 inline-block mr-2" />
                <span>Ao aprovar, a proposta poderá ser convertida em contrato e o cliente será notificado.</span>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsApproveOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleConfirmApprove}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Aprovação
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Reject Proposal Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rejeitar Proposta</DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição da proposta.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-muted/30">
                <div className="font-medium">{selectedProposal.title}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedProposal.clientName} - {formatCurrency(selectedProposal.value)}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Motivo da Rejeição</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Informe o motivo da rejeição..."
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                />
              </div>
              
              <div className="border border-red-200 rounded-md p-3 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
                <AlertTriangle className="h-4 w-4 inline-block mr-2" />
                <span>Ao rejeitar, a proposta não poderá ser convertida em contrato e o cliente será notificado.</span>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRejectOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleConfirmReject}
                  disabled={!rejectionReason.trim()}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Confirmar Rejeição
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Convert Proposal Dialog */}
      <Dialog open={isConvertOpen} onOpenChange={setIsConvertOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Converter em Contrato</DialogTitle>
            <DialogDescription>
              Converter esta proposta em um contrato ativo.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-muted/30">
                <div className="font-medium">{selectedProposal.title}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedProposal.clientName} - {formatCurrency(selectedProposal.value)}
                </div>
              </div>
              
              <div className="border border-purple-200 rounded-md p-3 bg-purple-50 text-purple-800 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-300">
                <FileCheck className="h-4 w-4 inline-block mr-2" />
                <span>Ao converter, um novo contrato será gerado e vinculado ao cliente.</span>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsConvertOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleConfirmConvert}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  Confirmar Conversão
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Timeline Dialog */}
      <Dialog open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Timeline da Proposta</DialogTitle>
            <DialogDescription>
              {selectedProposal?.title} - {selectedProposal?.clientName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Histórico de eventos</h3>
                {getStatusBadge(selectedProposal.status)}
              </div>
              
              <ProposalTimeline events={selectedProposal.timeline} />
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsTimelineOpen(false)}
                >
                  Fechar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper function to get status text in Portuguese
function getStatusText(status: ProposalStatus): string {
  switch (status) {
    case 'REQUEST':
      return 'Solicitação';
    case 'ANALYSIS':
      return 'Em Análise';
    case 'APPROVED':
      return 'Aprovada';
    case 'REJECTED':
      return 'Rejeitada';
    case 'CONVERTED':
      return 'Convertida';
    default:
      return 'Desconhecido';
  }
}

export default ProposalManagement;
