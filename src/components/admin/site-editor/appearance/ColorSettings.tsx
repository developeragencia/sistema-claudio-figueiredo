
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorSettingsProps {
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
  secondaryColor: string;
  setSecondaryColor: (value: string) => void;
  accentColor: string;
  setAccentColor: (value: string) => void;
  headerBgColor: string;
  setHeaderBgColor: (value: string) => void;
  footerBgColor: string;
  setFooterBgColor: (value: string) => void;
}

const ColorSettings: React.FC<ColorSettingsProps> = ({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  accentColor,
  setAccentColor,
  headerBgColor,
  setHeaderBgColor,
  footerBgColor,
  setFooterBgColor,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primary-color">Cor Primária</Label>
        <div className="flex items-center gap-4">
          <Input 
            id="primary-color" 
            type="color" 
            value={primaryColor} 
            onChange={(e) => setPrimaryColor(e.target.value)} 
            className="w-24 h-10 p-1"
          />
          <div>
            <span className="text-sm font-medium">Hexadecimal: </span>
            <span className="text-sm">{primaryColor}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="secondary-color">Cor Secundária</Label>
        <div className="flex items-center gap-4">
          <Input 
            id="secondary-color" 
            type="color" 
            value={secondaryColor} 
            onChange={(e) => setSecondaryColor(e.target.value)} 
            className="w-24 h-10 p-1"
          />
          <div>
            <span className="text-sm font-medium">Hexadecimal: </span>
            <span className="text-sm">{secondaryColor}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accent-color">Cor de Destaque</Label>
        <div className="flex items-center gap-4">
          <Input 
            id="accent-color" 
            type="color" 
            value={accentColor} 
            onChange={(e) => setAccentColor(e.target.value)} 
            className="w-24 h-10 p-1"
          />
          <div>
            <span className="text-sm font-medium">Hexadecimal: </span>
            <span className="text-sm">{accentColor}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <Label htmlFor="header-bg-color">Cor de Fundo do Cabeçalho</Label>
        <div className="flex items-center gap-4">
          <Input 
            id="header-bg-color" 
            type="color" 
            value={headerBgColor} 
            onChange={(e) => setHeaderBgColor(e.target.value)} 
            className="w-24 h-10 p-1"
          />
          <div>
            <span className="text-sm font-medium">Hexadecimal: </span>
            <span className="text-sm">{headerBgColor}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="footer-bg-color">Cor de Fundo do Rodapé</Label>
        <div className="flex items-center gap-4">
          <Input 
            id="footer-bg-color" 
            type="color" 
            value={footerBgColor} 
            onChange={(e) => setFooterBgColor(e.target.value)} 
            className="w-24 h-10 p-1"
          />
          <div>
            <span className="text-sm font-medium">Hexadecimal: </span>
            <span className="text-sm">{footerBgColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSettings;
