import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClients } from '@/hooks/useClients';
import type { Proposal, CreateProposalData, UpdateProposalData } from '@/types/proposal';

const proposalFormSchema = z.object({
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres'),
  clientId: z.string().min(1, 'Selecione um cliente'),
  totalValue: z.number().min(0, 'O valor deve ser maior que zero'),
  validUntil: z.date(),
  details: z.object({
    estimatedValue: z.number().min(0, 'O valor estimado deve ser maior que zero'),
    description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    periodStart: z.string().optional(),
    periodEnd: z.string().optional(),
    additionalNotes: z.string().optional(),
    serviceDescription: z.string().min(10, 'A descrição do serviço deve ter no mínimo 10 caracteres')
  })
});

type ProposalFormData = z.infer<typeof proposalFormSchema>;

interface ProposalFormProps {
  proposal?: Proposal;
  onSubmit: (data: CreateProposalData | UpdateProposalData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ProposalForm({ proposal, onSubmit, onCancel, isSubmitting }: ProposalFormProps) {
  const { data: clientsData } = useClients({});

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: proposal ? {
      title: proposal.title,
      description: proposal.description,
      clientId: proposal.client.id,
      totalValue: proposal.totalValue,
      validUntil: new Date(proposal.validUntil),
      details: {
        estimatedValue: proposal.details.estimatedValue,
        description: proposal.details.description,
        periodStart: proposal.details.periodStart,
        periodEnd: proposal.details.periodEnd,
        additionalNotes: proposal.details.additionalNotes,
        serviceDescription: proposal.details.serviceDescription || ''
      }
    } : {
      title: '',
      description: '',
      clientId: '',
      totalValue: 0,
      validUntil: new Date(),
      details: {
        estimatedValue: 0,
        description: '',
        periodStart: '',
        periodEnd: '',
        additionalNotes: '',
        serviceDescription: ''
      }
    }
  });

  const handleSubmit = async (data: ProposalFormData) => {
    try {
      const client = clientsData?.items.find(c => c.id === data.clientId);
      if (!client) {
        toast.error('Cliente não encontrado');
        return;
      }

      const formattedData = {
        ...data,
        client: {
          id: client.id,
          name: client.name,
          cnpj: client.cnpj
        }
      };

      await onSubmit(proposal ? { id: proposal.id, ...formattedData } : formattedData);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast.error('Erro ao salvar proposta');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientsData?.items.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Total</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Válido até</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                      disabled={(date) => date < new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="details.serviceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Serviço</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.estimatedValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Estimado</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.periodStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.periodEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Término</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações Adicionais</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : proposal ? 'Atualizar' : 'Criar'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 