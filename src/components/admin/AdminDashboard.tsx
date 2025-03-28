import React from 'react';
import { BookOpen, HardDrive, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

import DashboardHeader from './dashboard/DashboardHeader';
import DashboardSection from './dashboard/DashboardSection';
import StatCards from './dashboard/StatCards';
import { getMainMenuItems } from './dashboard/MainMenuItems';
import { getOperationalMenuItems } from './dashboard/OperationalMenuItems';
import ActiveClientHeader from './client/ActiveClientHeader';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  cnpj?: string;
  tags?: string[];
  segment?: string;
  type?: 'public' | 'private';
  city?: string;
  state?: string;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [clients, setClients] = React.useState<Client[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        // Simular dados para desenvolvimento
        setClients([
          { 
            id: '1', 
            name: 'Cliente 1', 
            status: 'active',
            cnpj: '12345678901234',
            tags: ['Tag 1', 'Tag 2'],
            segment: 'Tecnologia',
            type: 'private',
            city: 'São Paulo',
            state: 'SP'
          },
          { 
            id: '2', 
            name: 'Cliente 2', 
            status: 'inactive',
            cnpj: '98765432109876',
            tags: ['Tag 3'],
            segment: 'Indústria',
            type: 'public',
            city: 'Rio de Janeiro',
            state: 'RJ'
          },
        ]);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ActiveClientHeader />
      
      <DashboardHeader />

      <StatCards />

      <DashboardSection 
        title="Módulos Principais"
        icon={<BookOpen className="mr-2 h-5 w-5 text-primary" />}
        items={getMainMenuItems()}
      />

      <DashboardSection 
        title="Operacional"
        icon={<HardDrive className="mr-2 h-5 w-5 text-primary" />}
        items={getOperationalMenuItems()}
        delay={0.2}
      />

      {clients.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Building className="mr-2 h-5 w-5 text-primary" />
            Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clients.map((client) => (
              <Card key={client.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{client.name}</h3>
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {client.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  {client.cnpj && (
                    <p className="text-sm text-muted-foreground mb-2">
                      CNPJ: {client.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')}
                    </p>
                  )}
                  {client.tags && client.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {client.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    </div>
                  )}
                  </div>
                <div className="p-4 bg-muted/50 border-t">
                  <Button variant="secondary" size="sm" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Card className="p-4">
          <Calendar mode="single" />
        </Card>
      </div>
    </div>
  );
}
