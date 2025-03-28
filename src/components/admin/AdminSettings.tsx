
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Loader2, Check, AlarmClock, Globe, Shield, Bell, Key, Mail, Building, User, PenLine, Settings as SettingsIcon, Server } from 'lucide-react';
import { DollarSign, FileText } from 'lucide-react';
import AdminProfileSettings from './profile/AdminProfileSettings';

const AdminSettings = ({ user }: { user?: any }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState('Sistemas Claudio Figueiredo');
  const [adminEmail, setAdminEmail] = useState(user?.email || 'admin@sistemasclaudio.com');
  const [siteUrl, setSiteUrl] = useState('https://sistemasclaudio.com');
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [smtpServer, setSmtpServer] = useState('');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleSaveGeneral = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações gerais foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram salvas.",
        variant: "default",
      });
    }, 1000);
  };

  const handleSaveSystem = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações do sistema salvas",
        description: "As configurações do sistema foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleSaveIntegrations = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações de integrações salvas",
        description: "As configurações de API e integrações foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
      </motion.div>
      
      <Tabs defaultValue="profile" className="w-full">
        <motion.div variants={itemVariants}>
          <TabsList className="grid grid-cols-5 sm:w-auto w-full max-w-md mb-6">
            <TabsTrigger value="profile" className="flex items-center justify-center">
              <User className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center justify-center">
              <PenLine className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Geral</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center justify-center">
              <Server className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Sistema</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center justify-center">
              <Shield className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Notificações</span>
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <TabsContent value="profile" className="mt-0">
          <AdminProfileSettings />
        </TabsContent>
        
        <TabsContent value="general" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Gerencie as configurações gerais do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-primary" />
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                  </div>
                  <Input 
                    id="company-name" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <Label htmlFor="admin-email">Email do Administrador</Label>
                  </div>
                  <Input 
                    id="admin-email" 
                    value={adminEmail} 
                    onChange={(e) => setAdminEmail(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <Label htmlFor="site-url">URL do Site</Label>
                  </div>
                  <Input 
                    id="site-url" 
                    value={siteUrl} 
                    onChange={(e) => setSiteUrl(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base">Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar tema escuro para todo o painel
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveGeneral} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="system" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5 mb-6">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Configurações técnicas e de infraestrutura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-primary" />
                    <Label htmlFor="database-url">URL do Banco de Dados</Label>
                  </div>
                  <Input 
                    id="database-url" 
                    value={databaseUrl} 
                    onChange={(e) => setDatabaseUrl(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                    placeholder="postgres://user:password@localhost:5432/dbname"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <Label htmlFor="smtp-server">Servidor SMTP</Label>
                    </div>
                    <Input 
                      id="smtp-server" 
                      value={smtpServer} 
                      onChange={(e) => setSmtpServer(e.target.value)} 
                      className="border-primary/20 focus-visible:ring-primary"
                      placeholder="smtp.example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <Label htmlFor="smtp-port">Porta SMTP</Label>
                    </div>
                    <Input 
                      id="smtp-port" 
                      value={smtpPort} 
                      onChange={(e) => setSmtpPort(e.target.value)} 
                      className="border-primary/20 focus-visible:ring-primary"
                      placeholder="587"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <Label htmlFor="smtp-user">Usuário SMTP</Label>
                    </div>
                    <Input 
                      id="smtp-user" 
                      value={smtpUser} 
                      onChange={(e) => setSmtpUser(e.target.value)} 
                      className="border-primary/20 focus-visible:ring-primary"
                      placeholder="user@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-primary" />
                      <Label htmlFor="smtp-password">Senha SMTP</Label>
                    </div>
                    <Input 
                      id="smtp-password"
                      type="password" 
                      value={smtpPassword} 
                      onChange={(e) => setSmtpPassword(e.target.value)} 
                      className="border-primary/20 focus-visible:ring-primary"
                      placeholder="********"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSystem} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Configurações do Sistema
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Integrações e APIs</CardTitle>
                <CardDescription>
                  Configurações de integrações com serviços externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-primary" />
                    <Label htmlFor="api-key">Chave da API</Label>
                  </div>
                  <Input 
                    id="api-key" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                    placeholder="sk_live_xxxxx"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-api" className="text-base">Habilitar API</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar acesso à API para integrações externas
                    </p>
                  </div>
                  <Switch id="enable-api" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveIntegrations} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Configurações de API
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>
                  Gerencie as configurações de segurança do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="text-base">Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar autenticação de dois fatores para maior segurança
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout" className="text-base">Tempo Limite de Sessão</Label>
                    <p className="text-sm text-muted-foreground">
                      Encerrar sessões inativas após 30 minutos
                    </p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-logs" className="text-base">Registros de Auditoria</Label>
                    <p className="text-sm text-muted-foreground">
                      Manter registros detalhados de todas as ações realizadas no sistema
                    </p>
                  </div>
                  <Switch id="audit-logs" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction" className="text-base">Restrição de IP</Label>
                    <p className="text-sm text-muted-foreground">
                      Limitar acesso ao sistema apenas a IPs autorizados
                    </p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveGeneral} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Configurações de Segurança
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Gerencie suas preferências de notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "new-users", title: "Novos Usuários", desc: "Receber notificações sobre novos usuários cadastrados", icon: <User className="h-4 w-4 text-primary" /> },
                  { id: "financial", title: "Atividades Financeiras", desc: "Receber notificações sobre transações financeiras", icon: <DollarSign className="h-4 w-4 text-primary" /> },
                  { id: "reports", title: "Relatórios", desc: "Receber notificações sobre novos relatórios gerados", icon: <FileText className="h-4 w-4 text-primary" /> },
                  { id: "system", title: "Atualizações do Sistema", desc: "Receber notificações sobre atualizações do sistema", icon: <Globe className="h-4 w-4 text-primary" /> },
                  { id: "events", title: "Eventos", desc: "Receber notificações sobre eventos agendados", icon: <AlarmClock className="h-4 w-4 text-primary" /> }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-2 py-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">{item.icon}</div>
                      <div className="space-y-0.5">
                        <Label htmlFor={`notification-${item.id}`} className="text-base font-medium cursor-pointer">
                          {item.title}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <Switch 
                      id={`notification-${item.id}`} 
                      defaultChecked={item.id !== "events"} 
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveNotifications} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Preferências
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminSettings;
