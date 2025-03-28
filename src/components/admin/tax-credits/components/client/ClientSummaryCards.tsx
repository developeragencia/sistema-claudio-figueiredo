
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building, Users } from 'lucide-react';
import { Client } from '@/types/client';

interface ClientSummaryCardsProps {
  clients: Client[];
}

const ClientSummaryCards: React.FC<ClientSummaryCardsProps> = ({ clients }) => {
  const activeClients = clients.filter(c => c.status === "ACTIVE").length;
  const inactiveClients = clients.filter(c => c.status === "INACTIVE").length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{clients.length}</div>
            <Building className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Clientes Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{activeClients}</div>
            <Users className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Clientes Inativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{inactiveClients}</div>
            <Users className="h-5 w-5 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSummaryCards;
