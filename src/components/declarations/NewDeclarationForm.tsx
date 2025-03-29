
import React from 'react';
import { useNavigate  } from "@/hooks/use-router";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  type: z.string({
    required_error: "Selecione o tipo de declaração",
  }),
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres",
  }),
  period: z.string({
    required_error: "Selecione o período",
  }),
  fiscalYear: z.string().regex(/^\d{4}$/, {
    message: "Digite um ano válido (4 dígitos)",
  }),
  dueDate: z.date({
    required_error: "Selecione a data de vencimento",
  }),
  taxOffice: z.string().min(3, {
    message: "Digite o nome da unidade fiscal",
  }),
  amount: z.string().min(1, {
    message: "Digite o valor da declaração",
  }),
  notes: z.string().optional(),
});

const DECLARATION_TYPES = [
  { value: "IRPJ", label: "IRPJ - Imposto de Renda Pessoa Jurídica" },
  { value: "CSLL", label: "CSLL - Contribuição Social sobre o Lucro Líquido" },
  { value: "PIS/COFINS", label: "PIS/COFINS - Programa de Integração Social/Contribuição para Financiamento da Seguridade Social" },
  { value: "INSS", label: "INSS - Instituto Nacional do Seguro Social" },
  { value: "ISS", label: "ISS - Imposto Sobre Serviços" },
  { value: "ICMS", label: "ICMS - Imposto sobre Circulação de Mercadorias e Serviços" },
];

const PERIODS = [
  { value: "2024-M1", label: "Janeiro/2024" },
  { value: "2024-M2", label: "Fevereiro/2024" },
  { value: "2024-M3", label: "Março/2024" },
  { value: "2024-M4", label: "Abril/2024" },
  { value: "2024-M5", label: "Maio/2024" },
  { value: "2024-M6", label: "Junho/2024" },
  { value: "2024-Q1", label: "1º Trimestre/2024" },
  { value: "2024-Q2", label: "2º Trimestre/2024" },
  { value: "2023-Y", label: "Ano Fiscal 2023" },
  { value: "2024-Y", label: "Ano Fiscal 2024" },
];

const NewDeclarationForm: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      fiscalYear: new Date().getFullYear().toString(),
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // In a real app, we would send this data to the backend
    // For now, we'll just show a success message and navigate back
    toast.success("Declaração criada com sucesso!");
    
    setTimeout(() => {
      navigate('/declarations');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Nova Declaração Fiscal</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Declaração</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DECLARATION_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PERIODS.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Declaração</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Declaração IRPJ 1º Trimestre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fiscalYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano Fiscal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Vencimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="taxOffice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade da Receita Federal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: RFB - São Paulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: R$ 10.000,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais sobre esta declaração..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" type="button" onClick={() => navigate('/declarations')}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Declaração
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default NewDeclarationForm;
