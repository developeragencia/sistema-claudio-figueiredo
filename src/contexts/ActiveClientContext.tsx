import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client, ActiveClientContext as IActiveClientContext } from '../types/user';

const ActiveClientContext = createContext<IActiveClientContext | undefined>(undefined);

export function ActiveClientProvider({ children }: { children: ReactNode }) {
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  return (
    <ActiveClientContext.Provider value={{ client: activeClient, setActiveClient }}>
      {children}
    </ActiveClientContext.Provider>
  );
}

export function useActiveClient() {
  const context = useContext(ActiveClientContext);
  if (context === undefined) {
    throw new Error('useActiveClient must be used within an ActiveClientProvider');
  }
  return context;
}

// Hook para verificar permissões baseadas no cliente ativo
export function useActiveClientPermissions() {
  const { client } = useActiveClient();
  
  return {
    canViewClient: Boolean(client),
    canEditClient: Boolean(client?.active),
    isActiveClient: Boolean(client?.active),
  };
} 