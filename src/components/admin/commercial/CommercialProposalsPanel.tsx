
import React, { useState } from 'react';
import { useActiveClient } from '@/hooks/useActiveClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Filter, FileText, MoreVertical, Clock, Activity, CheckCircle, XCircle, FileCheck } from 'lucide-react';
import { ProposalStatus as ProposalStatusType } from '@/types/proposal';
import ProposalStatusComponent from './ProposalStatus';
import ProposalForm from './ProposalForm';
import ProposalTimeline from './ProposalTimeline';
import ProposalStatusPanel from './ProposalStatusPanel';

const mockProposals = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Client A',
    cnpj: '11.111.111/0001-11',
    title: 'Proposal A',
    description: 'Description A',
    service: 'Service A',
    value: 1000,
    status: 'REQUEST' as ProposalStatusType,
    createdBy: '1',
    createdByName: 'User A',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    timeline: []
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Client B',
    cnpj: '22.222.222/0001-22',
    title: 'Proposal B',
    description: 'Description B',
    service: 'Service B',
    value: 2000,
    status: 'ANALYSIS' as ProposalStatusType,
    createdBy: '2',
    createdByName: 'User B',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    timeline: []
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Client C',
    cnpj: '33.333.333/0001-33',
    title: 'Proposal C',
    description: 'Description C',
    service: 'Service C',
    value: 3000,
    status: 'APPROVED' as ProposalStatusType,
    createdBy: '3',
    createdByName: 'User C',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    timeline: []
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Client D',
    cnpj: '44.444.444/0001-44',
    title: 'Proposal D',
    description: 'Description D',
    service: 'Service D',
    value: 4000,
    status: 'REJECTED' as ProposalStatusType,
    createdBy: '4',
    createdByName: 'User D',
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
    timeline: []
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Client E',
    cnpj: '55.555.555/0001-55',
    title: 'Proposal E',
    description: 'Description E',
    service: 'Service E',
    value: 5000,
    status: 'REJECTED' as ProposalStatusType, // Changed from 'COMPLETED'
    createdBy: '5',
    createdByName: 'User E',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    timeline: []
  },
  {
    id: '6',
    clientId: '6',
    clientName: 'Client F',
    cnpj: '66.666.666/0001-66',
    title: 'Proposal F',
    description: 'Description F',
    service: 'Service F',
    value: 6000,
    status: 'CONVERTED' as ProposalStatusType,
    createdBy: '6',
    createdByName: 'User F',
    createdAt: '2024-01-06',
    updatedAt: '2024-01-06',
    timeline: []
  }
];

