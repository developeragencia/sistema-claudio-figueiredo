
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Bell, Shield, Lock, Eye, EyeOff, Save, RefreshCw } from "lucide-react";
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

const AccessProtectionContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [isBruteForceProtectionEnabled, setIsBruteForceProtectionEnabled] = useState(true);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [lockoutDuration, setLockoutDuration] = useState(30);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Sample suspicious activities
  const suspiciousActivities = [
    {
      id: '1',
      timestamp: '15/03/2023 14:32:45',
      user: 'desconhecido',
      ipAddress: '203.0.113.1',
      activity: 'Múltiplas tentativas de login com senha incorreta',
      status: 'Bloqueado'
    },
    {
      id: '2',
      timestamp: '14/03/2023 23:15:22',
      user: 'maria@sistemasclaudio.com',
      ipAddress: '198.51.100.1',
      activity: 'Login a partir de localização incomum',
      status: 'Alertado'
    },
    {
      id: '3',
      timestamp: '13/03/2023 08:45:10',
      user: 'admin@sistemasclaudio.com',
      ipAddress: '209.85.231.104',
      activity: 'Tentativa de acesso a área restrita',
      status: 'Negado'
    }
  ];

  const handleLoginSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configurações salvas",
      description: "As configurações de proteção de login foram atualizadas.",
    });
  };

  const handlePasswordSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configurações salvas",
      description: "As configurações de senha foram atualizadas.",
    });
  };

  const handleIpAllowlistSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Lista de IPs atualizada",
      description: "Lista de IPs permitidos foi atualizada com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Proteção de Acesso</h2>
          <p className="text-muted-foreground">
            Configure as medidas de proteção contra acessos indevidos
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="login">
            <Lock className="mr-2 h-4 w-4" />
            Proteção de Login
          </TabsTrigger>
          <TabsTrigger value="passwords">
            <Shield className="mr-2 h-4 w-4" />
            Política de Senhas
          </TabsTrigger>
          <TabsTrigger value="ip">
            <Lock className="mr-2 h-4 w-4" />
            Restrição IP
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="mr-2 h-4 w-4" />
            Alertas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proteção contra Força Bruta</CardTitle>
              <CardDescription>
                Configure a proteção contra tentativas repetidas de login
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSettingsSave} className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isBruteForceProtectionEnabled}
                    onCheckedChange={setIsBruteForceProtectionEnabled}
                    id="brute-force-protection"
                  />
                  <Label htmlFor="brute-force-protection">Habilitar proteção contra força bruta</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Número máximo de tentativas</Label>
                    <Input
                      id="max-attempts"
                      type="number"
                      min="1"
                      value={maxLoginAttempts}
                      onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value))}
                      disabled={!isBruteForceProtectionEnabled}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Duração do bloqueio (minutos)</Label>
                    <Input
                      id="lockout-duration"
                      type="number"
                      min="1"
                      value={lockoutDuration}
                      onChange={(e) => setLockoutDuration(parseInt(e.target.value))}
                      disabled={!isBruteForceProtectionEnabled}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Ações adicionais</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="notify-admin" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isBruteForceProtectionEnabled}
                      />
                      <Label htmlFor="notify-admin">Notificar administradores</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="captcha" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isBruteForceProtectionEnabled}
                      />
                      <Label htmlFor="captcha">Exigir CAPTCHA após falha</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="log-attempts" 
                        className="h-4 w-4" 
                        defaultChecked 
                        disabled={!isBruteForceProtectionEnabled}
                      />
                      <Label htmlFor="log-attempts">Registrar tentativas de login</Label>
                    </div>
                  </div>
                </div>
                
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Autenticação em Dois Fatores (2FA)</CardTitle>
              <CardDescription>Configure a autenticação em dois fatores para maior segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Tornar 2FA obrigatório</h4>
                  <p className="text-sm text-muted-foreground">
                    Exigir 2FA para todos os usuários
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Autenticador por app</h4>
                  <p className="text-sm text-muted-foreground">
                    Permitir authenticador por aplicativo (Google, Microsoft, etc)
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">SMS / Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Permitir verificação por SMS ou e-mail
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações 2FA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="passwords" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Política de Senhas</CardTitle>
              <CardDescription>
                Configure os requisitos mínimos para senhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSettingsSave} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="min-length">Comprimento mínimo</Label>
                  <Input
                    id="min-length"
                    type="number"
                    min="6"
                    defaultValue={8}
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Requisitos de complexidade</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="require-uppercase" 
                        className="h-4 w-4" 
                        defaultChecked 
                      />
                      <Label htmlFor="require-uppercase">Exigir letra maiúscula</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="require-number" 
                        className="h-4 w-4" 
                        defaultChecked 
                      />
                      <Label htmlFor="require-number">Exigir número</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="require-special" 
                        className="h-4 w-4" 
                        defaultChecked 
                      />
                      <Label htmlFor="require-special">Exigir caractere especial</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiration">Expiração de senha (dias)</Label>
                  <Input
                    id="password-expiration"
                    type="number"
                    min="0"
                    defaultValue={90}
                  />
                  <p className="text-sm text-muted-foreground">
                    Use 0 para nunca expirar
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-history">Histórico de senhas</Label>
                  <Input
                    id="password-history"
                    type="number"
                    min="0"
                    defaultValue={5}
                  />
                  <p className="text-sm text-muted-foreground">
                    Número de senhas anteriores que não podem ser reutilizadas
                  </p>
                </div>
                
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Política de Senhas
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ip" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Restrição por IP</CardTitle>
              <CardDescription>
                Limite o acesso ao sistema por endereços IP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleIpAllowlistSave} className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="enable-ip-restrictions" defaultChecked />
                  <Label htmlFor="enable-ip-restrictions">Habilitar restrições por IP</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allowed-ips">IPs permitidos (um por linha)</Label>
                  <textarea
                    id="allowed-ips"
                    className="w-full min-h-[150px] p-2 rounded-md border"
                    defaultValue="192.168.1.1
