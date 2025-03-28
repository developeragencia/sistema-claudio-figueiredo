
import React from 'react';
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

interface SummaryCardProps {
  title: string;
  value: string | number;
  formattedValue?: string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

interface SummaryData {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  analyzing: number;
  recovered: number;
}

interface SummaryCardsProps {
  summary: SummaryData;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  formattedValue,
  icon,
  description,
  trend,
  color,
}) => {
  return (
    <div className={`bg-white rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">{formattedValue || value}</h3>
            {trend && (
              <span className={`ml-2 text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <SummaryCard
        title="Total Créditos"
        value={summary.total || 0}
        formattedValue={summary.total > 0 ? `${summary.total}` : '0'}
        icon={<BanknotesIcon className="h-6 w-6 text-blue-500" />}
        color="border-blue-100"
      />
      
      <SummaryCard
        title="Aprovados"
        value={summary.approved || 0}
        formattedValue={summary.approved > 0 ? `${summary.approved}` : '0'}
        icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
        color="border-green-100"
      />
      
      <SummaryCard
        title="Pendentes"
        value={summary.pending || 0}
        formattedValue={summary.pending > 0 ? `${summary.pending}` : '0'}
        icon={<ClockIcon className="h-6 w-6 text-yellow-500" />}
        color="border-yellow-100"
      />
      
      <SummaryCard
        title="Rejeitados"
        value={summary.rejected || 0}
        formattedValue={summary.rejected > 0 ? `${summary.rejected}` : '0'}
        icon={<XCircleIcon className="h-6 w-6 text-red-500" />}
        color="border-red-100"
      />
      
      <SummaryCard
        title="Em Análise"
        value={summary.analyzing || 0}
        formattedValue={summary.analyzing > 0 ? `${summary.analyzing}` : '0'}
        icon={<CogIcon className="h-6 w-6 text-purple-500" />}
        color="border-purple-100"
      />
      
      <SummaryCard
        title="Recuperados"
        value={summary.recovered || 0}
        formattedValue={summary.recovered > 0 ? `${summary.recovered}` : '0'}
        icon={<ArrowTrendingUpIcon className="h-6 w-6 text-indigo-500" />}
        color="border-indigo-100"
      />
    </div>
  );
};

export default SummaryCards;
