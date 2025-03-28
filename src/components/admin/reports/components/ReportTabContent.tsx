
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import ReportsTable from './ReportsTable';
import { useReportsStore } from '../hooks/useReportsStore';

interface ReportTabContentProps {
  title: string;
  description: string;
  isEmptyState?: boolean;
}

const ReportTabContent: React.FC<ReportTabContentProps> = ({ 
  title, 
  description, 
  isEmptyState = false 
}) => {
  const { filteredReports } = useReportsStore();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-6 overflow-x-auto">
        {isEmptyState ? (
          <div className="text-center py-6 text-muted-foreground">
            Selecione o período para gerar relatórios {
              title.toLowerCase().includes('financeiros') ? 'financeiros' : 
              title.toLowerCase().includes('usuários') ? 'de usuários' : 
              title.toLowerCase().includes('vendas') ? 'de vendas' : 'fiscais'
            }.
          </div>
        ) : (
          <ReportsTable />
        )}
      </CardContent>
    </Card>
  );
};

export default ReportTabContent;
