
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare, Layout, PieChart, Settings } from 'lucide-react';

interface DashboardConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: any) => void;
}

interface DashboardConfig {
  layout: 'grid' | 'compact' | 'detailed';
  refreshInterval: '0' | '5' | '15' | '30' | '60';
  showPercentages: boolean;
  showTrends: boolean;
  showLegends: boolean;
  enableAnimations: boolean;
  defaultChartType: 'bar' | 'line' | 'pie';
}

const DashboardConfigModal: React.FC<DashboardConfigModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [config, setConfig] = useState<DashboardConfig>({
    layout: 'grid',
    refreshInterval: '0',
    showPercentages: true,
    showTrends: true,
    showLegends: true,
    enableAnimations: true,
    defaultChartType: 'bar'
  });

  const handleSave = () => {
    onSave(config);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurações do Dashboard</DialogTitle>
          <DialogDescription>
            Personalize seu dashboard interativo de acordo com suas preferências.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="display" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span>Exibição</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Gráficos</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Geral</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layout">Layout do Dashboard</Label>
                <Select 
                  value={config.layout} 
                  onValueChange={(value: any) => setConfig({...config, layout: value})}
                >
                  <SelectTrigger id="layout">
                    <SelectValue placeholder="Selecione o layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grade (padrão)</SelectItem>
                    <SelectItem value="compact">Compacto</SelectItem>
                    <SelectItem value="detailed">Detalhado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showPercentages">Mostrar percentuais</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibe valores percentuais nos gráficos
                  </p>
                </div>
                <Switch 
                  id="showPercentages"
                  checked={config.showPercentages}
                  onCheckedChange={(checked) => setConfig({...config, showPercentages: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showTrends">Mostrar tendências</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibe indicadores de tendência para cada métrica
                  </p>
                </div>
                <Switch 
                  id="showTrends"
                  checked={config.showTrends}
                  onCheckedChange={(checked) => setConfig({...config, showTrends: checked})}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultChartType">Tipo de gráfico padrão</Label>
                <Select 
                  value={config.defaultChartType} 
                  onValueChange={(value: any) => setConfig({...config, defaultChartType: value})}
                >
                  <SelectTrigger id="defaultChartType">
                    <SelectValue placeholder="Selecione o tipo padrão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Barras</SelectItem>
                    <SelectItem value="line">Linhas</SelectItem>
                    <SelectItem value="pie">Pizza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showLegends">Mostrar legendas</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibe legendas nos gráficos
                  </p>
                </div>
                <Switch 
                  id="showLegends"
                  checked={config.showLegends}
                  onCheckedChange={(checked) => setConfig({...config, showLegends: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAnimations">Ativar animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita efeitos de animação nos gráficos
                  </p>
                </div>
                <Switch 
                  id="enableAnimations"
                  checked={config.enableAnimations}
                  onCheckedChange={(checked) => setConfig({...config, enableAnimations: checked})}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refreshInterval">Intervalo de atualização automática</Label>
                <Select 
                  value={config.refreshInterval} 
                  onValueChange={(value: any) => setConfig({...config, refreshInterval: value})}
                >
                  <SelectTrigger id="refreshInterval">
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Desativado</SelectItem>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 border rounded-lg space-y-2 bg-muted/20">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  Dica
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure o intervalo de atualização automática para manter seus dados sempre atualizados. Escolha "Desativado" para atualizar manualmente.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardConfigModal;
