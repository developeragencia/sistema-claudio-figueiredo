
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, LogOut, Shield, Clock, UserX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const SessionExpirationPanel = () => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(true);
  const [timeoutMinutes, setTimeoutMinutes] = useState(30);
  const [warningMinutes, setWarningMinutes] = useState(5);
  const [activeTab, setActiveTab] = useState('settings');
  
  // Sample active sessions
  const activeSessions = [
    {
      id: '1',
      user: 'admin@sistemasclaudio.com',
      device: 'Chrome / Windows',
      ipAddress: '192.168.1.1',
      loginTime: '15/03/2023 14:32:45',
      lastActivity: '15/03/2023 15:45:12',
    },
    {
      id: '2',
      user: 'maria@sistemasclaudio.com',
      device: 'Firefox / macOS',
      ipAddress: '192.168.1.5',
      loginTime: '15/03/2023 16:23:08',
      lastActivity: '15/03/2023 16:45:30',
    },
    {
      id: '3',
      user: 'joao@sistemasclaudio.com',
      device: 'Safari / iOS',
      ipAddress: '192.168.1.10',
      loginTime: '16/03/2023 09:12:33',
      lastActivity: '16/03/2023 09:30:15',
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configurações salvas",
      description: `Tempo limite definido para ${timeoutMinutes} minutos com aviso ${warningMinutes} minutos antes.`,
    });
  };

  const handleTerminateSession = (sessionId: string) => {
    toast({
      title: "Sessão encerrada",
      description: "O usuário será desconectado em sua próxima solicitação.",
    });
  };

  const handleTerminateAllSessions = () => {
    toast({
      title: "Todas as sessões encerradas",
      description: "Todos os usuários, exceto você, serão desconectados.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Controle de Sessão</h2>
          <p className="text-muted-foreground">
            Configure a expiração automática de sessão e gerencie sessões ativas
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">
            <Clock className="mr-2 h-4 w-4" />
            Configurações de Timeout
          </TabsTrigger>
          <TabsTrigger value="sessions">
            <UserX className="mr-2 h-4 w-4" />
            Sessões Ativas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Expiração de Sessão</CardTitle>
              <CardDescription>
                Configure o tempo limite para encerramento automático de sessões inativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={setIsEnabled}
                    id="session-timeout"
                  />
                  <Label htmlFor="session-timeout">Habilitar expiração automática de sessão</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timeout-minutes">Tempo limite de inatividade (minutos)</Label>
                    <Input
                      id="timeout-minutes"
                      type="number"
                      min="1"
                      value={timeoutMinutes}
                      onChange={(e) => setTimeoutMinutes(parseInt(e.target.value))}
                      disabled={!isEnabled}
                    />
                    <p className="text-sm text-muted-foreground">
                      A sessão será encerrada após este período de inatividade
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="warning-minutes">Aviso prévio (minutos)</Label>
                    <Input
                      id="warning-minutes"
                      type="number"
                      min="1"
                      max={timeoutMinutes - 1}
                      value={warningMinutes}
                      onChange={(e) => setWarningMinutes(parseInt(e.target.value))}
                      disabled={!isEnabled}
                    />
                    <p className="text-sm text-muted-foreground">
                      O usuário receberá um aviso este tempo antes da expiração
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Comportamento após expiração</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="logout-action" 
                        name="expiration-action" 
                        value="logout" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isEnabled}
                      />
                      <Label htmlFor="logout-action">Encerrar sessão e redirecionar para login</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="warn-action" 
                        name="expiration-action" 
                        value="warn" 
                        className="h-4 w-4" 
                        disabled={!isEnabled}
                      />
                      <Label htmlFor="warn-action">Manter sessão e mostrar aviso</Label>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" disabled={!isEnabled}>Salvar Configurações</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Proteção Adicional</CardTitle>
              <CardDescription>Configurações adicionais de segurança para sessões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Bloqueio por IP</h4>
                  <p className="text-sm text-muted-foreground">
                    Bloquear acesso quando o IP mudar durante a sessão
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Limitar sessões simultâneas</h4>
                  <p className="text-sm text-muted-foreground">
                    Limitar o número de sessões ativas por usuário
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Renovação de token</h4>
                  <p className="text-sm text-muted-foreground">
                    Renovar token de autenticação periodicamente
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sessões Ativas</CardTitle>
              <CardDescription>
                Visualize e encerre sessões de usuários ativos no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista de sessões ativas no momento</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Login em</TableHead>
                    <TableHead>Última atividade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.user}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>{session.ipAddress}</TableCell>
                      <TableCell>{session.loginTime}</TableCell>
                      <TableCell>{session.lastActivity}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Encerrar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTerminateAllSessions}>
                <LogOut className="mr-2 h-4 w-4" />
                Encerrar Todas as Sessões
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar Lista
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionExpirationPanel;
