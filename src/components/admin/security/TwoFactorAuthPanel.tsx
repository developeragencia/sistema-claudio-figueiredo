
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Smartphone, KeySquare, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const TwoFactorAuthPanel: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [activeMethod, setActiveMethod] = useState('app');

  const handleToggle2FA = () => {
    if (isActive) {
      toast("2FA desativado", {
        description: "A autenticação de dois fatores foi desativada com sucesso."
      });
      setIsActive(false);
      setSetupStep(0);
    } else {
      setSetupStep(1);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length < 6) {
      toast("Código inválido", {
        description: "Por favor, insira um código de verificação válido."
      });
      return;
    }

    // Simulate verification
    setTimeout(() => {
      setIsActive(true);
      setSetupStep(0);
      toast("2FA ativado", {
        description: "A autenticação de dois fatores foi ativada com sucesso."
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Autenticação de Dois Fatores (2FA)</h2>
        <p className="text-muted-foreground">
          Configure a autenticação de dois fatores para adicionar uma camada extra de segurança.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Status da Autenticação de Dois Fatores</CardTitle>
              <CardDescription>Gerencie as configurações de 2FA da sua conta</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isActive ? (
                <>
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Ativo</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium text-amber-600">Inativo</span>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {setupStep === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {isActive 
                  ? "A autenticação de dois fatores está ativada. Isso significa que você precisará fornecer um código adicional ao fazer login."
                  : "A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta, exigindo mais do que apenas uma senha para fazer login."}
              </p>
              <Button onClick={handleToggle2FA}>
                {isActive ? (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Desativar 2FA
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Configurar 2FA
                  </>
                )}
              </Button>
            </div>
          ) : setupStep === 1 ? (
            <div className="space-y-6">
              <Tabs defaultValue={activeMethod} onValueChange={setActiveMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="app">Aplicativo</TabsTrigger>
                  <TabsTrigger value="sms">SMS</TabsTrigger>
                </TabsList>
                <TabsContent value="app" className="space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-4 p-4">
                    <QrCode className="h-48 w-48 text-primary" />
                    <p className="text-sm text-muted-foreground text-center">
                      Escaneie o código QR acima com o seu aplicativo de autenticação (Google Authenticator, Microsoft Authenticator, etc).
                    </p>
                    <div className="text-center">
                      <p className="text-sm font-medium">Código de backup:</p>
                      <p className="font-mono bg-muted p-2 rounded text-center">ABCD-EFGH-IJKL-MNOP</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Código de verificação</Label>
                    <Input
                      id="verification-code"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setSetupStep(0)}>Cancelar</Button>
                    <Button onClick={handleVerifyCode}>Verificar e Ativar</Button>
                  </div>
                </TabsContent>
                <TabsContent value="sms" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center py-6">
                      <Smartphone className="h-24 w-24 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Número de telefone</Label>
                      <Input id="phone-number" placeholder="+55 (00) 00000-0000" />
                    </div>
                    <Button className="w-full" onClick={() => setSetupStep(2)}>
                      Enviar código SMS
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sms-code">Código SMS</Label>
                <Input
                  id="sms-code"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setSetupStep(1)}>Voltar</Button>
                <Button onClick={handleVerifyCode}>Verificar e Ativar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Autenticação</CardTitle>
            <CardDescription>Gerencie suas opções de autenticação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h4 className="font-medium">Aplicativo Autenticador</h4>
                    <p className="text-sm text-muted-foreground">
                      Google Authenticator, Microsoft Authenticator, etc.
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">Ativo</Badge>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center">
                  <KeySquare className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Chaves de Segurança</h4>
                    <p className="text-sm text-muted-foreground">
                      YubiKey, Google Titan Key, etc.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TwoFactorAuthPanel;
