
import React from 'react';
import { RefreshCw, PieChart, Clock, ArrowUpDown, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import TabTitleSection from '../header/TabTitleSection';

const RecoveryManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={RefreshCw} 
        title="Gestão de Recuperação" 
        description="Acompanhe processos de recuperação de créditos tributários e monitore seu progresso."
      />

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Recuperado"
          value="R$ 1.758.934,56"
          change="+12,5%"
          description="em relação ao mês anterior"
          trend="up"
        />
        <SummaryCard
          title="Em Andamento"
          value="R$ 3.145.778,22"
          change="+8,3%"
          description="em relação ao mês anterior"
          trend="up"
        />
        <SummaryCard
          title="Taxa de Sucesso"
          value="87,4%"
          change="+2,1%"
          description="em relação ao mês anterior"
          trend="up"
        />
        <SummaryCard
          title="Tempo Médio"
          value="127 dias"
          change="-5,3%"
          description="em relação ao mês anterior"
          trend="down"
        />
      </div>

      {/* Filters and search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar processos..."
              className="w-full bg-background pl-8 md:w-[320px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <PieChart className="mr-2 h-4 w-4" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Processos Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Processos de Recuperação Ativos</CardTitle>
              <CardDescription>
                Processos de recuperação de crédito em andamento
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                      <th className="h-10 px-4 text-left font-medium">ID</th>
                      <th className="h-10 px-4 text-left font-medium">Cliente</th>
                      <th className="h-10 px-4 text-left font-medium">Tipo</th>
                      <th className="h-10 px-4 text-left font-medium">Valor</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Progresso</th>
                      <th className="h-10 px-4 text-left font-medium">Prazo</th>
                      <th className="h-10 px-4 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <RecoveryRow
                      id="REC-2023-001"
                      client="Empresa ABC Ltda"
                      type="PIS/COFINS"
                      value="R$ 356.789,45"
                      status="Em análise"
                      progress={35}
                      deadline="15/08/2023"
                    />
                    <RecoveryRow
                      id="REC-2023-002"
                      client="XYZ Indústria S.A."
                      type="ICMS"
                      value="R$ 578.321,12"
                      status="Documentação"
                      progress={65}
                      deadline="22/07/2023"
                    />
                    <RecoveryRow
                      id="REC-2023-003"
                      client="Tech Solutions Ltda"
                      type="IRRF"
                      value="R$ 123.456,78"
                      status="Perícia"
                      progress={80}
                      deadline="30/07/2023"
                    />
                    <RecoveryRow
                      id="REC-2023-004"
                      client="Comércio Geral Ltda"
                      type="INSS"
                      value="R$ 245.678,90"
                      status="Aguardando"
                      progress={15}
                      deadline="10/09/2023"
                    />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos Concluídos</CardTitle>
              <CardDescription>Processos de recuperação finalizados com sucesso</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Selecione "Todos" para ver os processos concluídos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos Pendentes</CardTitle>
              <CardDescription>Processos de recuperação aguardando ação</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Selecione "Todos" para ver os processos pendentes.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Processos</CardTitle>
              <CardDescription>Visualização completa de todos os processos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Esta visualização está sendo implementada.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for summary cards
interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  change, 
  description, 
  trend 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className={`h-4 w-4 ${
            trend === 'up' 
              ? 'text-emerald-500' 
              : trend === 'down' 
                ? 'text-red-500' 
                : 'text-gray-500'
          }`}
        >
          {trend === 'up' ? (
            <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
          ) : trend === 'down' ? (
            <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
          ) : (
            <path d="M8 12h8" />
          )}
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : ''}>
            {change}
          </span>{' '}
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

// Helper component for recovery table rows
interface RecoveryRowProps {
  id: string;
  client: string;
  type: string;
  value: string;
  status: string;
  progress: number;
  deadline: string;
}

const RecoveryRow: React.FC<RecoveryRowProps> = ({
  id,
  client,
  type,
  value,
  status,
  progress,
  deadline,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'em análise':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'documentação':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'perícia':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'aguardando':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'concluído':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle text-sm">{id}</td>
      <td className="p-4 align-middle font-medium">{client}</td>
      <td className="p-4 align-middle text-sm">{type}</td>
      <td className="p-4 align-middle text-sm font-medium">{value}</td>
      <td className="p-4 align-middle">
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
          {status}
        </Badge>
      </td>
      <td className="p-4 align-middle">
        <div className="flex items-center gap-2">
          <Progress value={progress} className="h-2 w-[60px]" />
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-3 w-3 text-muted-foreground" />
          {deadline}
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default RecoveryManagement;
