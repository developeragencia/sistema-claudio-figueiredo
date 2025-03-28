
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isVisible,
  onClose,
  onClearFilters
}) => {
  return (
    <Sheet open={isVisible} onOpenChange={onClose}>
      <SheetContent className="w-[350px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Filtros de Relatórios</SheetTitle>
          <SheetDescription>
            Aplique filtros para refinar a lista de relatórios
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="period-filter">Período</Label>
              <Select defaultValue="last-month">
                <SelectTrigger id="period-filter">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Mês Atual</SelectItem>
                  <SelectItem value="last-month">Mês Anterior</SelectItem>
                  <SelectItem value="current-quarter">Trimestre Atual</SelectItem>
                  <SelectItem value="last-quarter">Trimestre Anterior</SelectItem>
                  <SelectItem value="current-year">Ano Atual</SelectItem>
                  <SelectItem value="custom">Período Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-type-filter">Tipo de Relatório</Label>
              <Select defaultValue="all">
                <SelectTrigger id="report-type-filter">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="complete">Completo</SelectItem>
                  <SelectItem value="summary">Resumido</SelectItem>
                  <SelectItem value="analysis">Análise</SelectItem>
                  <SelectItem value="discrepancies">Divergências</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="advanced-filters">Filtros Avançados</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="with-attachments" />
                  <label
                    htmlFor="with-attachments"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Apenas com anexos
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="only-pdfs" />
                  <label
                    htmlFor="only-pdfs"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Apenas PDFs
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="exclude-archived" defaultChecked />
                  <label
                    htmlFor="exclude-archived"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Excluir arquivados
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <SheetFooter>
          <Button variant="outline" onClick={onClearFilters}>Limpar Filtros</Button>
          <Button onClick={onClose}>Aplicar Filtros</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
