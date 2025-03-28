
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FileText, Download, Filter, Search, RefreshCw,
  FileUp, FilePlus2, Settings
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FiscalReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for fiscal reports
  const mockReports = [
    {
      id: '1',
      title: 'Relatório Fiscal Anual 2023',
      type: 'Anual',
      date: '2023-12-31',
      status: 'Concluído',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Declaração IRPJ - 1° Trimestre 2023',
      type: 'Trimestral',
      date: '2023-03-31',
      status: 'Concluído',
      size: '1.7 MB'
    },
    {
      id: '3',
      title: 'Análise de Créditos PIS/COFINS',
      type: 'Especial',
      date: '2023-06-15',
      status: 'Em processamento',
      size: '3.8 MB'
    },
    {
      id: '4',
      title: 'Auditoria Fiscal - 2° Semestre',
      type: 'Semestral',
      date: '2023-07-30',
      status: 'Pendente',
      size: '4.2 MB'
    }
  ];

  const filteredReports = mockReports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Relatórios Fiscais</CardTitle>
              <CardDescription>
                Visualize e gerencie os relatórios fiscais da sua empresa
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button>
                <FilePlus2 className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar relatório..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Concluído' ? 'bg-green-100 text-green-800' : 
                        report.status === 'Pendente' ? 'bg-amber-100 text-amber-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-4 text-muted-foreground">Nenhum relatório encontrado.</p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="ghost">
            <FileText className="mr-2 h-4 w-4" />
            Exportar tudo
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Baixar relatório
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FiscalReports;
