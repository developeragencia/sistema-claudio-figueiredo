
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Download, FileText, Table, Image, Share2 } from 'lucide-react';

interface ExportOptionsMenuProps {
  onExport: (format: string) => void;
}

const ExportOptionsMenu: React.FC<ExportOptionsMenuProps> = ({ onExport }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          <span>Exportar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Exportar Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onExport('pdf')} className="flex items-center gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          <span>PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('excel')} className="flex items-center gap-2 cursor-pointer">
          <Table className="h-4 w-4" />
          <span>Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('image')} className="flex items-center gap-2 cursor-pointer">
          <Image className="h-4 w-4" />
          <span>Imagem (.png)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onExport('share')} className="flex items-center gap-2 cursor-pointer">
          <Share2 className="h-4 w-4" />
          <span>Compartilhar Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptionsMenu;
