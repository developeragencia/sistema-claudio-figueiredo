
import React from 'react';
import {
  Home,
  User,
  Users,
  Settings,
  FileText,
  PieChart,
  Shield,
  Paintbrush,
  CreditCard,
  Calculator,
  BriefcaseBusiness,
  Building,
  BarChart3,
  Receipt,
  ServerCog,
  FileDigit,
  FileClock,
  ChartPie,
  FileSpreadsheet,
  FolderCheck,
  Search,
  MessageSquareText,
  HelpCircle,
  CreditCard as BillingIcon,
  Bell,
  BookOpen,
  UserCircle,
  Laptop,
  KeyRound,
  ShieldCheck,
  Clock,
  PanelTop,
  ShieldAlert,
  FileBarChart,
  Scale,
  Currency,
  Calculator as CalculatorIcon,
  Percent,
  BadgeDollarSign,
  DollarSign
} from 'lucide-react';

export const getMenuSections = () => [
  {
    id: 'main',
    title: 'Principal',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Home className="h-4 w-4" />,
      },
      {
        id: 'admin_profile',
        label: 'Meu Perfil',
        icon: <UserCircle className="h-4 w-4" />,
      },
      {
        id: 'settings',
        label: 'Configurações',
        icon: <Settings className="h-4 w-4" />,
      },
    ],
  },
  {
    id: 'main_modules',
    title: 'Módulos Principais',
    items: [
      {
        id: 'clients',
        label: 'Gestão de Clientes',
        icon: <Building className="h-4 w-4" />,
      },
      {
        id: 'tax_credits',
        label: 'Créditos Tributários',
        icon: <CreditCard className="h-4 w-4" />,
      },
      {
        id: 'tax_calculator',
        label: 'Calculadora Avançada',
        icon: <CalculatorIcon className="h-4 w-4" />,
        highlight: true,
      },
      {
        id: 'calculations',
        label: 'Cálculos IRRF',
        icon: <Percent className="h-4 w-4" />,
      },
      {
        id: 'irrf_recovery',
        label: 'Recuperação IRRF/PJ',
        icon: <BriefcaseBusiness className="h-4 w-4" />,
      },
      {
        id: 'credit_identification',
        label: 'Identificação de Créditos',
        icon: <Search className="h-4 w-4" />,
      },
      {
        id: 'detailed_reports',
        label: 'Relatórios Detalhados',
        icon: <FileText className="h-4 w-4" />,
      },
      {
        id: 'tax_compensation_reports',
        label: 'Compensação Tributária',
        icon: <FileBarChart className="h-4 w-4" />,
      },
      {
        id: 'interactive_dashboard',
        label: 'Dashboard Interativo',
        icon: <ChartPie className="h-4 w-4" />,
      },
      {
        id: 'retention_receipts',
        label: 'Comprovantes de Retenção',
        icon: <Receipt className="h-4 w-4" />,
      },
      {
        id: 'fiscal_reports',
        label: 'Relatórios Fiscais',
        icon: <PieChart className="h-4 w-4" />,
      },
      {
        id: 'proposals',
        label: 'Propostas Comerciais',
        icon: <FileDigit className="h-4 w-4" />,
      },
      {
        id: 'audit_management',
        label: 'Gestão de Auditorias',
        icon: <Shield className="h-4 w-4" />,
      },
    ],
  },
  {
    id: 'security',
    title: 'Segurança & Auditoria',
    items: [
      {
        id: 'two_factor_auth',
        label: 'Autenticação em Dois Fatores',
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        id: 'session_expiration',
        label: 'Expiração de Sessão',
        icon: <Clock className="h-4 w-4" />,
      },
      {
        id: 'access_protection',
        label: 'Proteção de Acesso',
        icon: <KeyRound className="h-4 w-4" />,
      },
      {
        id: 'audit_trails',
        label: 'Trilhas de Auditoria',
        icon: <FileClock className="h-4 w-4" />,
      },
      {
        id: 'users',
        label: 'Usuários e Permissões',
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    id: 'operational',
    title: 'Operacional',
    items: [
      {
        id: 'operational_imports',
        label: 'Importação de Dados',
        icon: <FileSpreadsheet className="h-4 w-4" />,
      },
      {
        id: 'operational_dashboard',
        label: 'Dashboard Operacional',
        icon: <BarChart3 className="h-4 w-4" />,
      },
      {
        id: 'operational_audits',
        label: 'Auditorias Operacionais',
        icon: <FolderCheck className="h-4 w-4" />,
      },
      {
        id: 'operational_receipts',
        label: 'Comprovantes Operacionais',
        icon: <FileClock className="h-4 w-4" />,
      },
    ],
  },
  {
    id: 'content',
    title: 'Site e Conteúdo',
    items: [
      {
        id: 'site',
        label: 'Editor do Site',
        icon: <Paintbrush className="h-4 w-4" />,
      },
      {
        id: 'content_reports',
        label: 'Relatórios de Conteúdo',
        icon: <PanelTop className="h-4 w-4" />,
      },
    ],
  },
  {
    id: 'support',
    title: 'Suporte',
    items: [
      {
        id: 'system_documentation',
        label: 'Documentação',
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        id: 'notifications',
        label: 'Notificações',
        icon: <Bell className="h-4 w-4" />,
      },
      {
        id: 'support',
        label: 'Suporte Técnico',
        icon: <HelpCircle className="h-4 w-4" />,
      },
      {
        id: 'billing',
        label: 'Faturamento',
        icon: <BillingIcon className="h-4 w-4" />,
      },
    ],
  },
];
