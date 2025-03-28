import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  ArrowUpRight, Users, FileText, DollarSign,
  FileBarChart2, CheckCircle, TrendingUp, Download, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClients } from '@/hooks/useClients';
import { useProposals } from '@/hooks/useProposals';
import { useContracts } from '@/hooks/useContracts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format as formatDate, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DashboardAlerts } from '@/components/dashboard/DashboardAlerts';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [period, setPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('visao-geral');
  const { user } = useAuth();

  // Filtros baseados no período
  const getDateRange = () => {
    const end = new Date();
    const start = subMonths(end, parseInt(period));
    return {
      start: startOfMonth(start),
      end: endOfMonth(end)
    };
  };

  const dateRange = getDateRange();

  // Hooks com filtros de data
  const { data: clientsData, total: totalClients } = useClients({
    created_at: {
      gte: dateRange.start.toISOString(),
      lte: dateRange.end.toISOString()
    }
  });

  const { data: proposalsData } = useProposals({
    created_at: {
      gte: dateRange.start.toISOString(),
      lte: dateRange.end.toISOString()
    }
  });

  const { data: contractsData } = useContracts({
    created_at: {
      gte: dateRange.start.toISOString(),
      lte: dateRange.end.toISOString()
    }
  });

  const totalProposals = proposalsData?.total || 0;
  const totalContracts = contractsData?.total || 0;

  // Cálculo do valor total e médio dos contratos
  const totalContractValue = contractsData?.items?.reduce((acc, contract) => 
    acc + (contract.value || 0), 0) || 0;
  const averageContractValue = totalContracts > 0 ? totalContractValue / totalContracts : 0;

  // Cálculo do crescimento mês a mês
  const calculateGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const previousPeriodContracts = 0; // TODO: Implementar lógica para período anterior
  const contractsGrowthRate = calculateGrowthRate(totalContracts, previousPeriodContracts);

  // Dados de receita mensal
  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', receita: 4000, previsao: 4500 },
    { month: 'Fev', receita: 3000, previsao: 3500 },
    { month: 'Mar', receita: 2000, previsao: 2500 },
    { month: 'Abr', receita: 2780, previsao: 3000 },
    { month: 'Mai', receita: 1890, previsao: 2000 },
    { month: 'Jun', receita: 2390, previsao: 2800 },
    { month: 'Jul', receita: 3490, previsao: 4000 },
  ]);

  const stats = [
    {
      title: 'Total de Clientes',
      value: totalClients,
      icon: Users,
      description: '12 novos este mês',
    },
    {
      title: 'Propostas Ativas',
      value: totalProposals,
      icon: FileText,
      description: '5 novas esta semana',
    },
    {
      title: 'Contratos Fechados',
      value: totalContracts,
      icon: CheckCircle,
      description: '3 novos este mês',
    },
    {
      title: 'Propostas Pendentes',
      value: proposalsData?.items?.filter(p => p.status === 'PENDING').length || 0,
      icon: AlertCircle,
      description: '2 aguardando aprovação',
    },
  ];

  // Função para exportar dados em diferentes formatos
  const handleExport = (format: 'json' | 'csv' | 'xlsx' | 'pdf') => {
    const data = {
      periodo: `${formatDate(dateRange.start, 'dd/MM/yyyy')} - ${formatDate(dateRange.end, 'dd/MM/yyyy')}`,
      metricas: {
        clientes: totalClients,
        propostas: totalProposals,
        contratos: totalContracts,
        valorTotalContratos: totalContractValue,
        valorMedioContratos: averageContractValue,
        taxaConversao: totalProposals > 0 ? (totalContracts / totalProposals) * 100 : 0,
        crescimentoContratos: contractsGrowthRate
      },
      statusPropostas: {
        emAnalise: proposalsData?.items?.filter(p => p.status === 'ANALYSIS').length || 0,
        aprovadas: proposalsData?.items?.filter(p => p.status === 'APPROVED').length || 0,
        rejeitadas: proposalsData?.items?.filter(p => p.status === 'REJECTED').length || 0
      },
      receitas: revenueData
    };

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        saveAs(jsonBlob, `dashboard-export-${formatDate(new Date(), 'dd-MM-yyyy')}.json`);
        break;

      case 'csv':
        const csvContent = [
          ['Período', data.periodo],
          [''],
          ['Métricas'],
          ['Total de Clientes', data.metricas.clientes],
          ['Total de Propostas', data.metricas.propostas],
          ['Total de Contratos', data.metricas.contratos],
          ['Valor Total dos Contratos', data.metricas.valorTotalContratos],
          ['Valor Médio dos Contratos', data.metricas.valorMedioContratos],
          ['Taxa de Conversão', `${data.metricas.taxaConversao}%`],
          ['Crescimento de Contratos', `${data.metricas.crescimentoContratos}%`],
          [''],
          ['Status das Propostas'],
          ['Em Análise', data.statusPropostas.emAnalise],
          ['Aprovadas', data.statusPropostas.aprovadas],
          ['Rejeitadas', data.statusPropostas.rejeitadas],
          [''],
          ['Receitas Mensais'],
          ['Mês', 'Receita', 'Previsão'],
          ...revenueData.map(item => [item.month, item.receita, item.previsao])
        ].map(row => row.join(',')).join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, `dashboard-export-${formatDate(new Date(), 'dd-MM-yyyy')}.csv`);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        
        // Planilha de Métricas
        const metricasWs = XLSX.utils.aoa_to_sheet([
          ['Métricas do Dashboard'],
          ['Período', data.periodo],
          [''],
          ['Indicador', 'Valor'],
          ['Total de Clientes', data.metricas.clientes],
          ['Total de Propostas', data.metricas.propostas],
          ['Total de Contratos', data.metricas.contratos],
          ['Valor Total dos Contratos', data.metricas.valorTotalContratos],
          ['Valor Médio dos Contratos', data.metricas.valorMedioContratos],
          ['Taxa de Conversão', `${data.metricas.taxaConversao}%`],
          ['Crescimento de Contratos', `${data.metricas.crescimentoContratos}%`]
        ]);
        XLSX.utils.book_append_sheet(wb, metricasWs, 'Métricas');

        // Planilha de Status das Propostas
        const statusWs = XLSX.utils.aoa_to_sheet([
          ['Status das Propostas'],
          ['Status', 'Quantidade'],
          ['Em Análise', data.statusPropostas.emAnalise],
          ['Aprovadas', data.statusPropostas.aprovadas],
          ['Rejeitadas', data.statusPropostas.rejeitadas]
        ]);
        XLSX.utils.book_append_sheet(wb, statusWs, 'Status');

        // Planilha de Receitas
        const receitasWs = XLSX.utils.aoa_to_sheet([
          ['Receitas Mensais'],
          ['Mês', 'Receita', 'Previsão'],
          ...revenueData.map(item => [item.month, item.receita, item.previsao])
        ]);
        XLSX.utils.book_append_sheet(wb, receitasWs, 'Receitas');

        XLSX.writeFile(wb, `dashboard-export-${formatDate(new Date(), 'dd-MM-yyyy')}.xlsx`);
        break;

      case 'pdf':
        // TODO: Implementar exportação para PDF
        toast({
          title: 'Em desenvolvimento',
          description: 'A exportação para PDF será implementada em breve.',
          variant: 'default'
        });
        break;
    }

    toast({
      title: 'Relatório exportado',
      description: `O relatório foi exportado com sucesso no formato ${format.toUpperCase()}.`,
      variant: 'default'
    });
  };

      return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Bem-vindo, {user?.name?.split(' ')[0]}!
        </h1>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Último mês</SelectItem>
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Último ano</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                Exportar como JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Exportar como CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('xlsx')}>
                Exportar como Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Exportar como PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>

      <DashboardAlerts />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
        </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList>
          <TabsTrigger value="visao-geral" onClick={() => setActiveTab('visao-geral')}>Visão Geral</TabsTrigger>
          <TabsTrigger value="relatorios" onClick={() => setActiveTab('relatorios')}>Relatórios</TabsTrigger>
          <TabsTrigger value="analytics" onClick={() => setActiveTab('analytics')}>Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Conversão
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalProposals > 0 ? ((totalContracts / totalProposals) * 100).toFixed(1) : 0}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Propostas convertidas em contratos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média de Propostas por Cliente
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalClients > 0 ? (totalProposals / totalClients).toFixed(1) : 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Propostas por cliente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média de Contratos por Cliente
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalClients > 0 ? (totalContracts / totalClients).toFixed(1) : 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Contratos por cliente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Valor Médio dos Contratos
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(averageContractValue)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Por contrato
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area 
                      type="monotone" 
                      dataKey="receita" 
                      name="Receita"
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#revenueGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="previsao" 
                      name="Previsão"
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#forecastGradient)" 
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Status das Propostas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Em Análise', value: proposalsData?.items?.filter(p => p.status === 'ANALYSIS').length || 0 },
                        { name: 'Aprovada', value: proposalsData?.items?.filter(p => p.status === 'APPROVED').length || 0 },
                        { name: 'Rejeitada', value: proposalsData?.items?.filter(p => p.status === 'REJECTED').length || 0 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#FFB020" />
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Métricas Principais</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Taxa de Conversão: {totalProposals > 0 ? ((totalContracts / totalProposals) * 100).toFixed(1) : 0}%</li>
                      <li>Valor Total dos Contratos: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalContractValue)}</li>
                      <li>Crescimento: {contractsGrowthRate > 0 ? '+' : ''}{contractsGrowthRate.toFixed(1)}%</li>
                    </ul>
                  </div>
                  <Button onClick={() => handleExport('json')} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Relatório
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Previsões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Próximo Mês</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Contratos Previstos: {Math.round(totalContracts * 1.1)}</li>
                      <li>Receita Prevista: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalContractValue * 1.1)}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Tendências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Insights</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Taxa média de crescimento: {contractsGrowthRate.toFixed(1)}% ao mês</li>
                      <li>Tempo médio de conversão: 15 dias</li>
                      <li>Principal fonte de clientes: Indicações</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Ações Sugeridas</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Aumentar follow-up de propostas em análise</li>
                      <li>Revisar propostas com mais de 30 dias sem resposta</li>
                      <li>Identificar clientes potenciais para upsell</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}