
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  Printer,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Plus,
  User,
  Calendar,
  ChevronsUpDown,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Receipt {
  id: string;
  supplier: string;
  description: string;
  date: string;
  amount: string;
  status: 'pending' | 'sent' | 'error';
  taxType: string;
}

const RetentionReceiptsPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [receipts, setReceipts] = useState<Receipt[]>([
    {
      id: "REC001",
      supplier: "Empresa ABC Ltda",
      description: "Retenção IRRF - Serviços de TI",
      date: "2023-06-15",
      amount: "R$ 2.450,00",
      status: "sent",
      taxType: "IRRF"
    },
    {
      id: "REC002",
      supplier: "XYZ Consultoria",
      description: "Retenção PIS/COFINS/CSLL",
      date: "2023-05-28",
      amount: "R$ 1.876,30",
      status: "sent",
      taxType: "PIS/COFINS/CSLL"
    },
    {
      id: "REC003",
      supplier: "Contabilidade Silva & Cia",
      description: "Retenção IRRF - Serviços Contábeis",
      date: "2023-06-02",
      amount: "R$ 975,45",
      status: "pending",
      taxType: "IRRF"
    },
    {
      id: "REC004",
      supplier: "Tech Solutions S.A.",
      description: "Retenção ISS",
      date: "2023-06-10",
      amount: "R$ 3.245,80",
      status: "error",
      taxType: "ISS"
    }
  ]);

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = 
      receipt.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && receipt.status === statusFilter;
    }
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Dados atualizados", {
        description: "Lista de comprovantes atualizada com sucesso."
      });
    }, 1500);
  };

  const handleCreateReceipt = () => {
    setShowCreateDialog(false);
    
    const newReceipt: Receipt = {
      id: `REC00${receipts.length + 1}`,
      supplier: "Novo Fornecedor",
      description: "Retenção IRRF - Serviços Gerais",
      date: new Date().toISOString().split('T')[0],
      amount: "R$ 1.500,00",
      status: "pending",
      taxType: "IRRF"
    };
    
    setReceipts([newReceipt, ...receipts]);
    
    toast("Comprovante criado", {
      description: "Novo comprovante de retenção criado com sucesso."
    });
  };

  const handleSendReceipt = (id: string) => {
    const updatedReceipts = receipts.map(receipt => {
      if (receipt.id === id) {
        return { ...receipt, status: 'sent' as const };
      }
      return receipt;
    });
    
    setReceipts(updatedReceipts);
    
    toast("Comprovante enviado", {
      description: `Comprovante ${id} enviado com sucesso para o fornecedor.`
    });
  };

  const handleDeleteReceipt = (id: string) => {
    const updatedReceipts = receipts.filter(receipt => receipt.id !== id);
    setReceipts(updatedReceipts);
    
    toast("Comprovante excluído", {
      description: `Comprovante ${id} foi excluído com sucesso.`
    });
  };

  const handleDownloadReceipt = (id: string) => {
    toast("Download iniciado", {
      description: `Baixando comprovante ${id}.`
    });
  };

  const handlePrintReceipt = (id: string) => {
    toast("Imprimindo comprovante", {
      description: `Preparando impressão do comprovante ${id}.`
    });
  };

  const getStatusBadge = (status: 'pending' | 'sent' | 'error') => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pendente</Badge>;
      case 'sent':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enviado</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Erro</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Comprovantes de Retenção</h2>
          <p className="text-muted-foreground">
            Gerencie e emita comprovantes de retenção para fornecedores e órgãos públicos
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Comprovante
          </Button>
          
          <Button variant="outline" onClick={() => handleRefresh()}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar comprovante..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sent">Enviados</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="error">Com erro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">{receipt.id}</TableCell>
                    <TableCell>{receipt.supplier}</TableCell>
                    <TableCell>{receipt.description}</TableCell>
                    <TableCell>{new Date(receipt.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{receipt.amount}</TableCell>
                    <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {receipt.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleSendReceipt(receipt.id)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDownloadReceipt(receipt.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handlePrintReceipt(receipt.id)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteReceipt(receipt.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    Nenhum comprovante encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Comprovante de Retenção</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Select defaultValue="supplier1">
                <SelectTrigger id="supplier">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplier1">Empresa ABC Ltda</SelectItem>
                  <SelectItem value="supplier2">XYZ Consultoria</SelectItem>
                  <SelectItem value="supplier3">Tech Solutions S.A.</SelectItem>
                  <SelectItem value="supplier4">Contabilidade Silva & Cia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tax-type">Tipo de Retenção</Label>
              <Select defaultValue="irrf">
                <SelectTrigger id="tax-type">
                  <SelectValue placeholder="Selecione o tipo de retenção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irrf">IRRF - Imposto de Renda Retido na Fonte</SelectItem>
                  <SelectItem value="pcc">PIS/COFINS/CSLL</SelectItem>
                  <SelectItem value="iss">ISS - Imposto Sobre Serviços</SelectItem>
                  <SelectItem value="inss">INSS - Contribuição Previdenciária</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Valor da Retenção</Label>
              <Input id="amount" placeholder="R$ 0,00" type="text" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data de Competência</Label>
              <div className="flex">
                <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" placeholder="Descrição do serviço ou retenção" />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="send-email" defaultChecked />
              <label
                htmlFor="send-email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enviar comprovante por e-mail ao fornecedor
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateReceipt}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Criar Comprovante
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RetentionReceiptsPanel;
