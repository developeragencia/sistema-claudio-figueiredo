
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SiteInfoSettingsProps {
  siteName: string;
  setSiteName: (value: string) => void;
  siteDescription: string;
  setSiteDescription: (value: string) => void;
}

const SiteInfoSettings = ({ 
  siteName, 
  setSiteName, 
  siteDescription, 
  setSiteDescription 
}: SiteInfoSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="site-name" className="text-sm font-medium">Nome do Site</Label>
        <Input 
          id="site-name" 
          value={siteName} 
          onChange={(e) => setSiteName(e.target.value)} 
          className="bg-card border-input focus:border-primary/50 transition-colors"
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="site-description" className="text-sm font-medium">Descrição do Site</Label>
        <Textarea 
          id="site-description" 
          value={siteDescription} 
          onChange={(e) => setSiteDescription(e.target.value)} 
          rows={3}
          className="bg-card border-input focus:border-primary/50 transition-colors resize-none"
        />
      </div>
    </div>
  );
};

export default SiteInfoSettings;
