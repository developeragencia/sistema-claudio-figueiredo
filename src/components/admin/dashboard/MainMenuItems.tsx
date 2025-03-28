import React from 'react';
import {
  Building,
  CreditCard,
  Calculator as CalculatorIcon,
  Percent,
  BriefcaseBusiness,
  Search,
  FileText,
  FileBarChart,
  ChartPie,
  Receipt,
  PieChart,
  FileDigit,
  Shield
} from 'lucide-react';
import { MenuItem } from './types';

export const getMainMenuItems = (): MenuItem[] => [
  {
    id: 'clients',
    title: 'Gestão de Clientes',
    description: 'Gerencie todos os seus clientes em um só lugar, com informações detalhadas e histórico completo.',
    icon: <Building className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    route: 'clients'
  },
  {
    id: 'tax_credits',
    title: 'Créditos Tributários',
    description: 'Acompanhe os créditos tributários, histórico de compensações e status de aprovação.',
    icon: <CreditCard className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    route: 'tax_credits'
  },
  {
    id: 'tax_calculator',
    title: 'Calculadora Avançada',
    description: 'Ferramenta completa para cálculos de créditos tributários com correção SELIC automatizada.',
    icon: <CalculatorIcon className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    route: 'tax_calculator',
    highlight: true,
    new: true
  },
  {
    id: 'calculations',
    title: 'Cálculos IRRF',
    description: 'Realize cálculos precisos de IRRF com ajustes automáticos conforme a legislação vigente.',
    icon: <Percent className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-violet-500 to-violet-700',
    route: 'calculations/irrf'
  },
  {
    id: 'irrf_recovery',
    title: 'Recuperação IRRF/PJ',
    description: 'Identifique oportunidades de recuperação de IRRF retido indevidamente sobre faturamento PJ.',
    icon: <BriefcaseBusiness className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-700',
    route: 'irrf_recovery'
  },
  {
    id: 'credit_identification',
    title: 'Identificação de Créditos',
    description: 'Sistema inteligente para identificação de oportunidades de créditos tributários.',
    icon: <Search className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-pink-500 to-pink-700',
    route: 'credit_identification'
  },
  {
    id: 'detailed_reports',
    title: 'Relatórios Detalhados',
    description: 'Gere relatórios completos sobre a situação fiscal e oportunidades identificadas.',
    icon: <FileText className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-rose-500 to-rose-700',
    route: 'detailed_reports'
  },
  {
    id: 'tax_compensation_reports',
    title: 'Compensação Tributária',
    description: 'Acompanhe os processos de compensação tributária e seus respectivos status.',
    icon: <FileBarChart className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-orange-500 to-orange-700',
    route: 'tax_compensation_reports'
  },
  {
    id: 'interactive_dashboard',
    title: 'Dashboard Interativo',
    description: 'Visualize dados em tempo real com gráficos interativos e filtros personalizáveis.',
    icon: <ChartPie className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-amber-500 to-amber-700',
    route: 'interactive_dashboard'
  },
  {
    id: 'retention_receipts',
    title: 'Comprovantes de Retenção',
    description: 'Armazene e gerencie todos os comprovantes de retenção em um só lugar.',
    icon: <Receipt className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
    route: 'retention_receipts'
  },
  {
    id: 'fiscal_reports',
    title: 'Relatórios Fiscais',
    description: 'Gere relatórios fiscais completos para análise e tomada de decisões estratégicas.',
    icon: <PieChart className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-lime-500 to-lime-700',
    route: 'fiscal_reports'
  },
  {
    id: 'proposals',
    title: 'Propostas Comerciais',
    description: 'Crie e gerencie propostas comerciais personalizadas para seus clientes.',
    icon: <FileDigit className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-green-500 to-green-700',
    route: 'commercial/proposals'
  },
  {
    id: 'audit_management',
    title: 'Gestão de Auditorias',
    description: 'Acompanhe e gerencie auditorias fiscais, com histórico completo e documentação.',
    icon: <Shield className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    route: 'audit_management'
  },
];
