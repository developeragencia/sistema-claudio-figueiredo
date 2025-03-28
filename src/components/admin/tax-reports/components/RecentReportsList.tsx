
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, Download, PieChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const recentReports = [
  {
    id: '1',
    title: 'Análise Comparativa - IRRF Q2',
    date: '15/05/2023',
    icon: <BarChart className="h-6 w-6 text-emerald-500" />,
    color: 'bg-emerald-50'
  },
  {
    id: '2',
    title: 'Dashboard Gerencial - Maio/2023',
    date: '01/06/2023',
    icon: <PieChart className="h-6 w-6 text-blue-500" />,
    color: 'bg-blue-50'
  },
  {
    id: '3',
    title: 'Comprovantes de Retenção - Abril',
    date: '10/05/2023',
    icon: <FileText className="h-6 w-6 text-amber-500" />,
    color: 'bg-amber-50'
  }
];

const RecentReportsList: React.FC = () => {
  const handleDownload = (reportId: string) => {
    const report = recentReports.find(r => r.id === reportId);
    if (report) {
      toast("Download iniciado", {
        description: `Baixando ${report.title}`
      });
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Relatórios Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReports.map(report => (
            <div key={report.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center">
                <div className={`${report.color} p-2 rounded-md mr-4`}>
                  {report.icon}
                </div>
                <div>
                  <h4 className="font-medium">{report.title}</h4>
                  <p className="text-sm text-muted-foreground">Gerado em: {report.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDownload(report.id)}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="pt-4">
            <Button variant="link" className="p-0 h-auto">
              Ver todos os relatórios <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReportsList;
