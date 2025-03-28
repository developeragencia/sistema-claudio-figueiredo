
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Calculator } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  supplierCnpj: z.string().min(14, { message: 'CNPJ inválido' }),
  serviceType: z.string().min(1, { message: 'Selecione o tipo de serviço' }),
  invoiceValue: z.string().min(1, { message: 'Informe o valor da nota fiscal' }),
  invoiceDate: z.date(),
  competenceMonth: z.string().min(1, { message: 'Selecione o mês de competência' }),
  competenceYear: z.string().min(4, { message: 'Selecione o ano de competência' }),
});

type FormValues = z.infer<typeof formSchema>;

const TaxCalculationForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierCnpj: '',
      serviceType: '',
      invoiceValue: '',
      invoiceDate: new Date(),
      competenceMonth: new Date().getMonth().toString(),
      competenceYear: new Date().getFullYear().toString(),
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    
    // Simulate calculation
    setTimeout(() => {
      toast({
        title: "Cálculo realizado com sucesso",
        description: `IRRF calculado para o fornecedor ${data.supplierCnpj}`,
      });
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="supplierCnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ do Fornecedor</FormLabel>
                <FormControl>
                  <Input placeholder="00.000.000/0000-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Serviço</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="consultoria">Consultoria</SelectItem>
                    <SelectItem value="servicos_ti">Serviços de TI</SelectItem>
                    <SelectItem value="servicos_gerais">Serviços Gerais</SelectItem>
                    <SelectItem value="construcao">Construção Civil</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="invoiceValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Nota Fiscal (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0,00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data da Nota Fiscal</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="competenceMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês de Competência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Janeiro</SelectItem>
                    <SelectItem value="1">Fevereiro</SelectItem>
                    <SelectItem value="2">Março</SelectItem>
                    <SelectItem value="3">Abril</SelectItem>
                    <SelectItem value="4">Maio</SelectItem>
                    <SelectItem value="5">Junho</SelectItem>
                    <SelectItem value="6">Julho</SelectItem>
                    <SelectItem value="7">Agosto</SelectItem>
                    <SelectItem value="8">Setembro</SelectItem>
                    <SelectItem value="9">Outubro</SelectItem>
                    <SelectItem value="10">Novembro</SelectItem>
                    <SelectItem value="11">Dezembro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="competenceYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de Competência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto">
          <Calculator className="mr-2 h-4 w-4" />
          Calcular IRRF
        </Button>
      </form>
    </Form>
  );
};

export default TaxCalculationForm;
