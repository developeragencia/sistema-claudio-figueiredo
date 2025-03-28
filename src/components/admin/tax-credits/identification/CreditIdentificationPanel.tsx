
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  List, 
  FileSpreadsheet, 
  AlertCircle, 
  Download, 
  UploadCloud, 
  CheckCircle, 
  FileBarChart2,
  Calendar,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CreditIdentificationPanel = () => {
  const [activeOpportunity, setActiveOpportunity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [period, setPeriod] = useState('all');

  // Mock data for opportunities
  const opportunities = [
    { 
      id: 'opp1', 
      title: 'Crédito tributário de PIS/COFINS', 
      source: 'Notas fiscais de entrada', 
      value: 'R$ 15.750,25', 
      status: 'pending',
      date: '12/05/2023'
    },
    { 
      id: 'opp2', 
      title: 'Recuperação de IRRF sobre serviços', 
      source: 'Folha de pagamento', 
      value: 'R$ 8.320,10', 
      status: 'verified',
      date: '23/04/2023'
    },
    { 
      id: 'opp3', 
      title: 'Compensação de ICMS', 
      source: 'Apuração mensal', 
      value: 'R$ 21.543,75', 
      status: 'processing',
      date: '05/06/2023'
    },
    { 
      id: 'opp4', 
      title: 'Crédito presumido de IPI', 
      source: 'Registros de exportação', 
      value: 'R$ 12.890,30', 
      status: 'verified',
      date: '17/03/2023'
    },
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = status === 'all' || opp.status === status;
    return matchesSearch && matchesStatus;
  });

  const handleExportData = () => {
    toast.success("Exportando dados", {
      description: "Os dados estão sendo exportados para CSV."
    });
  };

  const handleRunAnalysis = () => {
    toast.success("Análise iniciada", {
      description: "Uma nova análise de identificação de créditos foi iniciada."
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>;
      case 'verified':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Verificado</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Em processamento</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Identificação de Créditos</h1>
        <div className="flex gap-2">
          <Button onClick={handleRunAnalysis} size="sm">
            <Search className="mr-2 h-4 w-4" />
            Nova Análise
          </Button>
          <Button variant="outline" onClick={handleExportData} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="filters">Filtros</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="imports">Importações</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar oportunidades..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="verified">Verificado</SelectItem>
                <SelectItem value="processing">Em processamento</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary" />
                  Oportunidades Identificadas
                </CardTitle>
                <CardDescription>
                  Créditos tributários identificados automaticamente pelo sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredOpportunities.length > 0 ? (
                  <div className="overflow-auto max-h-[300px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOpportunities.map((opp) => (
                          <TableRow 
                            key={opp.id} 
                            className={`cursor-pointer hover:bg-muted/50 ${activeOpportunity === opp.id ? 'bg-primary/10' : ''}`}
                            onClick={() => setActiveOpportunity(opp.id)}
                          >
                            <TableCell className="font-medium">{opp.title}</TableCell>
                            <TableCell>{opp.value}</TableCell>
                            <TableCell>{getStatusBadge(opp.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] border rounded-md bg-muted/20">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Nenhuma oportunidade encontrada</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Detalhamento
                </CardTitle>
                <CardDescription>
                  Análise detalhada da origem e cálculos dos créditos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeOpportunity ? (
                  <div className="space-y-4">
                    {opportunities.find(opp => opp.id === activeOpportunity) && (
                      <>
                        <div className="space-y-2">
                          <h3 className="font-medium">
                            {opportunities.find(opp => opp.id === activeOpportunity)?.title}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex flex-col">
                              <span className="text-muted-foreground">Origem</span>
                              <span className="font-medium">
                                {opportunities.find(opp => opp.id === activeOpportunity)?.source}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-muted-foreground">Data</span>
                              <span className="font-medium">
                                {opportunities.find(opp => opp.id === activeOpportunity)?.date}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-muted-foreground">Status</span>
                              <span>
                                {getStatusBadge(opportunities.find(opp => opp.id === activeOpportunity)?.status || '')}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-muted-foreground">Valor Estimado</span>
                              <span className="font-medium text-green-600">
                                {opportunities.find(opp => opp.id === activeOpportunity)?.value}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Documentação relacionada</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 cursor-pointer">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="text-sm">Relatório de Análise Fiscal.pdf</span>
                              </div>
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 cursor-pointer">
                              <div className="flex items-center">
                                <FileBarChart2 className="h-4 w-4 mr-2 text-green-500" />
                                <span className="text-sm">Cálculo de Créditos.xlsx</span>
                              </div>
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-2">
                          <Button variant="outline" size="sm">Rejeitar</Button>
                          <Button size="sm">Aprovar</Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center border rounded-md bg-muted/20">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Selecione uma oportunidade para ver os detalhes</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Análise</CardTitle>
              <CardDescription>
                Configure os filtros para identificação de créditos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Período de análise</label>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <span className="text-xs text-muted-foreground">De</span>
                        <Input type="date" />
                      </div>
                      <div className="w-full">
                        <span className="text-xs text-muted-foreground">Até</span>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipos de impostos</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pis-cofins" className="rounded border-gray-300" />
                        <label htmlFor="pis-cofins" className="text-sm">PIS/COFINS</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="icms" className="rounded border-gray-300" />
                        <label htmlFor="icms" className="text-sm">ICMS</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="ipi" className="rounded border-gray-300" />
                        <label htmlFor="ipi" className="text-sm">IPI</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="irrf" className="rounded border-gray-300" />
                        <label htmlFor="irrf" className="text-sm">IRRF</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Valor mínimo (R$)</label>
                    <Input type="number" placeholder="0,00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Origem</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nf">Notas Fiscais</SelectItem>
                        <SelectItem value="folha">Folha de Pagamento</SelectItem>
                        <SelectItem value="servicos">Serviços Prestados</SelectItem>
                        <SelectItem value="exportacao">Operações de Exportação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Limpar Filtros</Button>
                  <Button>Aplicar Filtros</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                Histórico de Análises
              </CardTitle>
              <CardDescription>
                Registro de todas as análises realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Créditos Identificados</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>15/03/2023</TableCell>
                      <TableCell>PIS/COFINS</TableCell>
                      <TableCell>R$ 45.320,75</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Concluído</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>22/02/2023</TableCell>
                      <TableCell>IRRF</TableCell>
                      <TableCell>R$ 12.450,90</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Concluído</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10/01/2023</TableCell>
                      <TableCell>ICMS</TableCell>
                      <TableCell>R$ 28.750,15</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Em revisão</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                Importação de Dados
              </CardTitle>
              <CardDescription>
                Importe dados para análise de créditos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">Solte arquivos aqui ou clique para upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Formatos suportados: CSV, XLS, XLSX, XML (NF-e)
                  </p>
                  <Button>
                    Selecionar Arquivos
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Importações recentes</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileBarChart2 className="h-5 w-5 mr-3 text-green-500" />
                        <div>
                          <p className="font-medium">NotasFiscais_Mar2023.xlsx</p>
                          <p className="text-xs text-muted-foreground">Importado em 16/03/2023 - 320 registros</p>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileBarChart2 className="h-5 w-5 mr-3 text-green-500" />
                        <div>
                          <p className="font-medium">Folha_Pagamento_Q1_2023.csv</p>
                          <p className="text-xs text-muted-foreground">Importado em 10/02/2023 - 145 registros</p>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditIdentificationPanel;
