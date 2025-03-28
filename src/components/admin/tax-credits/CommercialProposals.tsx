
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  PlusCircle, RefreshCw, FileText, Calendar, 
  FileDown, CheckCircle, XCircle, History, Clock, Eye, 
  FileBox, Briefcase, CircleDollarSign, User, ArrowRightCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CommercialProposals: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const mockProposals = [
    {
      id: 'prop-1',
      clientName: 'Prefeitura Municipal de São Paulo',
      cnpj: '12.345.678/0001-99',
      status: 'ANALYSIS',
      createdAt: new Date('2023-06-10'),
      representativeName: 'Carlos Silva',
      value: 120000,
      service: 'Recuperação de Créditos IRRF'
    },
    {
      id: 'prop-2',
      clientName: 'Secretaria Estadual de Educação',
      cnpj: '23.456.789/0001-88',
      status: 'APPROVED',
      createdAt: new Date('2023-06-05'),
      representativeName: 'Maria Oliveira',
      value: 85000,
      service: 'Auditoria Fiscal Completa'
    },
    {
      id: 'prop-3',
      clientName: 'Hospital Municipal Dr. João Silva',
      cnpj: '34.567.890/0001-77',
      status: 'REJECTED',
      createdAt: new Date('2023-06-01'),
      representativeName: 'João Pereira',
      value: 95000,
      service: 'Recuperação de Créditos INSS'
    },
    {
      id: 'prop-4',
      clientName: 'Departamento de Infraestrutura',
      cnpj: '45.678.901/0001-66',
      status: 'CONVERTED',
      createdAt: new Date('2023-05-25'),
      representativeName: 'Carlos Silva',
      value: 150000,
      service: 'Recuperação de Créditos Tributários'
    }
  ];

  const getStatusBadge = (status: string) => {
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

  const handleCreateProposal = () => {
    setIsFormOpen(true);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Proposta criada com sucesso', {
      description: 'A proposta foi enviada para análise'
    });
    setIsFormOpen(false);
  };

  const handleViewDetails = (proposalId: string) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes da proposta ${proposalId}`
    });
  };

  const handleApproveProposal = (proposalId: string) => {
    toast.success('Proposta aprovada', {
      description: 'A proposta foi aprovada e notificação enviada'
    });
  };

  const handleRejectProposal = (proposalId: string) => {
    toast.success('Proposta rejeitada', {
      description: 'A proposta foi rejeitada e notificação enviada'
    });
  };

  const handleConvertProposal = (proposalId: string) => {
    toast.success('Proposta convertida em contrato', {
      description: 'O contrato foi gerado com sucesso'
    });
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
            <PlusCircle className="h-4 w-4" />
            Nova Proposta
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="proposals">Propostas</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Propostas Comerciais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <Input
                    placeholder="Buscar propostas..."
                    className="w-full sm:w-64"
                  />
                  <Button variant="outline" size="sm">
                    Filtrar
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <FileDown className="h-3.5 w-3.5" />
                    <span>Exportar</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Período</span>
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Cliente</th>
                      <th className="px-4 py-3 text-left font-medium">Serviço</th>
                      <th className="px-4 py-3 text-left font-medium">Valor</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Representante</th>
                      <th className="px-4 py-3 text-center font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProposals.map(proposal => (
                      <tr key={proposal.id} className="border-b">
                        <td className="px-4 py-3">{proposal.clientName}</td>
                        <td className="px-4 py-3">{proposal.service}</td>
                        <td className="px-4 py-3">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(proposal.value)}
                        </td>
                        <td className="px-4 py-3">
                          {format(proposal.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(proposal.status)}
                        </td>
                        <td className="px-4 py-3">{proposal.representativeName}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleViewDetails(proposal.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {proposal.status === 'ANALYSIS' && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-green-600"
                                  onClick={() => handleApproveProposal(proposal.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-600"
                                  onClick={() => handleRejectProposal(proposal.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            
                            {proposal.status === 'APPROVED' && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-purple-600"
                                onClick={() => handleConvertProposal(proposal.id)}
                              >
                                <ArrowRightCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {isFormOpen && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Nova Proposta Comercial</CardTitle>
              </CardHeader>
              <CardContent>
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
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Tipo de Serviço</Label>
                      <select 
                        id="service-type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Selecione um serviço</option>
                        <option value="irrf">Recuperação de Créditos IRRF</option>
                        <option value="pis-cofins">Recuperação de PIS/COFINS</option>
                        <option value="inss">Recuperação de INSS</option>
                        <option value="audit">Auditoria Fiscal Completa</option>
                        <option value="compliance">Compliance Tributário</option>
                      </select>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="representative">Representante</Label>
                    <Input
                      id="representative"
                      placeholder="Nome do representante"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsFormOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Enviar Proposta
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Contratos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FileBox className="h-5 w-5" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Ativo</Badge>
                  </div>
                  <h3 className="font-medium">Prefeitura Municipal de São Paulo</h3>
                  <p className="text-sm text-muted-foreground">Recuperação de Créditos IRRF</p>
                  <div className="mt-3 pt-3 border-t border-border flex justify-between">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Valor</p>
                      <p className="font-medium">R$ 150.000,00</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Início</p>
                      <p className="font-medium">10/05/2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FileBox className="h-5 w-5" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Ativo</Badge>
                  </div>
                  <h3 className="font-medium">Secretaria Estadual de Educação</h3>
                  <p className="text-sm text-muted-foreground">Auditoria Fiscal Completa</p>
                  <div className="mt-3 pt-3 border-t border-border flex justify-between">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Valor</p>
                      <p className="font-medium">R$ 85.000,00</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Início</p>
                      <p className="font-medium">20/05/2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FileBox className="h-5 w-5" />
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300">Pendente</Badge>
                  </div>
                  <h3 className="font-medium">Departamento de Infraestrutura</h3>
                  <p className="text-sm text-muted-foreground">Recuperação de Créditos Tributários</p>
                  <div className="mt-3 pt-3 border-t border-border flex justify-between">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Valor</p>
                      <p className="font-medium">R$ 120.000,00</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Início</p>
                      <p className="font-medium">01/06/2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Relatórios Comerciais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="border shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      Resumo de Propostas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Visão geral das propostas e taxas de conversão</p>
                    <Button variant="outline" className="w-full mt-4 text-xs h-8">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <CircleDollarSign className="h-4 w-4 mr-2 text-primary" />
                      Desempenho Financeiro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Análise financeira de contratos e receitas</p>
                    <Button variant="outline" className="w-full mt-4 text-xs h-8">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Desempenho de Representantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Análise de desempenho da equipe comercial</p>
                    <Button variant="outline" className="w-full mt-4 text-xs h-8">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommercialProposals;
