
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportTabContent from './ReportTabContent';
import FilterButton from './FilterButton';
import { useReportsStore } from '../hooks/useReportsStore';

const ReportsTabs = () => {
  const { selectedReportType, setSelectedReportType } = useReportsStore();
  
  return (
    <Tabs value={selectedReportType} onValueChange={setSelectedReportType} className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <TabsList className="w-full sm:w-auto overflow-x-auto flex flex-nowrap sm:flex-wrap">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="tax">Fiscal</TabsTrigger>
        </TabsList>
        
        <FilterButton />
      </div>
      
      <TabsContent value="all" className="mt-0">
        <ReportTabContent title="Todos os Relatórios" description="Lista de todos os relatórios disponíveis no sistema" />
      </TabsContent>
      
      <TabsContent value="financial" className="mt-0">
        <ReportTabContent title="Relatórios Financeiros" description="Lista de relatórios financeiros disponíveis no sistema" isEmptyState />
      </TabsContent>
      
      <TabsContent value="users" className="mt-0">
        <ReportTabContent title="Relatórios de Usuários" description="Lista de relatórios de usuários disponíveis no sistema" isEmptyState />
      </TabsContent>
      
      <TabsContent value="sales" className="mt-0">
        <ReportTabContent title="Relatórios de Vendas" description="Lista de relatórios de vendas disponíveis no sistema" isEmptyState />
      </TabsContent>
      
      <TabsContent value="tax" className="mt-0">
        <ReportTabContent title="Relatórios Fiscais" description="Lista de relatórios fiscais disponíveis no sistema" isEmptyState />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTabs;
