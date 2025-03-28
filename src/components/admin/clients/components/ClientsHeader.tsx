
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, Settings } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ExportOptionsMenu from '@/components/admin/tax-reports/components/ExportOptionsMenu';
import { FileUp } from 'lucide-react';

interface ClientsHeaderProps {
  isLoading: boolean;
  onCreateClient: () => void;
  onRefresh: () => void;
  onExportData: (format: string) => void;
  onImportData: () => void;
  onOpenConfig: () => void;
}

const ClientsHeader: React.FC<ClientsHeaderProps> = ({
  isLoading,
  onCreateClient,
  onRefresh,
  onExportData,
  onImportData,
  onOpenConfig
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
        <p className="text-muted-foreground">
          Gerencie os clientes da sua empresa
        </p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          variant="default" 
          className="w-full sm:w-auto"
          onClick={onCreateClient}
          type="button"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
        <ExportOptionsMenu onExport={onExportData} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" type="button">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onImportData}>
              <FileUp className="mr-2 h-4 w-4" />
              Importar Clientes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenConfig}>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          type="button"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default ClientsHeader;
