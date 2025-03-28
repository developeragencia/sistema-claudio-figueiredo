
import React from 'react';
import SiteEditorTabs from './site-editor/SiteEditorTabs';
import { Paintbrush, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SiteEditor = () => {
  const handleViewSite = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Paintbrush className="w-6 h-6 text-primary" />
            Editor do Site
          </h1>
          <p className="text-muted-foreground mt-1">
            Personalize a aparência e o conteúdo do seu site de forma completa
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleViewSite}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Visualizar Site</span>
        </Button>
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <SiteEditorTabs />
      </div>
    </div>
  );
};

export default SiteEditor;
