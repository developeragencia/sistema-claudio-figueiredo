
import React from 'react';
import { Lightbulb, FileCheck, Clock, AlertCircle } from 'lucide-react';
import SummaryCard from './SummaryCard';

const CreditSummarySection: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Oportunidades Identificadas"
        value="124"
        icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
        description="23 novas nos últimos 30 dias"
      />
      <SummaryCard
        title="Créditos Potenciais"
        value="R$ 2.856.432,67"
        icon={<FileCheck className="h-5 w-5 text-emerald-500" />}
        description="Valor total estimado"
      />
      <SummaryCard
        title="Análises em Andamento"
        value="42"
        icon={<Clock className="h-5 w-5 text-blue-500" />}
        description="8 concluídas esta semana"
      />
      <SummaryCard
        title="Alertas Fiscais"
        value="17"
        icon={<AlertCircle className="h-5 w-5 text-red-500" />}
        description="5 críticos, 12 médios"
      />
    </div>
  );
};

export default CreditSummarySection;
