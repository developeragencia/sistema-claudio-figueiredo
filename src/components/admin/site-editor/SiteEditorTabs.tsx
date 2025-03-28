
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Palette, Settings, Phone, Construction } from 'lucide-react';

// Import the individual tab content components
import GeneralSettings from './GeneralSettings';
import AppearanceSettings from './AppearanceSettings';
import ContentSettings from './ContentSettings';
import ContactSettings from './ContactSettings';
import MaintenanceSettings from './MaintenanceSettings';

const SiteEditorTabs = () => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="general" className="flex flex-col py-3 h-auto gap-1 sm:flex-row sm:gap-2">
          <Globe className="h-4 w-4" />
          <span>Geral</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex flex-col py-3 h-auto gap-1 sm:flex-row sm:gap-2">
          <Palette className="h-4 w-4" />
          <span>Aparência</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex flex-col py-3 h-auto gap-1 sm:flex-row sm:gap-2">
          <Settings className="h-4 w-4" />
          <span>Configuração Site</span>
        </TabsTrigger>
        <TabsTrigger value="contact" className="flex flex-col py-3 h-auto gap-1 sm:flex-row sm:gap-2">
          <Phone className="h-4 w-4" />
          <span>Contato</span>
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex flex-col py-3 h-auto gap-1 sm:flex-row sm:gap-2">
          <Construction className="h-4 w-4" />
          <span>Manutenção</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="mt-0">
        <GeneralSettings />
      </TabsContent>
      
      <TabsContent value="appearance" className="mt-0">
        <AppearanceSettings />
      </TabsContent>
      
      <TabsContent value="content" className="mt-0">
        <ContentSettings />
      </TabsContent>
      
      <TabsContent value="contact" className="mt-0">
        <ContactSettings />
      </TabsContent>
      
      <TabsContent value="maintenance" className="mt-0">
        <MaintenanceSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SiteEditorTabs;
