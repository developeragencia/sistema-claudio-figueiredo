
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SiteFeaturesToggle = () => {
  return (
    <div className="space-y-3 pt-3">
      <h3 className="text-base font-medium">Seções do Site</h3>
      
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="enable-blog" className="text-base">Habilitar Blog</Label>
          <p className="text-sm text-muted-foreground">
            Exibir seção de blog no site
          </p>
        </div>
        <Switch id="enable-blog" />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="enable-testimonials" className="text-base">Habilitar Depoimentos</Label>
          <p className="text-sm text-muted-foreground">
            Exibir seção de depoimentos no site
          </p>
        </div>
        <Switch id="enable-testimonials" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-0.5">
          <Label htmlFor="enable-features" className="text-base">Habilitar Funcionalidades</Label>
          <p className="text-sm text-muted-foreground">
            Exibir seção de funcionalidades no site
          </p>
        </div>
        <Switch id="enable-features" defaultChecked />
      </div>
    </div>
  );
};

export default SiteFeaturesToggle;
