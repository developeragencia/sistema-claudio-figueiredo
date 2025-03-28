
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnalysisItem from './AnalysisItem';

const AnalysisTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análises em Andamento</CardTitle>
        <CardDescription>Análises de identificação de créditos em processamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnalysisItem
            client="Empresa ABC Ltda"
            type="Análise Completa"
            period="Jan 2020 - Dez 2022"
            progress={65}
            estimatedCompletion="15/07/2023"
          />
          <AnalysisItem
            client="XYZ Indústria S.A."
            type="PIS/COFINS"
            period="2022"
            progress={80}
            estimatedCompletion="10/07/2023"
          />
          <AnalysisItem
            client="Tech Solutions Ltda"
            type="IRPJ/CSLL"
            period="2021-2022"
            progress={35}
            estimatedCompletion="22/07/2023"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisTabContent;
