import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DashboardContent } from '@/components/admin/dashboard/DashboardContent';
import AdminLoading from '@/components/admin/AdminLoading';

interface AdminTabPageProps {
  params: {
    tab: string;
  };
}

export async function generateMetadata({ params }: AdminTabPageProps): Promise<Metadata> {
  const formattedTab = params.tab.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${formattedTab} - Admin Dashboard`,
    description: `Admin dashboard ${formattedTab.toLowerCase()} page`
  };
}

const validTabs = [
  'dashboard',
  'clients',
  'tax-credits',
  'tax-calculator',
  'calculations-irrf',
  'irrf-recovery',
  'credit-identification',
  'detailed-reports',
  'tax-compensation-reports',
  'interactive-dashboard',
  'retention-receipts',
  'fiscal-reports',
  'proposals',
  'audit-management',
  'profile'
];

export default function AdminTabPage({ params }: AdminTabPageProps) {
  if (!validTabs.includes(params.tab)) {
    notFound();
  }

  const content = (
    <Suspense fallback={<AdminLoading />}>
      {params.tab === 'dashboard' && <DashboardContent />}
      {/* Adicione outros componentes específicos para cada aba aqui */}
    </Suspense>
  );

  return (
    <AdminLayout activeTab={params.tab}>
      {content}
    </AdminLayout>
  );
} 