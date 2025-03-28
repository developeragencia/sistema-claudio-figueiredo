
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calculator, FileBarChart, RefreshCw, CalendarIcon, File, FileSpreadsheet } from 'lucide-react';

interface SimulationTabProps {
  creditValue: string;
  simulationDate: Date | undefined;
  includeSelicCorrection: boolean;
  reportType: string;
  isGenerating: boolean;
  isCalendarOpen: boolean;
  simulationHistory: any[];
  setIsCalendarOpen: (value: boolean) => void;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSimulationDate: (date: Date | undefined) => void;
  setIncludeSelicCorrection: (value: boolean) => void;
  setReportType: (value: string) => void;
  handleSimulateSelic: () => void;
  handleGenerate: () => void;
}

const SimulationTab: React.FC<SimulationTabProps> = ({
  creditValue,
  simulationDate,
  includeSelicCorrection,
  reportType,
  isGenerating,
  isCalendarOpen,
  simulationHistory,
  setIsCalendarOpen,
  handleValueChange,
  setSimulationDate,
  setIncludeSelicCorrection,
  setReportType,
  handleSimulateSelic,
  handleGenerate
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulação de Compensação Tributária</CardTitle>
          <CardDescription>
            Simule valores de compensação com correção monetária pela taxa SELIC
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="credit-value">Valor do Crédito (R$)</Label>
              <Input
                id="credit-value"
                placeholder="0,00"
                value={creditValue}
                onChange={handleValueChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-select">Data de Referência</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    id="date-select"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {simulationDate ? format(simulationDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={simulationDate}
                    onSelect={(date) => {
                      setSimulationDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="selic-correction"
              checked={includeSelicCorrection}
              onCheckedChange={setIncludeSelicCorrection}
            />
            <Label htmlFor="selic-correction">Incluir correção pela SELIC</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="report-type">Tipo de Relatório</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Selecione o tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per_dcomp">PER/DCOMP</SelectItem>
                <SelectItem value="judicial">Decisão Judicial</SelectItem>
                <SelectItem value="administrative">Processo Administrativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleSimulateSelic}>
              <Calculator className="mr-2 h-4 w-4" />
              Simular Correção SELIC
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Últimas Simulações</CardTitle>
          <CardDescription>
            Histórico das simulações realizadas recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-3 text-left font-medium">Data</th>
                  <th className="p-3 text-left font-medium">Valor Original</th>
                  <th className="p-3 text-left font-medium">Valor Corrigido</th>
                  <th className="p-3 text-left font-medium">Taxa SELIC</th>
                  <th className="p-3 text-left font-medium">Tipo</th>
                  <th className="p-3 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {simulationHistory.map(simulation => (
                  <tr key={simulation.id} className="border-t hover:bg-muted/50">
                    <td className="p-3">{simulation.date}</td>
                    <td className="p-3">{simulation.originalValue}</td>
                    <td className="p-3">{simulation.correctedValue}</td>
                    <td className="p-3">{simulation.selicRate}</td>
                    <td className="p-3">{simulation.type}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationTab;
