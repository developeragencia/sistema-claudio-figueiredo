import React, { useState } from 'react';
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
import { ProposalStatus } from '@/types/proposal';
import { logger } from '@/lib/logger';

const proposalSchema = z.object({
  client_id: z.string().min(1, 'O cliente é obrigatório'),
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  value: z.string().min(1, 'O valor é obrigatório')
});

type ProposalFormData = z.infer<typeof proposalSchema>;

export default function Proposals() {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, createProposal } = useProposals({
    search
  });
  const { data: clientsData } = useClients({});
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema)
  });

  const onSubmit = async (formData: ProposalFormData) => {
    try {
      await createProposal({
        ...formData,
        value: parseFloat(formData.value)
      });
      toast({
        title: 'Proposta criada',
        description: 'A proposta foi criada com sucesso.',
        variant: 'default'
      });
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar a proposta.',
        variant: 'destructive'
      });
    }
  };

  const handleExport = (format: 'json' | 'csv' | 'xlsx') => {
    if (!data?.items) return;

    const exportData = data.items.map(proposal => ({
      'Título': proposal.title,
      'Cliente': clientsData?.items?.find(c => c.id === proposal.client_id)?.name || proposal.client_id,
      'Valor': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.value),
      'Status': proposal.status === 'DRAFT' ? 'Rascunho' :
                proposal.status === 'ANALYSIS' ? 'Em Análise' :
                proposal.status === 'APPROVED' ? 'Aprovada' : 'Rejeitada',
      'Data de Criação': format === 'xlsx' 
        ? new Date(proposal.created_at)
        : format(new Date(proposal.created_at), 'dd/MM/yyyy', { locale: ptBR })
    }));

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(jsonBlob, `propostas-${format(new Date(), 'dd-MM-yyyy')}.json`);
        break;

      case 'csv':
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).join(','))
        ].join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, `propostas-${format(new Date(), 'dd-MM-yyyy')}.csv`);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Propostas');
        XLSX.writeFile(wb, `propostas-${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
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
      case 'ANALYSIS':
        return 'text-yellow-500';
      case 'APPROVED':
        return 'text-green-500';
      case 'REJECTED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Rascunho';
      case 'ANALYSIS':
        return 'Em Análise';
      case 'APPROVED':
        return 'Aprovada';
      case 'REJECTED':
        return 'Rejeitada';
      default:
        return status;
    }
  };

  const handleExportCSV = () => {
    try {
      const csvContent = data?.items.map(proposal => ({
        ID: proposal.id,
        Cliente: clientsData?.items?.find(c => c.id === proposal.client_id)?.name || proposal.client_id,
        CNPJ: clientsData?.items?.find(c => c.id === proposal.client_id)?.cnpj || '',
        Valor: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.value),
        Status: ProposalStatusLabels[proposal.status],
        'Data de Criação': format(new Date(proposal.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
        'Última Atualização': format(new Date(proposal.updated_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
      }));

      const worksheet = XLSX.utils.json_to_sheet(csvContent);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Propostas');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const fileName = `propostas_${format(new Date(), 'dd-MM-yyyy')}.xlsx`;
      
      saveAs(new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);

      logger.info('Arquivo de propostas exportado com sucesso', { format: 'xlsx', rows: data?.items.length });
    } catch (error) {
      logger.error('Erro ao exportar arquivo de propostas', { error });
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Propostas</h1>
          <p className="text-muted-foreground">
            Gerencie as propostas do sistema
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Proposta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Proposta</DialogTitle>
                <DialogDescription>
                  Preencha os dados da nova proposta
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client_id">Cliente</Label>
                  <Select onValueChange={(value) => register('client_id').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientsData?.items?.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.client_id && (
                    <p className="text-sm text-red-500">{errors.client_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    error={errors.title?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    {...register('description')}
                    error={errors.description?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    {...register('value')}
                    error={errors.value?.message}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">
                    Criar Proposta
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
          <CardTitle>Lista de Propostas</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as propostas cadastradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar propostas..."
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
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Criação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data?.items && data.items.length > 0 ? (
                    data.items.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell>{proposal.title}</TableCell>
                        <TableCell>
                          {clientsData?.items?.find(c => c.id === proposal.client_id)?.name || proposal.client_id}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(proposal.value)}
                        </TableCell>
                        <TableCell>
                          <span className={getStatusColor(proposal.status)}>
                            {getStatusText(proposal.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(proposal.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Nenhuma proposta encontrada.
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