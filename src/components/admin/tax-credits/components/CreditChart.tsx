
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { TaxCreditSummary } from '@/types/tax-credits';

interface CreditChartProps {
  summary: TaxCreditSummary;
}

const CreditChart: React.FC<CreditChartProps> = ({ summary }) => {
  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Chart data
  const chartData = [
    { name: 'Pendentes', value: summary?.pendingCredits || summary?.pendingValue || 0 },
    { name: 'Em Análise', value: summary?.approvedCredits || summary?.approvedValue || 0 },
    { name: 'Aprovados', value: summary?.recoveredCredits || summary?.totalValue || 0 },
    { name: 'Recuperados', value: summary?.rejectedCredits || summary?.pendingValue || 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral dos Créditos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Valor"]}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0' 
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditChart;
