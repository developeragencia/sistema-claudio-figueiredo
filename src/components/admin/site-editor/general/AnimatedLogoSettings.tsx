
import React from 'react';
import { Label } from '@/components/ui/label';
import AnimatedLogo from '@/components/AnimatedLogo';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface AnimatedLogoSettingsProps {
  logoAnimation: string;
  setLogoAnimation: (value: string) => void;
}

const AnimatedLogoSettings = ({ logoAnimation, setLogoAnimation }: AnimatedLogoSettingsProps) => {
  return (
    <div className="space-y-3">
      <Label>Logo Animado</Label>
      <div className="border rounded-md p-6 bg-card space-y-4">
        <div className="flex flex-col items-center justify-center">
          <AnimatedLogo size="lg" />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="logo-animation">Estilo de Animação</Label>
          <Select
            value={logoAnimation}
            onValueChange={setLogoAnimation}
          >
            <SelectTrigger id="logo-animation">
              <SelectValue placeholder="Selecione o estilo de animação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fade">Fade</SelectItem>
              <SelectItem value="rotate">Rotação</SelectItem>
              <SelectItem value="pulse">Pulsar</SelectItem>
              <SelectItem value="bounce">Saltar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoSettings;
