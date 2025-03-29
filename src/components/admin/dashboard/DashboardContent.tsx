import React from 'react';
import { useAdminData, Client, Proposal } from '@/hooks/useAdminData';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DashboardContentProps {
  filters?: Record<string, any>;
}

export function DashboardContent({ filters }: DashboardContentProps) {
  const { data: clientsData } = useAdminData<Client>({
    tab: 'clients',
    filters,
    limit: 5,
  });

  const { data: proposalsData } = useAdminData<Proposal>({
    tab: 'proposals',
    filters,
    limit: 5,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Últimos Clientes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientsData?.data?.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Últimas Propostas</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposalsData?.data?.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell>{proposal.client_name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(proposal.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 