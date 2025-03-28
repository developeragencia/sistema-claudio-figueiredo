
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface LayoutSettingsProps {
  useAnimatedLogo: boolean;
  setUseAnimatedLogo: (value: boolean) => void;
}

const LayoutSettings: React.FC<LayoutSettingsProps> = ({
  useAnimatedLogo,
  setUseAnimatedLogo,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="dark-mode" className="text-base">Tema Escuro</Label>
          <p className="text-sm text-muted-foreground">
            Habilitar tema escuro no site
          </p>
        </div>
        <Switch id="dark-mode" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="animated-logo" className="text-base">Logo Animado</Label>
          <p className="text-sm text-muted-foreground">
            Usar logo com animações
          </p>
        </div>
        <Switch 
          id="animated-logo" 
          checked={useAnimatedLogo}
          onCheckedChange={setUseAnimatedLogo}
        />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="fixed-header" className="text-base">Cabeçalho Fixo</Label>
          <p className="text-sm text-muted-foreground">
            Manter cabeçalho visível ao rolar a página
          </p>
        </div>
        <Switch id="fixed-header" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="full-width" className="text-base">Layout de Largura Total</Label>
          <p className="text-sm text-muted-foreground">
            Usar largura máxima para o conteúdo
          </p>
        </div>
        <Switch id="full-width" />
      </div>
    </div>
  );
};

export default LayoutSettings;
