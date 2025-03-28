
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, Clock, Eye, Globe, Lock, Mail, Shield, Smartphone, User 
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const AccessProtectionPanel: React.FC = () => {
  const { toast } = useToast();
  const [failedLoginLimit, setFailedLoginLimit] = useState(5);
  const [isSuspiciousLoginEnabled, setIsSuspiciousLoginEnabled] = useState(true);
  const [isIPBlockingEnabled, setIsIPBlockingEnabled] = useState(true);
  const [isPasswordHistoryEnabled, setIsPasswordHistoryEnabled] = useState(true);
  const [passwordHistoryCount, setPasswordHistoryCount] = useState(5);
  const [isConfigSaving, setIsConfigSaving] = useState(false);

  const handleSaveConfig = () => {
    setIsConfigSaving(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsConfigSaving(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações de proteção de acesso foram atualizadas.",
      });
    }, 1500);
  };

  const handleTestAlert = () => {
    toast({
      title: "Alerta de teste enviado",
      description: "Um alerta de teste foi enviado para os administradores.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Proteção de Acessos</h2>
          <p className="text-muted-foreground">Monitore e proteja seu sistema contra tentativas de acesso suspeitas</p>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Nos últimos 7 dias, foram detectadas 3 tentativas de acesso suspeitas. Recomendamos revisar as configurações de segurança.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proteção de Login</CardTitle>
              <CardDescription>Configurações para proteger o sistema de tentativas de acesso indevido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Limite de tentativas falhas</Label>
                    <p className="text-sm text-muted-foreground">
                      Bloqueia o usuário após várias tentativas de login mal sucedidas
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      disabled={failedLoginLimit <= 1}
                      onClick={() => setFailedLoginLimit(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{failedLoginLimit}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      disabled={failedLoginLimit >= 10}
                      onClick={() => setFailedLoginLimit(prev => Math.min(10, prev + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Detecção de login suspeito</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerta sobre logins de novos dispositivos ou localizações
                    </p>
                  </div>
                  <Switch 
                    checked={isSuspiciousLoginEnabled} 
                    onCheckedChange={setIsSuspiciousLoginEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Bloqueio de IP</Label>
                    <p className="text-sm text-muted-foreground">
                      Bloqueia endereços IP com múltiplas tentativas falhas
                    </p>
                  </div>
                  <Switch 
                    checked={isIPBlockingEnabled} 
                    onCheckedChange={setIsIPBlockingEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Histórico de senhas</Label>
                    <p className="text-sm text-muted-foreground">
                      Previne a reutilização de senhas anteriores
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={isPasswordHistoryEnabled} 
                      onCheckedChange={setIsPasswordHistoryEnabled} 
                    />
                    {isPasswordHistoryEnabled && (
                      <Input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={passwordHistoryCount}
                        onChange={(e) => setPasswordHistoryCount(parseInt(e.target.value) || 1)}
                        className="w-16" 
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regras de Senha</CardTitle>
              <CardDescription>Configure a política de senhas do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="min-length">Comprimento mínimo</Label>
                      <span className="text-sm">8 caracteres</span>
                    </div>
                    <Input id="min-length" type="range" min="8" max="16" defaultValue="8" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="expiration">Expiração de senha</Label>
                      <span className="text-sm">90 dias</span>
                    </div>
                    <Input id="expiration" type="range" min="30" max="180" step="30" defaultValue="90" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Requisitos de complexidade</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="uppercase" defaultChecked />
                      <Label htmlFor="uppercase">Letras maiúsculas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lowercase" defaultChecked />
                      <Label htmlFor="lowercase">Letras minúsculas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="numbers" defaultChecked />
                      <Label htmlFor="numbers">Números</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="special" defaultChecked />
                      <Label htmlFor="special">Caracteres especiais</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitoring" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento de Acessos</CardTitle>
              <CardDescription>Atividades recentes e tentativas de acesso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <h4 className="font-medium">Tentativas de Acesso Recentes</h4>
                  <Badge variant="outline">Últimas 24h</Badge>
                </div>
                
                {[
                  { user: 'admin@example.com', time: '10:45', status: 'success', device: 'MacBook Pro', location: 'São Paulo, BR' },
                  { user: 'usuario@example.com', time: '09:30', status: 'success', device: 'iPhone', location: 'Rio de Janeiro, BR' },
                  { user: 'admin@example.com', time: '08:15', status: 'failed', device: 'Windows PC', location: 'New York, US' },
                  { user: 'desconhecido', time: '03:22', status: 'blocked', device: 'Android', location: 'Beijing, CN' },
                ].map((attempt, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center gap-2">
                      {attempt.status === 'success' && <User className="h-4 w-4 text-green-500" />}
                      {attempt.status === 'failed' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {attempt.status === 'blocked' && <Lock className="h-4 w-4 text-red-500" />}
                      <div>
                        <p className="font-medium">{attempt.user}</p>
                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{attempt.time}</span>
                          <Smartphone className="h-3 w-3" />
                          <span>{attempt.device}</span>
                          <Globe className="h-3 w-3" />
                          <span>{attempt.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        attempt.status === 'success' ? 'default' : 
                        attempt.status === 'failed' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {attempt.status === 'success' ? 'Sucesso' : 
                       attempt.status === 'failed' ? 'Falha' : 
                       'Bloqueado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>IPs Bloqueados</CardTitle>
              <CardDescription>Endereços IP bloqueados por tentativas suspeitas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { ip: '203.0.113.1', attempts: 12, date: '12/06/2023', location: 'Rússia' },
                  { ip: '198.51.100.7', attempts: 8, date: '15/06/2023', location: 'China' },
                ].map((ip, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{ip.ip}</p>
                      <p className="text-xs text-muted-foreground">
                        {ip.attempts} tentativas • Bloqueado em {ip.date} • {ip.location}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Desbloquear</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Defina como e quando receber alertas de segurança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Notificar sobre</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <Label htmlFor="login-attempt">Tentativas de login falhas</Label>
                      </div>
                      <Switch id="login-attempt" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="new-location">Novo local de acesso</Label>
                      </div>
                      <Switch id="new-location" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-green-500" />
                        <Label htmlFor="new-device">Novo dispositivo</Label>
                      </div>
                      <Switch id="new-device" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-red-500" />
                        <Label htmlFor="account-locked">Conta bloqueada</Label>
                      </div>
                      <Switch id="account-locked" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Canais de notificação</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Label htmlFor="email-notif">Email</Label>
                      </div>
                      <Switch id="email-notif" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Label htmlFor="sms-notif">SMS</Label>
                      </div>
                      <Switch id="sms-notif" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alert-emails">Emails para alerta</Label>
                  <Input 
                    id="alert-emails" 
                    placeholder="email1@exemplo.com, email2@exemplo.com" 
                    defaultValue="admin@sistemasclaudio.com" 
                  />
                  <p className="text-xs text-muted-foreground">Separe múltiplos emails com vírgulas</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleTestAlert}>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar alerta de teste
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Registros de Segurança</CardTitle>
          <CardDescription>Histórico de eventos de segurança recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                event: "Bloqueio de conta", 
                user: "usuario@example.com", 
                time: "Hoje, 08:45", 
                details: "Conta bloqueada após 5 tentativas falhas de login" 
              },
              { 
                event: "Login de nova localização", 
                user: "admin@example.com", 
                time: "Ontem, 14:30", 
                details: "Acesso detectado de uma nova localização: Rio de Janeiro, Brasil" 
              },
              { 
                event: "Alteração de senha", 
                user: "administrador@example.com", 
                time: "15/06/2023, 10:22", 
                details: "Senha alterada com sucesso" 
              },
            ].map((log, index) => (
              <div key={index} className="flex justify-between items-start border-b pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <p className="font-medium">{log.event}</p>
                  </div>
                  <p className="text-sm">{log.user}</p>
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                </div>
                <div className="text-sm max-w-xs text-right">
                  {log.details}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            <Eye className="mr-2 h-4 w-4" />
            Ver todos os registros
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Redefinir Padrões</Button>
        <Button onClick={handleSaveConfig} disabled={isConfigSaving}>
          {isConfigSaving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  );
};

export default AccessProtectionPanel;