const CommercialProposalsPanel = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposalDetailOpen, setProposalDetailOpen] = useState(false);
  const { activeClient, isRepresentative } = useActiveClient();

  const handleCreateProposal = (data) => {
    toast.success('Proposta criada com sucesso!', {
      description: `Proposta "${data.title}" foi criada e está aguardando análise.`,
    });
    setIsFormDialogOpen(false);
  };

  const handleViewDetails = (proposal) => {
    setSelectedProposal(proposal);
    setProposalDetailOpen(true);
  };

  const handleChangeStatus = (proposalId: string, newStatus: ProposalStatusType) => {
    toast.success(`Status da proposta atualizado para ${newStatus}`, {
      description: 'A proposta foi atualizada com sucesso.',
    });
  };

  const filteredProposals = mockProposals.filter(proposal => {
    if (activeTab === 'all') return true;
    return proposal.status === activeTab;
  });

  const getProposalCountByStatus = (status: ProposalStatusType) => {
    return mockProposals.filter(p => p.status === status).length;
  };

  const proposalCounts = {
    REQUEST: getProposalCountByStatus('REQUEST'),
    ANALYSIS: getProposalCountByStatus('ANALYSIS'),
    APPROVED: getProposalCountByStatus('APPROVED'),
    REJECTED: getProposalCountByStatus('REJECTED'),
    CONVERTED: getProposalCountByStatus('CONVERTED')
  };

  const onFilterByStatus = (status: ProposalStatusType | null) => {
    setActiveTab(status || 'all');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Propostas Comerciais</h2>
          <p className="text-muted-foreground">
            Gerencie propostas comerciais, desde a solicitação até a conversão em contrato.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isRepresentative && (
            <Button onClick={() => setIsFormDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Proposta
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab('all')}>
                Todas as Propostas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('REQUEST')}>
                Solicitações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('ANALYSIS')}>
                Em Análise
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('APPROVED')}>
                Aprovadas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('REJECTED')}>
                Rejeitadas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('CONVERTED')}>
                Convertidas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ProposalStatusPanel 
        proposalCounts={proposalCounts}
        onFilterByStatus={onFilterByStatus}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">
            Todas
          </TabsTrigger>
          <TabsTrigger value="REQUEST" className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Solicitações
          </TabsTrigger>
          <TabsTrigger value="ANALYSIS" className="flex items-center">
            <Activity className="h-3.5 w-3.5 mr-1.5" />
            Em Análise
          </TabsTrigger>
          <TabsTrigger value="APPROVED" className="flex items-center">
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Aprovadas
          </TabsTrigger>
          <TabsTrigger value="REJECTED" className="flex items-center">
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Rejeitadas
          </TabsTrigger>
          <TabsTrigger value="CONVERTED" className="flex items-center">
            <FileCheck className="h-3.5 w-3.5 mr-1.5" />
            Convertidas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4 pt-4">
          {filteredProposals.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left font-medium text-sm">Título</th>
                    <th className="p-3 text-left font-medium text-sm">Cliente</th>
                    <th className="p-3 text-left font-medium text-sm">Valor</th>
                    <th className="p-3 text-left font-medium text-sm">Status</th>
                    <th className="p-3 text-left font-medium text-sm">Data</th>
                    <th className="p-3 text-left font-medium text-sm">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-muted/50">
                      <td className="p-3 text-sm">{proposal.title}</td>
                      <td className="p-3 text-sm">{proposal.clientName}</td>
                      <td className="p-3 text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.value)}
                      </td>
                      <td className="p-3 text-sm">
                        <ProposalStatusComponent status={proposal.status} />
                      </td>
                      <td className="p-3 text-sm">
                        {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewDetails(proposal)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(proposal)}>
                                Ver Detalhes
                              </DropdownMenuItem>
                              {proposal.status === 'REQUEST' && (
                                <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'ANALYSIS')}>
                                  Iniciar Análise
                                </DropdownMenuItem>
                              )}
                              {proposal.status === 'ANALYSIS' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'APPROVED')}>
                                    Aprovar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'REJECTED')}>
                                    Rejeitar
                                  </DropdownMenuItem>
                                </>
                              )}
                              {proposal.status === 'APPROVED' && (
                                <DropdownMenuItem onClick={() => handleChangeStatus(proposal.id, 'CONVERTED')}>
                                  Converter em Contrato
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full p-3 bg-muted mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Nenhuma proposta encontrada</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                  Não existem propostas na categoria selecionada. Clique no botão "Nova Proposta" para criar uma.
                </p>
                {isRepresentative && (
                  <Button 
                    onClick={() => setIsFormDialogOpen(true)} 
                    variant="outline" 
                    className="mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Proposta
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Nova Proposta Comercial</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da proposta comercial. Após submetida, ela será analisada pela nossa equipe.
            </DialogDescription>
          </DialogHeader>
          <ProposalForm 
            onSubmit={handleCreateProposal} 
            onCancel={() => setIsFormDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {selectedProposal && (
        <Dialog open={proposalDetailOpen} onOpenChange={setProposalDetailOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProposal.title}</DialogTitle>
              <DialogDescription>
                Detalhes da proposta comercial e linha do tempo de eventos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Cliente</h3>
                  <p className="text-sm">{selectedProposal.clientName}</p>
                  <p className="text-xs text-muted-foreground">CNPJ: {selectedProposal.cnpj}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Serviço</h3>
                  <p className="text-sm">{selectedProposal.service}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Valor</h3>
                  <p className="text-sm font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedProposal.value)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Status</h3>
                  <ProposalStatusComponent status={selectedProposal.status} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Descrição</h3>
                  <p className="text-sm">{selectedProposal.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Representante</h3>
                  <p className="text-sm">{selectedProposal.representativeName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Data de Criação</h3>
                  <p className="text-sm">
                    {new Date(selectedProposal.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                {selectedProposal.status === 'REJECTED' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1 text-red-600">Motivo da Rejeição</h3>
                    <p className="text-sm">{selectedProposal.rejectionReason}</p>
                  </div>
                )}
                {selectedProposal.status === 'CONVERTED' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1 text-purple-600">Informações do Contrato</h3>
                    <p className="text-sm">Contrato #{selectedProposal.contractId}</p>
                    <p className="text-xs text-muted-foreground">
                      Convertido em: {new Date(selectedProposal.convertedAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Linha do Tempo</h3>
                <ProposalTimeline events={selectedProposal.timeline} />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setProposalDetailOpen(false)}>
                Fechar
              </Button>
              {selectedProposal.status === 'REQUEST' && (
                <Button onClick={() => handleChangeStatus(selectedProposal.id, 'ANALYSIS')}>
                  Iniciar Análise
                </Button>
              )}
              {selectedProposal.status === 'ANALYSIS' && (
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => handleChangeStatus(selectedProposal.id, 'REJECTED')}
                  >
                    Rejeitar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => handleChangeStatus(selectedProposal.id, 'APPROVED')}
                  >
                    Aprovar
                  </Button>
                </div>
              )}
              {selectedProposal.status === 'APPROVED' && (
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleChangeStatus(selectedProposal.id, 'CONVERTED')}
                >
                  Converter em Contrato
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CommercialProposalsPanel;
