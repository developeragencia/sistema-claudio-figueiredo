
import React from 'react';
import { useActiveClient } from '@/hooks/useActiveClient';
import ClientDetail from './tax-credits/ClientDetail';

interface ExtraTabContentProps {
  activeTab: string;
}

const ExtraTabContent: React.FC<ExtraTabContentProps> = ({ activeTab }) => {
  // Check if this is a client detail view
  const isClientDetail = activeTab.startsWith('client-');
  const clientId = isClientDetail ? activeTab.replace('client-', '') : '';
  
  // Handle non-client tabs with placeholder content
  const getTabContent = () => {
    if (isClientDetail && clientId) {
      return <ClientDetail clientId={clientId} />;
    }
    
    // Default content for other tabs
    let title = "Conteúdo";
    let description = "Esta seção está em desenvolvimento";
    
    switch (activeTab) {
      case "notifications":
        title = "Notificações";
        description = "Gerenciamento de notificações do sistema";
        break;
      case "security":
        title = "Segurança";
        description = "Gerenciamento de segurança do sistema";
        break;
      case "billing":
        title = "Faturamento";
        description = "Gerenciamento de faturamento do sistema";
        break;
      case "support":
        title = "Suporte";
        description = "Gerenciamento de suporte do sistema";
        break;
    }
    
    return (
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  };
  
  return getTabContent();
};

export default ExtraTabContent;
