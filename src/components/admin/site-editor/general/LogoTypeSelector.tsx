
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

interface LogoTypeSelectorProps {
  logoType: 'static' | 'animated';
  setLogoType: (value: 'static' | 'animated') => void;
}

const LogoTypeSelector = ({ logoType, setLogoType }: LogoTypeSelectorProps) => {
  const handleChange = (value: string) => {
    // Only set if the value is one of our allowed types
    if (value === 'static' || value === 'animated') {
      setLogoType(value);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-md font-semibold">Tipo de Logo</Label>
        <p className="text-sm text-muted-foreground">
          Escolha entre um logo estático ou animado
        </p>
      </div>
      
      <RadioGroup 
        defaultValue={logoType} 
        value={logoType}
        onValueChange={handleChange}
        className="flex flex-col space-y-3"
      >
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="static" />
          </FormControl>
          <FormLabel className="font-normal">
            Logo Estático
          </FormLabel>
        </FormItem>
        
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="animated" />
          </FormControl>
          <FormLabel className="font-normal">
            Logo Animado
          </FormLabel>
        </FormItem>
      </RadioGroup>
    </div>
  );
};

export default LogoTypeSelector;
