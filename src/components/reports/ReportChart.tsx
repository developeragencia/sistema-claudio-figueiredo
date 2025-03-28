import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ReportItem {
  id: string;
  name?: string;
  email?: string;
  document?: string;
  proposals_count?: number;
  contracts_count?: number;
  total_value?: number;
  title?: string;
  client?: {
    id: string;
    name: string;
    email: string;
  };
  value?: number;
  status?: string;
  created_at?: string;
  start_date?: string;
  end_date?: string;
  month?: string;
  revenue?: number;
  expense?: number;
  profit?: number;
}

interface ReportData {
  items: ReportItem[];
  total: number;
  summary?: {
    total_value?: number;
    total_proposals?: number;
    total_contracts?: number;
    total_revenue?: number;
    total_expense?: number;
    total_profit?: number;
  };
}

interface ReportChartProps {
  type: string;
  data: ReportData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function ReportChart({ type, data }: ReportChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const renderClientsChart = () => {
    const chartData = data.items.map(item => ({
      name: item.name,
      propostas: item.proposals_count,
      contratos: item.contracts_count,
      valor: item.total_value
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'valor') {
                return formatCurrency(value);
              }
              return value;
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="propostas" fill="#0088FE" name="Propostas" />
          <Bar yAxisId="left" dataKey="contratos" fill="#00C49F" name="Contratos" />
          <Bar yAxisId="right" dataKey="valor" fill="#FFBB28" name="Valor Total" />
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  };

  const renderProposalsChart = () => {
    const chartData = data.items.map(item => ({
      name: item.title,
      valor: item.value,
      status: item.status
    }));

    const statusData = chartData.reduce((acc, item) => {
      const status = item.status === 'DRAFT' ? 'Rascunho' :
                    item.status === 'PENDING' ? 'Pendente' :
                    item.status === 'APPROVED' ? 'Aprovada' :
                    item.status === 'REJECTED' ? 'Rejeitada' : 'Cancelada';

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(statusData).map(([name, value]) => ({
      name,
      value
    }));

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="valor" fill="#0088FE" name="Valor" />
          </RechartsBarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderContractsChart = () => {
    const chartData = data.items.map(item => ({
      name: item.title,
      valor: item.value,
      status: item.status
    }));

    const statusData = chartData.reduce((acc, item) => {
      const status = item.status === 'DRAFT' ? 'Rascunho' :
                    item.status === 'ACTIVE' ? 'Ativo' :
                    item.status === 'INACTIVE' ? 'Inativo' : 'Expirado';

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(statusData).map(([name, value]) => ({
      name,
      value
    }));

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="valor" fill="#0088FE" name="Valor" />
          </RechartsBarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderFinancialChart = () => {
    const chartData = data.items.map(item => ({
      name: item.month,
      receita: item.revenue,
      despesa: item.expense,
      lucro: item.profit
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          <Line type="monotone" dataKey="receita" stroke="#0088FE" name="Receita" />
          <Line type="monotone" dataKey="despesa" stroke="#FF8042" name="Despesa" />
          <Line type="monotone" dataKey="lucro" stroke="#00C49F" name="Lucro" />
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'clients':
        return renderClientsChart();
      case 'proposals':
        return renderProposalsChart();
      case 'contracts':
        return renderContractsChart();
      case 'financial':
        return renderFinancialChart();
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  );
} 