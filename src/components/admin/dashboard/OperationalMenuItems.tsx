import React from 'react';
import {
  FileSpreadsheet,
  BarChart3,
  FolderCheck,
  FileClock,
  FileSearch,
  Database,
  BarChart4,
  ClipboardCheck,
  FileBarChart2,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { MenuItem } from './types';

export const getOperationalMenuItems = (): MenuItem[] => [
  {
    id: 'operational_imports',
    title: 'Importação de Dados',
    description: 'Importe facilmente dados de sistemas externos através de planilhas ou APIs.',
    icon: <FileSpreadsheet className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-teal-500 to-teal-700',
    route: 'operational_imports',
  },
  {
    id: 'operational_dashboard',
    title: 'Dashboard Operacional',
    description: 'Acompanhe métricas operacionais importantes e estatísticas de processamento.',
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
    route: 'operational_dashboard',
  },
  {
    id: 'operational_audits',
    title: 'Auditorias Operacionais',
    description: 'Verifique a qualidade dos dados e processos com auditorias detalhadas.',
    icon: <FolderCheck className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-sky-500 to-sky-700',
    route: 'operational_audits',
  },
  {
    id: 'operational_receipts',
    title: 'Comprovantes Operacionais',
    description: 'Gerencie documentos fiscais e comprovantes relacionados às operações.',
    icon: <FileClock className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    route: 'operational_receipts',
  },
  {
    id: 'imports_filter',
    title: 'Filtro de Importações',
    description: 'Configure filtros avançados para os dados importados.',
    icon: <FileSearch className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    route: 'imports/filter',
    new: true
  },
  {
    id: 'data_visualization',
    title: 'Visualização de Dados',
    description: 'Visualize seus dados em diferentes formatos de gráficos e tabelas dinâmicas.',
    icon: <BarChart4 className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-violet-500 to-violet-700',
    route: 'data_visualization',
  },
  {
    id: 'operational_monitoring',
    title: 'Monitoramento',
    description: 'Acompanhe o status de todas as operações em tempo real.',
    icon: <Database className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    route: 'operational_monitoring',
  },
  {
    id: 'compliance_checks',
    title: 'Verificações de Compliance',
    description: 'Garanta que todas as operações estejam em conformidade com a legislação.',
    icon: <ClipboardCheck className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-700',
    route: 'compliance_checks',
  },
  {
    id: 'operational_reports',
    title: 'Relatórios Operacionais',
    description: 'Gere relatórios detalhados sobre as operações e processamentos.',
    icon: <FileBarChart2 className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-pink-500 to-pink-700',
    route: 'operational_reports',
  },
  {
    id: 'data_processing',
    title: 'Processamento de Dados',
    description: 'Configure e acompanhe o processamento automático de dados.',
    icon: <Layers className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-rose-500 to-rose-700',
    route: 'data_processing',
  },
  {
    id: 'data_reconciliation',
    title: 'Reconciliação de Dados',
    description: 'Compare e reconcilie dados de diferentes fontes para garantir consistência.',
    icon: <ArrowUpDown className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-orange-500 to-orange-700',
    route: 'data_reconciliation',
    highlight: true
  },
];
