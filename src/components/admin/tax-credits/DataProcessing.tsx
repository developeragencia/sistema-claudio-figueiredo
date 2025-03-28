
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Check, Clock, RefreshCw, Ban, FileUp, 
  Search, Filter, Database, Server, ArrowRight 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const DataProcessing = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [processingActive, setProcessingActive] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Mock data processing jobs
  const processingJobs = [
    { 
      id: 'JOB-001', 
      name: 'Processamento XML Fiscal - ABC Ltda', 
      status: 'completed', 
      progress: 100, 
      type: 'xml_processing',
      date: '15/04/2023',
      client: 'ABC Ltda',
      records: 1247
    },
    { 
      id: 'JOB-002', 
      name: 'Extração de Notas Fiscais - XYZ S.A.', 
      status: 'processing', 
      progress: 67, 
      type: 'invoice_extraction',
      date: '28/04/2023',
      client: 'XYZ S.A.',
      records: 875
    },
    { 
      id: 'JOB-003', 
      name: 'Análise de Guias de Recolhimento - Delta', 
      status: 'queued', 
      progress: 0, 
      type: 'payment_analysis',
      date: '02/05/2023',
      client: 'Delta Comércio',
      records: 321
    },
    { 
      id: 'JOB-004', 
      name: 'Processamento SPED - Gama Indústria', 
      status: 'failed', 
      progress: 42, 
      type: 'sped_processing',
      date: '21/04/2023',
      client: 'Gama Indústria',
      records: 1980
    },
    { 
      id: 'JOB-005', 
      name: 'Importação ECD - Beta Serviços', 
      status: 'completed', 
      progress: 100, 
      type: 'ecd_import',
      date: '10/04/2023',
      client: 'Beta Serviços',
      records: 534
    },
  ];

  const filteredJobs = processingJobs.filter(job => 
    job.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobsByStatus = (status: string) => {
    if (status === 'all') return filteredJobs;
    return filteredJobs.filter(job => job.status === status);
  };

  const handleStartProcessing = () => {
    setProcessingActive(true);
    setProcessingProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessingActive(false);
          
          toast({
            title: "Processamento concluído",
            description: "Os dados foram processados com sucesso.",
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <RefreshCw className="h-3 w-3" />
            Processando
          </Badge>
        );
      case 'queued':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3" />
            Na Fila
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <Ban className="h-3 w-3" />
            Falha
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDashboardStats = () => {
    const completed = processingJobs.filter(job => job.status === 'completed').length;
    const processing = processingJobs.filter(job => job.status === 'processing').length;
    const queued = processingJobs.filter(job => job.status === 'queued').length;
    const failed = processingJobs.filter(job => job.status === 'failed').length;
    
    const totalRecords = processingJobs.reduce((sum, job) => sum + job.records, 0);
    
    return { completed, processing, queued, failed, totalRecords };
  };

  const stats = getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Processamento de Dados</h2>
          <p className="text-muted-foreground">
            Gerenciamento, monitoramento e execução de processamento de dados fiscais.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" />
            Importar Dados
          </Button>
          <Button 
            className="flex items-center gap-2" 
            onClick={handleStartProcessing}
            disabled={processingActive}
          >
            {processingActive ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Database className="h-4 w-4" />
                Novo Processamento
              </>
            )}
          </Button>
        </div>
      </div>

      {processingActive && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Processamento em Andamento</CardTitle>
            <CardDescription>
              Processando arquivos fiscais para identificação de créditos tributários.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso:</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Processando registros... Por favor, aguarde a conclusão do processamento.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingJobs.length}</div>
            <p className="text-xs text-muted-foreground">Jobs de processamento no sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Jobs finalizados com sucesso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Processamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
            <p className="text-xs text-muted-foreground">Jobs em execução</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Na Fila</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.queued}</div>
            <p className="text-xs text-muted-foreground">Jobs aguardando processamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalRecords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total de registros processados</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Busca e Filtros</CardTitle>
          <CardDescription>
            Localize jobs de processamento por ID, nome ou cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID, nome ou cliente..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="processing">Em Processamento</TabsTrigger>
          <TabsTrigger value="queued">Na Fila</TabsTrigger>
          <TabsTrigger value="failed">Com Falha</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Jobs de Processamento</CardTitle>
              <CardDescription>
                {activeTab === 'all' ? 'Lista de todos os jobs de processamento.' : 
                  activeTab === 'completed' ? 'Jobs de processamento concluídos.' :
                  activeTab === 'processing' ? 'Jobs de processamento em execução.' :
                  activeTab === 'queued' ? 'Jobs de processamento na fila.' :
                  'Jobs de processamento com falha.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 text-sm font-medium">
                  <div>ID</div>
                  <div>Nome</div>
                  <div>Cliente</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {filteredJobsByStatus(activeTab).length > 0 ? (
                    filteredJobsByStatus(activeTab).map((job) => (
                      <div key={job.id} className="grid grid-cols-5 p-3 text-sm">
                        <div>{job.id}</div>
                        <div className="truncate max-w-[200px]">{job.name}</div>
                        <div>{job.client}</div>
                        <div>{getStatusBadge(job.status)}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Server className="mr-2 h-4 w-4" />
                            Detalhes
                          </Button>
                          {job.status === 'failed' && (
                            <Button variant="ghost" size="sm" className="h-8">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Tentar Novamente
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      Nenhum job encontrado para os filtros selecionados.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {activeTab === 'processing' && filteredJobsByStatus('processing').length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Jobs Ativos</h3>
          {filteredJobsByStatus('processing').map(job => (
            <Card key={job.id} className="border-blue-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{job.name}</CardTitle>
                    <CardDescription>{job.id} • {job.client}</CardDescription>
                  </div>
                  {getStatusBadge(job.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso:</span>
                    <span>{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Iniciado em: {job.date}</span>
                    <span>Registros: {job.records.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataProcessing;
