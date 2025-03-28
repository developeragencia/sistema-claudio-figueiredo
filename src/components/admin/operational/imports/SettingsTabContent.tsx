
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportSettingsForm from './ImportSettingsForm';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SettingsTabContent = () => {
  const { toast } = useToast();
  const [autoProcess, setAutoProcess] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  
  const handleSaveAdvancedSettings = () => {
    toast({
      title: "Configurações avançadas salvas",
      description: "As configurações avançadas foram salvas com sucesso.",
      variant: "success"
    });
  };

  return (
    <TabsContent value="settings" className="space-y-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <ImportSettingsForm />
        
        <Card>
          <CardHeader>
            <CardTitle>Configurações Avançadas</CardTitle>
            <CardDescription>
              Configure opções avançadas para o processamento de importações.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
              <div className="space-y-0.5">
                <Label htmlFor="auto-process">Processamento Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Processa automaticamente os arquivos após o upload.
                </p>
              </div>
              <Switch
                id="auto-process"
                checked={autoProcess}
                onCheckedChange={setAutoProcess}
              />
            </div>
            
            <div className="flex items-center justify-between space-y-2">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificações por email após concluir o processamento.
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={handleSaveAdvancedSettings}>
                Salvar Configurações Avançadas
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

export default SettingsTabContent;