192.168.1.2
192.168.1.0/24"
                  />
                  <p className="text-sm text-muted-foreground">
                    Você pode usar endereços IP individuais ou notação CIDR
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="block-unknown" 
                    className="h-4 w-4" 
                    defaultChecked 
                  />
                  <Label htmlFor="block-unknown">Bloquear todos os outros IPs</Label>
                </div>
                
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Lista de IPs
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Alertas</CardTitle>
              <CardDescription>
                Configure alertas para atividades suspeitas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Alertas por e-mail</h4>
                    <p className="text-sm text-muted-foreground">
                      Enviar alertas por e-mail para administradores
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Alertas no sistema</h4>
                    <p className="text-sm text-muted-foreground">
                      Mostrar alertas no painel do administrador
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Integração com SIEM</h4>
                    <p className="text-sm text-muted-foreground">
                      Enviar logs para sistema SIEM externo
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Eventos para alertar</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="alert-failed-login" 
                      className="h-4 w-4" 
                      defaultChecked 
                    />
                    <Label htmlFor="alert-failed-login">Tentativas de login malsucedidas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="alert-unusual-location" 
                      className="h-4 w-4" 
                      defaultChecked 
                    />
                    <Label htmlFor="alert-unusual-location">Login de localização incomum</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="alert-admin-actions" 
                      className="h-4 w-4" 
                      defaultChecked 
                    />
                    <Label htmlFor="alert-admin-actions">Ações administrativas críticas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="alert-password-changes" 
                      className="h-4 w-4" 
                      defaultChecked 
                    />
                    <Label htmlFor="alert-password-changes">Alterações de senha</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alert-emails">E-mails para alertas (separados por vírgula)</Label>
                <Input
                  id="alert-emails"
                  type="text"
                  defaultValue="admin@sistemasclaudio.com,security@sistemasclaudio.com"
                />
              </div>
              
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações de Alertas
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Suspeitas Recentes</CardTitle>
              <CardDescription>Registros de atividades consideradas suspeitas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Últimas atividades suspeitas detectadas</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Atividade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suspiciousActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.ipAddress}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'Bloqueado' ? 'bg-red-100 text-red-800' :
                          activity.status === 'Alertado' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
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

export default AccessProtectionContent;
