
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, FileDown, FileUp, Settings } from 'lucide-react';

interface ClientHeaderProps {
  onCreateClient: () => void;
  onExportData: () => void;
  onImportData: () => void;
  onOpenConfig?: () => void; // Added this optional prop
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
  onCreateClient,
  onExportData,
  onImportData,
  onOpenConfig,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Gestão de Clientes</CardTitle>
          <CardDescription>
            Cadastro e gerenciamento de clientes para recuperação de créditos
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={onCreateClient} type="button">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={onExportData}>
              <FileDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onImportData}>
              <FileUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onOpenConfig}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar por nome, CNPJ, contato..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default ClientHeader;
