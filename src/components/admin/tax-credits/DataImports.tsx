
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileUp, FolderUp, FileText, Filter, Clock, 
  CheckCircle, XCircle, Calendar, Info, List, ArrowDownCircle,
  Settings, Trash2, Search, RefreshCw
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DataImports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("imports");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [importType, setImportType] = useState("xml");
  const [clientFilter, setClientFilter] = useState("all");
  
  // Mock import history data
  const importHistory = [
    { 
      id: 'IMP-001', 
      name: 'Notas Fiscais - Abril 2023', 
      type: 'xml', 
      client: 'ABC Comércio', 
      status: 'completed', 
      date: '15/04/2023', 
      size: '4.2 MB',
      records: 127
    },
    { 
      id: 'IMP-002', 
      name: 'SPED Contribuições Q1', 
      type: 'sped', 
      client: 'XYZ Indústria', 
      status: 'processing', 
      date: '28/04/2023', 
      size: '8.7 MB',
      records: 356
    },
    { 
      id: 'IMP-003', 
      name: 'Guias de Recolhimento - Março', 
      type: 'darf', 
      client: 'Delta Serviços', 
      status: 'failed', 
      date: '10/04/2023', 
      size: '1.3 MB',
      records: 42
    },
    { 
      id: 'IMP-004', 
      name: 'EFD ICMS/IPI - Q1', 
      type: 'efd', 
      client: 'Gama Ltda', 
      status: 'completed', 
      date: '05/04/2023', 
      size: '12.5 MB',
      records: 589
    },
    { 
      id: 'IMP-005', 
      name: 'Escrituração Contábil Digital', 
      type: 'ecd', 
      client: 'Beta Consultoria', 
      status: 'completed', 
      date: '22/03/2023', 
      size: '6.8 MB',
      records: 211
    },
  ];

  // Mock clients list for filter
  const clients = [
    { id: 'client1', name: 'ABC Comércio' },
    { id: 'client2', name: 'XYZ Indústria' },
    { id: 'client3', name: 'Delta Serviços' },
    { id: 'client4', name: 'Gama Ltda' },
    { id: 'client5', name: 'Beta Consultoria' },
  ];

  // Mock import format cards data
  const importFormats = [
    { id: 'xml', name: 'XML Nota Fiscal', description: 'NFe, NFSe, CTe e outros documentos fiscais', icon: <FileText /> },
    { id: 'sped', name: 'SPED Fiscal', description: 'Escrituração Fiscal Digital ICMS/IPI', icon: <FileText /> },
    { id: 'efd', name: 'EFD Contribuições', description: 'PIS/COFINS e outras contribuições', icon: <FileText /> },
    { id: 'ecd', name: 'ECD', description: 'Escrituração Contábil Digital', icon: <FileText /> },
    { id: 'darf', name: 'DARF', description: 'Guias de recolhimento de impostos', icon: <FileText /> },
  ];

  const filteredImports = importHistory.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClient = clientFilter === 'all' || item.client === clientFilter;
    
    return matchesSearch && matchesClient;
  });

  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: "Upload concluído",
        description: "Seus arquivos foram enviados e estão sendo processados.",
      });
    }, 2000);
  };

  const handleSelectImportType = (type: string) => {
    setImportType(type);
    setActiveTab("upload");
    
    toast({
      title: "Formato selecionado",
      description: `Formato de importação ${type.toUpperCase()} selecionado.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
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
      case 'failed':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3" />
            Falha
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Importação de Dados</h2>
          <p className="text-muted-foreground">
            Importe dados fiscais para processamento e análise de créditos tributários.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "upload" ? "default" : "outline"} 
            className="flex items-center gap-2"
            onClick={() => setActiveTab("upload")}
          >
            <FileUp className="h-4 w-4" />
            Upload de Arquivos
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="imports">Importações</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="imports" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtros de Busca</CardTitle>
              <CardDescription>
                Filtre o histórico de importações por cliente ou tipo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="Buscar por ID, nome ou cliente..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full sm:w-64 space-y-2">
                  <Label htmlFor="client-filter">Cliente</Label>
                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger id="client-filter">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os clientes</SelectItem>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="hidden sm:flex items-end">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => { setSearchQuery(""); setClientFilter("all"); }}>
                    <Trash2 className="h-4 w-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
              <CardDescription>
                Histórico de importações de dados fiscais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                  <div>ID</div>
                  <div>Nome</div>
                  <div>Cliente</div>
                  <div>Data</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {filteredImports.length > 0 ? (
                    filteredImports.map((item) => (
                      <div key={item.id} className="grid grid-cols-6 p-3 text-sm">
                        <div>{item.id}</div>
                        <div className="truncate max-w-[200px]">{item.name}</div>
                        <div>{item.client}</div>
                        <div>{item.date}</div>
                        <div>{getStatusBadge(item.status)}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Info className="mr-2 h-4 w-4" />
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      Nenhum resultado encontrado.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Arquivos Fiscais</CardTitle>
              <CardDescription>
                Selecione um cliente e faça o upload dos arquivos fiscais para importação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="upload-client">Cliente</Label>
                  <Select>
                    <SelectTrigger id="upload-client">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="import-type">Tipo de Importação</Label>
                  <Select value={importType} onValueChange={setImportType}>
                    <SelectTrigger id="import-type">
                      <SelectValue placeholder="Selecione o tipo de importação" />
                    </SelectTrigger>
                    <SelectContent>
                      {importFormats.map(format => (
                        <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="upload-period">Período</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="upload-period-start" type="text" placeholder="Data Inicial" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="upload-period-end" type="text" placeholder="Data Final" className="pl-9" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Arquivos</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <FolderUp className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Clique para escolher ou arraste seus arquivos aqui</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Suporta arquivos {importType.toUpperCase()} até 50MB
                        </p>
                      </div>
                      <Input id="file-upload" type="file" multiple className="hidden" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setActiveTab("imports")}>Cancelar</Button>
                  <Button onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <ArrowDownCircle className="mr-2 h-4 w-4" />
                        Iniciar Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-lg font-medium mt-6">Formatos Suportados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {importFormats.map((format) => (
              <Card 
                key={format.id} 
                className={`cursor-pointer transition-all ${importType === format.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                onClick={() => handleSelectImportType(format.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${importType === format.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {format.icon}
                    </div>
                    <CardTitle className="text-base">{format.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Importação</CardTitle>
              <CardDescription>
                Configure padrões e preferências para as importações de dados fiscais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-client">Cliente Padrão</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="default-client">
                    <SelectValue placeholder="Selecione um cliente padrão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum (perguntar sempre)</SelectItem>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-type">Tipo de Importação Padrão</Label>
                <Select defaultValue="xml">
                  <SelectTrigger id="default-type">
                    <SelectValue placeholder="Selecione um tipo padrão" />
                  </SelectTrigger>
                  <SelectContent>
                    {importFormats.map(format => (
                      <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retention-period">Período de Retenção</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="retention-period">
                    <SelectValue placeholder="Selecione o período de retenção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">180 dias</SelectItem>
                    <SelectItem value="365">1 ano</SelectItem>
                    <SelectItem value="forever">Indefinidamente</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tempo que os arquivos importados permanecerão armazenados antes de serem automaticamente excluídos.
                </p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Automação de Importação</CardTitle>
              <CardDescription>
                Configure regras para importações automáticas programadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg border bg-muted/50">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <p className="text-sm">
                    A automação de importações está disponível para assinantes do plano Premium. 
                    <Button variant="link" className="h-auto p-0 ml-1">Atualizar plano</Button>
                  </p>
                </div>
                
                <div className="px-4 py-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <List className="h-5 w-5 text-muted-foreground" />
                    <p className="font-medium">Recursos da Automação de Importação:</p>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                      Importações agendadas diárias, semanais ou mensais
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                      Monitoramento automático de diretórios
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                      Integração com APIs de sistemas ERP
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                      Notificações automáticas por e-mail
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataImports;
