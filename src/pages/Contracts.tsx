import React, { useState } from 'react';
import { useContracts } from '@/hooks/useContracts';
import { useProposals } from '@/hooks/useProposals';
import { useClients } from '@/hooks/useClients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const contractSchema = z.object({
  proposal_id: z.string().min(1, 'A proposta é obrigatória'),
  start_date: z.string().min(1, 'A data de início é obrigatória'),
  end_date: z.string().min(1, 'A data de término é obrigatória'),
  payment_method: z.string().min(1, 'A forma de pagamento é obrigatória'),
  payment_terms: z.string().min(1, 'As condições de pagamento são obrigatórias')
});

type ContractFormData = z.infer<typeof contractSchema>;

export function Contracts() {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, createContract } = useContracts({
    search
  });
  const { data: proposalsData } = useProposals({});
  const { data: clientsData } = useClients({});
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema)
  });

  const onSubmit = async (formData: ContractFormData) => {
    try {
      await createContract(formData);
      toast({
        title: 'Contrato criado',
        description: 'O contrato foi criado com sucesso.',
        variant: 'default'
      });
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar o contrato.',
        variant: 'destructive'
      });
    }
  };

  const handleExport = (format: 'json' | 'csv' | 'xlsx') => {
    if (!data?.items) return;

    const exportData = data.items.map(contract => {
      const proposal = proposalsData?.items?.find(p => p.id === contract.proposal_id);
      const client = clientsData?.items?.find(c => c.id === proposal?.client_id);

      return {
        'Cliente': client?.name || proposal?.client_id || 'N/A',
        'Proposta': proposal?.title || contract.proposal_id,
        'Valor': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.value),
        'Status': contract.status === 'DRAFT' ? 'Rascunho' :
                 contract.status === 'ACTIVE' ? 'Ativo' :
                 contract.status === 'INACTIVE' ? 'Inativo' : 'Expirado',
        'Data de Início': format === 'xlsx' 
          ? new Date(contract.start_date)
          : format(new Date(contract.start_date), 'dd/MM/yyyy', { locale: ptBR }),
        'Data de Término': format === 'xlsx'
          ? new Date(contract.end_date)
          : format(new Date(contract.end_date), 'dd/MM/yyyy', { locale: ptBR }),
        'Forma de Pagamento': contract.payment_method,
        'Condições de Pagamento': contract.payment_terms
      };
    });

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(jsonBlob, `contratos-${format(new Date(), 'dd-MM-yyyy')}.json`);
        break;

      case 'csv':
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).join(','))
        ].join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, `contratos-${format(new Date(), 'dd-MM-yyyy')}.csv`);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Contratos');
        XLSX.writeFile(wb, `contratos-${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
        break;
    }

    toast({
      title: 'Dados exportados',
      description: `Os dados foram exportados com sucesso no formato ${format.toUpperCase()}.`,
      variant: 'default'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'text-gray-500';
      case 'ACTIVE':
        return 'text-green-500';
      case 'INACTIVE':
        return 'text-yellow-500';
      case 'EXPIRED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Rascunho';
      case 'ACTIVE':
        return 'Ativo';
      case 'INACTIVE':
        return 'Inativo';
      case 'EXPIRED':
        return 'Expirado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratos</h1>
          <p className="text-muted-foreground">
            Gerencie os contratos do sistema
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Contrato
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Contrato</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo contrato
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proposal_id">Proposta</Label>
                  <Select onValueChange={(value) => register('proposal_id').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma proposta" />
                    </SelectTrigger>
                    <SelectContent>
                      {proposalsData?.items?.filter(p => p.status === 'APPROVED').map((proposal) => (
                        <SelectItem key={proposal.id} value={proposal.id}>
                          {proposal.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.proposal_id && (
                    <p className="text-sm text-red-500">{errors.proposal_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date">Data de Início</Label>
                  <Input
                    id="start_date"
                    type="date"
                    {...register('start_date')}
                    error={errors.start_date?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">Data de Término</Label>
                  <Input
                    id="end_date"
                    type="date"
                    {...register('end_date')}
                    error={errors.end_date?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment_method">Forma de Pagamento</Label>
                  <Select onValueChange={(value) => register('payment_method').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                      <SelectItem value="bank_transfer">Transferência Bancária</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.payment_method && (
                    <p className="text-sm text-red-500">{errors.payment_method.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment_terms">Condições de Pagamento</Label>
                  <Select onValueChange={(value) => register('payment_terms').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione as condições de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="semiannual">Semestral</SelectItem>
                      <SelectItem value="annual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.payment_terms && (
                    <p className="text-sm text-red-500">{errors.payment_terms.message}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button type="submit">
                    Criar Contrato
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleExport('json')}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os contratos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contratos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Proposta</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Término</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data?.items && data.items.length > 0 ? (
                    data.items.map((contract) => {
                      const proposal = proposalsData?.items?.find(p => p.id === contract.proposal_id);
                      const client = clientsData?.items?.find(c => c.id === proposal?.client_id);

                      return (
                        <TableRow key={contract.id}>
                          <TableCell>{client?.name || 'N/A'}</TableCell>
                          <TableCell>{proposal?.title || contract.proposal_id}</TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(contract.value)}
                          </TableCell>
                          <TableCell>
                            <span className={getStatusColor(contract.status)}>
                              {getStatusText(contract.status)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {format(new Date(contract.start_date), 'dd/MM/yyyy', { locale: ptBR })}
                          </TableCell>
                          <TableCell>
                            {format(new Date(contract.end_date), 'dd/MM/yyyy', { locale: ptBR })}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum contrato encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 