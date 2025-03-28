
import React from 'react';
import {
  User,
  Users,
  Settings,
  LayoutDashboard,
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
  KeyRound,
  ShieldCheck,
  Clock,
  FileBarChart,
  PanelTop
} from 'lucide-react';

export const tabConfigurations = {
  dashboard: {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Visão geral das principais métricas do sistema'
  },
  users: {
    icon: Users,
    title: 'Usuários',
    description: 'Gerencie os usuários e suas permissões no sistema'
  },
  settings: {
    icon: Settings,
    title: 'Configurações',
    description: 'Configurações gerais do sistema'
  },
  profile: {
    icon: User,
    title: 'Perfil',
    description: 'Gerenciamento de perfis de usuário'
  },
  clients: {
    icon: Building,
    title: 'Clientes',
    description: 'Gerenciamento de clientes'
  },
  tax_credits: {
    icon: CreditCard,
    title: 'Créditos Tributários',
    description: 'Gerenciamento de créditos tributários'
  },
  recovery: {
    icon: BriefcaseBusiness,
    title: 'Recuperação',
    description: 'Gestão de processos de recuperação de créditos'
  },
  credit_identification: {
    icon: Search,
    title: 'Identificação de Créditos',
    description: 'Identificação automática de créditos tributários'
  },
  data_processing: {
    icon: ServerCog,
    title: 'Processamento de Dados',
    description: 'Processamento e análise de dados fiscais'
  },
  audits: {
    icon: Shield,
    title: 'Auditorias',
    description: 'Gestão de auditorias fiscais'
  },
  calculations: {
    icon: Calculator,
    title: 'Cálculos IRRF',
    description: 'Simulações e cálculos de IRRF'
  },
  irrf_recovery: {
    icon: BriefcaseBusiness,
    title: 'Recuperação IRRF/PJ',
    description: 'Gestão de recuperação de IRRF para empresas'
  },
  tax_calculator: {
    icon: Calculator,
    title: 'Calculadora de Créditos',
    description: 'Cálculo de créditos tributários'
  },
  imports: {
    icon: FileSpreadsheet,
    title: 'Importações',
    description: 'Importação de dados fiscais'
  },
  fiscal_reports: {
    icon: FileText,
    title: 'Relatórios Fiscais',
    description: 'Geração e visualização de relatórios fiscais'
  },
  proposals: {
    icon: FileDigit,
    title: 'Propostas',
    description: 'Gestão de propostas comerciais'
  },
  site: {
    icon: Paintbrush,
    title: 'Editor do Site',
    description: 'Personalize a aparência e o conteúdo do seu site'
  },
  content_reports: {
    icon: PanelTop,
    title: 'Relatórios de Conteúdo',
    description: 'Análise de conteúdo e engajamento do site'
  },
  detailed_reports: {
    icon: FileText,
    title: 'Relatórios Detalhados',
    description: 'Relatórios detalhados sobre os créditos'
  },
  interactive_dashboard: {
    icon: ChartPie,
    title: 'Dashboard Interativo',
    description: 'Painel interativo com métricas e análises'
  },
  retention_receipts: {
    icon: Receipt,
    title: 'Comprovantes de Retenção',
    description: 'Gestão de comprovantes de retenção fiscal'
  },
  operational_imports: {
    icon: FileSpreadsheet,
    title: 'Importação de Dados',
    description: 'Importação de dados operacionais'
  },
  operational_recovery: {
    icon: BriefcaseBusiness,
    title: 'Recuperação Operacional',
    description: 'Processos de recuperação operacional'
  },
  operational_credit_identification: {
    icon: Search,
    title: 'Identificação de Créditos Operacionais',
    description: 'Identificação de créditos operacionais'
  },
  operational_dashboard: {
    icon: BarChart3,
    title: 'Dashboard Operacional',
    description: 'Visão geral das operações'
  },
  operational_receipts: {
    icon: Receipt,
    title: 'Comprovantes Operacionais',
    description: 'Gestão de comprovantes operacionais'
  },
  operational_audits: {
    icon: FolderCheck,
    title: 'Auditorias Operacionais',
    description: 'Gestão de auditorias operacionais'
  },
  two_factor_auth: {
    icon: ShieldCheck,
    title: 'Autenticação em Dois Fatores',
    description: 'Configure a autenticação de dois fatores para adicionar uma camada extra de segurança'
  },
  session_expiration: {
    icon: Clock,
    title: 'Expiração de Sessão',
    description: 'Configure o tempo de expiração de sessão e gerencie sessões ativas'
  },
  access_protection: {
    icon: KeyRound,
    title: 'Proteção de Acesso',
    description: 'Configure proteções contra tentativas de acesso indevido e alertas de segurança'
  },
  audit_trails: {
    icon: FileClock,
    title: 'Trilhas de Auditoria',
    description: 'Monitore as atividades e ações realizadas no sistema'
  },
  admin_profile: {
    icon: UserCircle,
    title: 'Meu Perfil',
    description: 'Gerencie suas informações pessoais e preferências'
  },
  billing: {
    icon: BillingIcon,
    title: 'Faturamento',
    description: 'Gerencie informações de pagamento e faturamento'
  },
  support: {
    icon: MessageSquareText,
    title: 'Suporte',
    description: 'Entre em contato com nossa equipe de suporte'
  },
  system_documentation: {
    icon: BookOpen,
    title: 'Documentação',
    description: 'Acesse a documentação completa do sistema'
  },
  notifications: {
    icon: Bell,
    title: 'Notificações',
    description: 'Gerencie suas notificações do sistema'
  },
  tax_compensation_reports: {
    icon: FileBarChart,
    title: 'Compensação Tributária',
    description: 'Simulação e relatórios para compensação fiscal com correção pela SELIC'
  }
};
