
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Search, 
  Send,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdated: string;
  department: string;
}

const SupportContent: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock support tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-2023-001',
      title: 'Erro ao gerar relatório fiscal',
      status: 'open',
      priority: 'high',
      createdAt: '2023-08-10T14:30:00Z',
      lastUpdated: '2023-08-12T10:15:00Z',
      department: 'Suporte Técnico'
    },
    {
      id: 'TKT-2023-002',
      title: 'Dúvida sobre cálculo de crédito tributário',
      status: 'pending',
      priority: 'medium',
      createdAt: '2023-08-05T09:45:00Z',
      lastUpdated: '2023-08-07T16:20:00Z',
      department: 'Suporte Fiscal'
    },
    {
      id: 'TKT-2023-003',
      title: 'Solicitação de novo recurso',
      status: 'closed',
      priority: 'low',
      createdAt: '2023-07-28T11:30:00Z',
      lastUpdated: '2023-08-02T13:10:00Z',
      department: 'Desenvolvimento'
    }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitMessage = () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      setMessage('');
      setIsLoading(false);
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso. Nossa equipe responderá em breve.",
      });
    }, 1000);
  };

  const handleCreateTicket = () => {
    toast({
      title: "Novo chamado",
      description: "Formulário para abertura de chamado disponibilizado.",
    });
  };
  
  const handleRefreshTickets = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Chamados atualizados",
        description: "A lista de chamados foi atualizada com sucesso.",
      });
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-700';
      case 'pending':
        return 'bg-amber-500/20 text-amber-700';
      case 'closed':
        return 'bg-gray-500/20 text-gray-700';
      default:
        return '';
    }
  };

  const getStatusText = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'pending':
        return 'Aguardando';
      case 'closed':
        return 'Fechado';
      default:
        return '';
    }
  };

  const getPriorityBadgeClass = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-700';
      case 'medium':
        return 'bg-amber-500/20 text-amber-700';
      case 'low':
        return 'bg-blue-500/20 text-blue-700';
      default:
        return '';
    }
  };

  const getPriorityText = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return '';
    }
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Suporte</h1>
          <p className="text-muted-foreground">
            Central de ajuda e suporte ao usuário
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="default" 
            className="w-full sm:w-auto"
            onClick={handleCreateTicket}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Novo Chamado
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleRefreshTickets}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tickets">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">
            <MessageSquare className="h-4 w-4 mr-2" />
            Meus Chamados
          </TabsTrigger>
          <TabsTrigger value="docs">
            <FileText className="h-4 w-4 mr-2" />
            Documentação
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="h-4 w-4 mr-2" />
            Contato
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar chamados por título ou ID..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {filteredTickets.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">Nenhum chamado encontrado</h3>
                <p className="text-muted-foreground">
                  Não há chamados correspondentes à sua busca.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription>ID: {ticket.id} • {ticket.department}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                          {getStatusText(ticket.status)}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadgeClass(ticket.priority)}`}>
                          {getPriorityText(ticket.priority)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>Criado em: {formatDate(ticket.createdAt)}</span>
                      </div>
                      <div>
                        Última atualização: {formatDate(ticket.lastUpdated)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-2">
                    <Button variant="ghost" size="sm">
                      Ver detalhes
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="docs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentação e Tutoriais</CardTitle>
              <CardDescription>
                Acesse guias e documentação para usar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Guia de Início Rápido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Aprenda os conceitos básicos para começar a usar o sistema.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="p-0 h-auto" size="sm">
                      Ler guia
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Manual do Usuário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Documentação completa com todas as funcionalidades do sistema.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="p-0 h-auto" size="sm">
                      Ler manual
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Tutoriais em Vídeo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Aprenda através de vídeos tutoriais passo a passo.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="p-0 h-auto" size="sm">
                      Ver vídeos
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      FAQ - Perguntas Frequentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Respostas para as dúvidas mais comuns dos usuários.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="p-0 h-auto" size="sm">
                      Ver FAQ
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
                <CardDescription>
                  Fale diretamente com nossa equipe de suporte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">+55 (11) 4444-5555</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-muted-foreground">suporte@sistemasclaudio.com.br</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1">Horário de Atendimento</p>
                  <p className="text-muted-foreground text-sm">Segunda a Sexta-feira</p>
                  <p className="text-muted-foreground text-sm">Das 9h às 18h</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Envie uma Mensagem</CardTitle>
                <CardDescription>
                  Nossa equipe responderá o mais breve possível
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1.5">Assunto</p>
                  <Input placeholder="Digite o assunto da sua mensagem" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1.5">Mensagem</p>
                  <Textarea 
                    placeholder="Descreva detalhadamente sua dúvida ou problema..." 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleSubmitMessage}
                  disabled={!message.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportContent;
