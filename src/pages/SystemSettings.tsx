import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const companySchema = z.object({
  name: z.string().min(1, 'O nome da empresa é obrigatório'),
  document: z.string().min(1, 'O CNPJ é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  state: z.string().min(1, 'O estado é obrigatório'),
  zip: z.string().min(1, 'O CEP é obrigatório')
});

const emailSchema = z.object({
  smtp_host: z.string().min(1, 'O host SMTP é obrigatório'),
  smtp_port: z.string().min(1, 'A porta SMTP é obrigatória'),
  smtp_user: z.string().min(1, 'O usuário SMTP é obrigatório'),
  smtp_password: z.string().min(1, 'A senha SMTP é obrigatória'),
  smtp_secure: z.boolean(),
  from_name: z.string().min(1, 'O nome do remetente é obrigatório'),
  from_email: z.string().email('E-mail do remetente inválido')
});

type CompanyFormData = z.infer<typeof companySchema>;
type EmailFormData = z.infer<typeof emailSchema>;

export function SystemSettings() {
  const { toast } = useToast();

  const companyForm = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema)
  });

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema)
  });

  const onCompanySubmit = async (data: CompanyFormData) => {
    try {
      // Implementar a lógica de atualização dos dados da empresa
      toast({
        title: 'Sucesso',
        description: 'Dados da empresa atualizados com sucesso.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar os dados da empresa.',
        variant: 'destructive'
      });
    }
  };

  const onEmailSubmit = async (data: EmailFormData) => {
    try {
      // Implementar a lógica de atualização das configurações de e-mail
      toast({
        title: 'Sucesso',
        description: 'Configurações de e-mail atualizadas com sucesso.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar as configurações de e-mail.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais do sistema
        </p>
      </div>

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Dados da Empresa</TabsTrigger>
          <TabsTrigger value="email">Configurações de E-mail</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>
                Configure os dados da sua empresa que serão exibidos nos documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Empresa</Label>
                    <Input
                      id="name"
                      {...companyForm.register('name')}
                      error={companyForm.formState.errors.name?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document">CNPJ</Label>
                    <Input
                      id="document"
                      {...companyForm.register('document')}
                      error={companyForm.formState.errors.document?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      {...companyForm.register('email')}
                      error={companyForm.formState.errors.email?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      {...companyForm.register('phone')}
                      error={companyForm.formState.errors.phone?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      {...companyForm.register('address')}
                      error={companyForm.formState.errors.address?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      {...companyForm.register('city')}
                      error={companyForm.formState.errors.city?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Select onValueChange={(value) => companyForm.setValue('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">Acre</SelectItem>
                        <SelectItem value="AL">Alagoas</SelectItem>
                        <SelectItem value="AP">Amapá</SelectItem>
                        <SelectItem value="AM">Amazonas</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="CE">Ceará</SelectItem>
                        <SelectItem value="DF">Distrito Federal</SelectItem>
                        <SelectItem value="ES">Espírito Santo</SelectItem>
                        <SelectItem value="GO">Goiás</SelectItem>
                        <SelectItem value="MA">Maranhão</SelectItem>
                        <SelectItem value="MT">Mato Grosso</SelectItem>
                        <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="PA">Pará</SelectItem>
                        <SelectItem value="PB">Paraíba</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="PE">Pernambuco</SelectItem>
                        <SelectItem value="PI">Piauí</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        <SelectItem value="RO">Rondônia</SelectItem>
                        <SelectItem value="RR">Roraima</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="SE">Sergipe</SelectItem>
                        <SelectItem value="TO">Tocantins</SelectItem>
                      </SelectContent>
                    </Select>
                    {companyForm.formState.errors.state && (
                      <p className="text-sm text-red-500">{companyForm.formState.errors.state.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">CEP</Label>
                    <Input
                      id="zip"
                      {...companyForm.register('zip')}
                      error={companyForm.formState.errors.zip?.message}
                    />
                  </div>
                </div>

                <Button type="submit">
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de E-mail</CardTitle>
              <CardDescription>
                Configure as informações do servidor SMTP para envio de e-mails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp_host">Host SMTP</Label>
                    <Input
                      id="smtp_host"
                      {...emailForm.register('smtp_host')}
                      error={emailForm.formState.errors.smtp_host?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp_port">Porta SMTP</Label>
                    <Input
                      id="smtp_port"
                      {...emailForm.register('smtp_port')}
                      error={emailForm.formState.errors.smtp_port?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp_user">Usuário SMTP</Label>
                    <Input
                      id="smtp_user"
                      {...emailForm.register('smtp_user')}
                      error={emailForm.formState.errors.smtp_user?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp_password">Senha SMTP</Label>
                    <Input
                      id="smtp_password"
                      type="password"
                      {...emailForm.register('smtp_password')}
                      error={emailForm.formState.errors.smtp_password?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from_name">Nome do Remetente</Label>
                    <Input
                      id="from_name"
                      {...emailForm.register('from_name')}
                      error={emailForm.formState.errors.from_name?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from_email">E-mail do Remetente</Label>
                    <Input
                      id="from_email"
                      type="email"
                      {...emailForm.register('from_email')}
                      error={emailForm.formState.errors.from_email?.message}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="smtp_secure"
                      {...emailForm.register('smtp_secure')}
                    />
                    <Label htmlFor="smtp_secure">Usar conexão segura (SSL/TLS)</Label>
                  </div>
                </div>

                <Button type="submit">
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Configure as opções de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação em Duas Etapas</Label>
                    <p className="text-sm text-muted-foreground">
                      Requer um código adicional ao fazer login
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bloqueio por Tentativas</Label>
                    <p className="text-sm text-muted-foreground">
                      Bloqueia o acesso após várias tentativas falhas
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Política de Senhas</Label>
                    <p className="text-sm text-muted-foreground">
                      Requer senhas fortes com caracteres especiais
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registro de Atividades</Label>
                    <p className="text-sm text-muted-foreground">
                      Mantém um registro detalhado das ações dos usuários
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup</CardTitle>
              <CardDescription>
                Configure as opções de backup do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Realiza backups automáticos periodicamente
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Frequência do Backup</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Local de Armazenamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Servidor Local</SelectItem>
                      <SelectItem value="cloud">Nuvem</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Retenção dos Backups</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>
                  Fazer Backup Manual
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 