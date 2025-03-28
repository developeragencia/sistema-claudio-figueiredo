import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

const auditFormSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  startDate: z.string().min(1, 'Data inicial é obrigatória'),
  endDate: z.string().min(1, 'Data final é obrigatória')
});

type AuditFormData = z.infer<typeof auditFormSchema>;

interface AuditResult {
  payment: {
    id: string;
    valor: number;
    dataEmissao: Date;
    dataPagamento: Date;
    numeroDocumento: string;
    descricao: string;
  };
  supplier: {
    cnpj: string;
    razaoSocial: string;
    atividadePrincipal: string;
    codigoCnae: string;
  };
  retencoes: {
    irrf: number;
    pis: number;
    cofins: number;
    csll: number;
    iss: number;
    total: number;
  };
}

export default function Audit() {
  const [isLoading, setIsLoading] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema)
  });

  const onSubmit = async (data: AuditFormData) => {
    try {
      setIsLoading(true);
      const response = await api.post<AuditResult[]>('/audit/payments', {
        clientId: data.clientId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      });
      setAuditResults(response.data);
      toast.success('Auditoria realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar auditoria:', error);
      toast.error('Erro ao realizar auditoria. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalRetencoes = auditResults.reduce((total, result) => total + result.retencoes.total, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auditoria de Pagamentos</CardTitle>
          <CardDescription>
            Realize a auditoria de pagamentos para calcular as retenções de impostos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
                <Label htmlFor="clientId">Cliente</Label>
                <Input
                  id="clientId"
                  {...register('clientId')}
                  placeholder="ID do Cliente"
                  disabled={isLoading}
                />
                {errors.clientId && (
                  <span className="text-sm text-red-500">{errors.clientId.message}</span>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="startDate">Data Inicial</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register('startDate')}
                  disabled={isLoading}
                />
                {errors.startDate && (
                  <span className="text-sm text-red-500">{errors.startDate.message}</span>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="endDate">Data Final</Label>
              <Input
                  id="endDate"
                type="date"
                  {...register('endDate')}
                  disabled={isLoading}
              />
                {errors.endDate && (
                  <span className="text-sm text-red-500">{errors.endDate.message}</span>
                )}
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Auditar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {auditResults.length > 0 && (
      <Card>
        <CardHeader>
            <CardTitle>Resultados da Auditoria</CardTitle>
          <CardDescription>
              Total de retenções: {formatCurrency(totalRetencoes)}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Data Pagamento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>IRRF</TableHead>
                    <TableHead>PIS</TableHead>
                    <TableHead>COFINS</TableHead>
                    <TableHead>CSLL</TableHead>
                    <TableHead>ISS</TableHead>
                    <TableHead>Total Retenções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                  {auditResults.map((result) => (
                    <TableRow key={result.payment.id}>
                      <TableCell>{result.supplier.razaoSocial}</TableCell>
                      <TableCell>{result.supplier.cnpj}</TableCell>
                      <TableCell>{result.payment.numeroDocumento}</TableCell>
                  <TableCell>
                        {format(new Date(result.payment.dataPagamento), 'dd/MM/yyyy', {
                          locale: ptBR
                        })}
                  </TableCell>
                      <TableCell>{formatCurrency(result.payment.valor)}</TableCell>
                      <TableCell>{formatCurrency(result.retencoes.irrf)}</TableCell>
                      <TableCell>{formatCurrency(result.retencoes.pis)}</TableCell>
                      <TableCell>{formatCurrency(result.retencoes.cofins)}</TableCell>
                      <TableCell>{formatCurrency(result.retencoes.csll)}</TableCell>
                      <TableCell>{formatCurrency(result.retencoes.iss)}</TableCell>
                      <TableCell>{formatCurrency(result.retencoes.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
} 