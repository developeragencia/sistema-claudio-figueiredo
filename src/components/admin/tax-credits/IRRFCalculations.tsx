
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaxCalculationForm from './calculations/TaxCalculationForm';
import ComparisonAnalysis from './calculations/ComparisonAnalysis';
import SupplierCnaeTable from './calculations/SupplierCnaeTable';
import SelicCorrectionPanel from './calculations/SelicCorrectionPanel';

const IRRFCalculations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calculation');

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">Cálculos e Análises</h1>
        <p className="text-muted-foreground">
          Ferramentas para análise de créditos, cálculos e comparações tributárias.
        </p>
      </div>

      <Tabs defaultValue="calculation" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="calculation">Cálculo de IRRF</TabsTrigger>
          <TabsTrigger value="comparison">Análise Comparativa</TabsTrigger>
          <TabsTrigger value="suppliers">Fornecedores CNAE</TabsTrigger>
          <TabsTrigger value="selic">Correção pela Selic</TabsTrigger>
        </TabsList>
        <TabsContent value="calculation">
          <TaxCalculationForm />
        </TabsContent>
        <TabsContent value="comparison">
          <ComparisonAnalysis />
        </TabsContent>
        <TabsContent value="suppliers">
          <SupplierCnaeTable />
        </TabsContent>
        <TabsContent value="selic">
          <SelicCorrectionPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFCalculations;
