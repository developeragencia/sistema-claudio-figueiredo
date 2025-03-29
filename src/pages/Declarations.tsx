import React, { useState } from 'react';
import { useNavigate  } from "@/hooks/use-router";
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft, Search, Filter, Plus, Download, UploadCloud } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';
import { Declaration, DeclarationTableProps } from '@/types/declarations';

// Mock data for declarations
const MOCK_DECLARATIONS = [
  {
    id: '1',
    type: 'IRPJ',
    period: '2023-Q1',
    dueDate: '2023-04-30',
    submissionDate: '2023-04-25',
    status: 'approved',
    amount: 'R$ 12.450,00',
  },
  {
    id: '2',
    type: 'CSLL',
    period: '2023-Q1',
    dueDate: '2023-04-30',
    submissionDate: '2023-04-25',
    status: 'approved',
    amount: 'R$ 8.750,00',
  },
  {
    id: '3',
    type: 'PIS/COFINS',
    period: '2023-Q2',
    dueDate: '2023-07-30',
    submissionDate: null,
    status: 'pending',
    amount: 'R$ 15.200,00',
  },
  {
    id: '4',
    type: 'IRPJ',
    period: '2023-Q2',
    dueDate: '2023-07-30',
    submissionDate: '2023-07-15',
    status: 'analyzing',
    amount: 'R$ 13.850,00',
  },
  {
    id: '5',
    type: 'INSS',
    period: '2023-Q2',
    dueDate: '2023-07-30',
    submissionDate: '2023-07-29',
    status: 'rejected',
    amount: 'R$ 7.350,00',
  }
];

const Declarations = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: '',
    submissionDate: null as string | null,
    search: ''
  });
  const [activeTab, setActiveTab] = useState('pending');
  
  // Filter declarations based on search query and active tab
  const filteredDeclarations = MOCK_DECLARATIONS.filter(declaration => {
    const matchesSearch = 
      declaration.type.toLowerCase().includes(filters.search.toLowerCase()) ||
      declaration.period.toLowerCase().includes(filters.search.toLowerCase()) ||
      declaration.amount.toLowerCase().includes(filters.search.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && declaration.status === 'pending';
    if (activeTab === 'submitted') return matchesSearch && (declaration.status === 'approved' || declaration.status === 'analyzing');
    if (activeTab === 'rejected') return matchesSearch && declaration.status === 'rejected';
    
    return matchesSearch;
  });
  
  // Count declarations by status
  const pendingCount = MOCK_DECLARATIONS.filter(d => d.status === 'pending').length;
  const submittedCount = MOCK_DECLARATIONS.filter(d => d.status === 'approved' || d.status === 'analyzing').length;
  const rejectedCount = MOCK_DECLARATIONS.filter(d => d.status === 'rejected').length;

  const handleNewDeclaration = () => {
    navigate('/declarations/new');
  };
  
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
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Declarações</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-muted/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{MOCK_DECLARATIONS.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Enviadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{submittedCount}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rejeitadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <CardTitle>Gerenciar Declarações</CardTitle>
                <CardDescription>
                  Visualize e gerencie todas as suas declarações fiscais
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleNewDeclaration}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Declaração
                </Button>
                <Button variant="outline">
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Importar
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Buscar declaração..."
                  className="pl-9"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-6">
                <TabsList className="bg-transparent border-b-0 p-0">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                  >
                    Todas
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                  >
                    Pendentes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="submitted" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                  >
                    Enviadas
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rejected" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                  >
                    Rejeitadas
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0">
                <DeclarationsTable declarations={filteredDeclarations} />
              </TabsContent>
              
              <TabsContent value="pending" className="m-0">
                <DeclarationsTable declarations={filteredDeclarations} />
              </TabsContent>
              
              <TabsContent value="submitted" className="m-0">
                <DeclarationsTable declarations={filteredDeclarations} />
              </TabsContent>
              
              <TabsContent value="rejected" className="m-0">
                <DeclarationsTable declarations={filteredDeclarations} />
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredDeclarations.length} de {MOCK_DECLARATIONS.length} declarações
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Separate component for the declarations table
const DeclarationsTable = ({ declarations }: DeclarationTableProps) => {
  const navigate = useNavigate();
  
  const handleRowClick = (id: string) => {
    navigate(`/declarations/${id}`);
  };
  
  return declarations.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Período</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Data de Envio</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {declarations.map((declaration) => (
          <TableRow 
            key={declaration.id} 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleRowClick(declaration.id)}
          >
            <TableCell className="font-medium">{declaration.type}</TableCell>
            <TableCell>{declaration.period}</TableCell>
            <TableCell>{new Date(declaration.dueDate).toLocaleDateString('pt-BR')}</TableCell>
            <TableCell>
              {declaration.submissionDate 
                ? new Date(declaration.submissionDate).toLocaleDateString('pt-BR') 
                : '-'}
            </TableCell>
            <TableCell>
              <StatusBadge status={declaration.status} />
            </TableCell>
            <TableCell>{declaration.amount}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Visualizar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="flex flex-col items-center justify-center p-8">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Nenhuma declaração encontrada</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Não existem declarações correspondentes aos critérios de busca.
      </p>
    </div>
  );
};

export default Declarations;
