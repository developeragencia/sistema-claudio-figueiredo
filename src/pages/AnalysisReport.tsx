
import React from 'react';
import { useNavigate, useParams  } from "@/hooks/use-router";
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Button } from '@/components/ui/button';
import { FileBarChart2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalysisReport = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8 mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <FileBarChart2 className="h-5 w-5 mr-2 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Relatório de Análise #{id}</h1>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Este é o relatório de análise fiscal #{id}.</p>
            <p className="text-muted-foreground">
              Aqui serão exibidos os detalhes completos da análise, incluindo resultados,
              recomendações e outras informações pertinentes ao processo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisReport;
