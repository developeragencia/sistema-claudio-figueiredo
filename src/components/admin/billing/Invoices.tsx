
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Filter, RefreshCw } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2023-001',
    date: '2023-08-01',
    dueDate: '2023-08-15',
    amount: 1250.00,
    status: 'paid',
    description: 'Assinatura Mensal - Agosto/2023'
  },
  {
    id: '2',
    number: 'INV-2023-002',
    date: '2023-09-01',
    dueDate: '2023-09-15',
    amount: 1250.00,
    status: 'pending',
    description: 'Assinatura Mensal - Setembro/2023'
  },
  {
    id: '3',
    number: 'INV-2023-003',
    date: '2023-07-01',
    dueDate: '2023-07-15',
    amount: 1250.00,
    status: 'paid',
    description: 'Assinatura Mensal - Julho/2023'
  },
  {
    id: '4',
    number: 'INV-2023-004',
    date: '2023-06-01',
    dueDate: '2023-06-15',
    amount: 1250.00,
    status: 'paid',
    description: 'Assinatura Mensal - Junho/2023'
  },
  {
    id: '5',
    number: 'INV-2023-005',
    date: '2023-05-01',
    dueDate: '2023-05-15',
    amount: 1250.00,
    status: 'paid',
    description: 'Assinatura Mensal - Maio/2023'
  }
];

export const Invoices = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      toast({
        title: "Download iniciado",
        description: `O download da fatura ${invoice.number} foi iniciado.`,
      });
    }
  };

  const handlePay = (invoiceId: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: 'paid' as const } : invoice
    ));
    
    toast({
      title: "Pagamento processado",
      description: "O pagamento foi processado com sucesso.",
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Faturas atualizadas",
        description: "A lista de faturas foi atualizada com sucesso.",
      });
    }, 1000);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDialog(true);
  };

  const getStatusComponent = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30">Pendente</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30">Vencido</Badge>;
      default:
        return null;
    }
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Histórico de Faturas</CardTitle>
            <CardDescription>
              Visualize e baixe seus comprovantes de pagamento
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar faturas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="paid">Pagas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <InvoiceTable
                invoices={filteredInvoices}
                onDownload={handleDownloadInvoice}
                onPay={handlePay}
                onView={handleViewInvoice}
                getStatusComponent={getStatusComponent}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <InvoiceTable
                invoices={filteredInvoices.filter(i => i.status === 'pending')}
                onDownload={handleDownloadInvoice}
                onPay={handlePay}
                onView={handleViewInvoice}
                getStatusComponent={getStatusComponent}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </TabsContent>
            
            <TabsContent value="paid">
              <InvoiceTable
                invoices={filteredInvoices.filter(i => i.status === 'paid')}
                onDownload={handleDownloadInvoice}
                onPay={handlePay}
                onView={handleViewInvoice}
                getStatusComponent={getStatusComponent}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Fatura</DialogTitle>
            <DialogDescription>
              Visualize os detalhes e informações de pagamento da fatura selecionada.
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedInvoice.number}</h3>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.description}</p>
                </div>
                <div className="text-right">
                  <div className="mb-1">{getStatusComponent(selectedInvoice.status)}</div>
                  <p className="text-2xl font-bold">{formatCurrency(selectedInvoice.amount)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data de emissão</p>
                  <p>{formatDate(selectedInvoice.date)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data de vencimento</p>
                  <p>{formatDate(selectedInvoice.dueDate)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Detalhes do serviço</h4>
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Assinatura mensal</span>
                    <span>{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                {selectedInvoice.status === 'pending' && (
                  <Button onClick={() => {
                    handlePay(selectedInvoice.id);
                    setShowInvoiceDialog(false);
                  }}>
                    Pagar Agora
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

interface InvoiceTableProps {
  invoices: Invoice[];
  onDownload: (id: string) => void;
  onPay: (id: string) => void;
  onView: (invoice: Invoice) => void;
  getStatusComponent: (status: Invoice['status']) => React.ReactNode;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onDownload,
  onPay,
  onView,
  getStatusComponent,
  formatCurrency,
  formatDate
}) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma fatura encontrada</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Número</th>
            <th className="py-3 px-4 text-left font-medium">Data</th>
            <th className="py-3 px-4 text-left font-medium">Vencimento</th>
            <th className="py-3 px-4 text-left font-medium">Descrição</th>
            <th className="py-3 px-4 text-left font-medium">Valor</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-right font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b hover:bg-muted/50 cursor-pointer" onClick={() => onView(invoice)}>
              <td className="py-3 px-4">{invoice.number}</td>
              <td className="py-3 px-4">{formatDate(invoice.date)}</td>
              <td className="py-3 px-4">{formatDate(invoice.dueDate)}</td>
              <td className="py-3 px-4">{invoice.description}</td>
              <td className="py-3 px-4 font-medium">{formatCurrency(invoice.amount)}</td>
              <td className="py-3 px-4">
                {getStatusComponent(invoice.status)}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onDownload(invoice.id)}
                    title="Baixar fatura"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Baixar</span>
                  </Button>
                  {invoice.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => onPay(invoice.id)}
                    >
                      Pagar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
