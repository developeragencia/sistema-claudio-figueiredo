
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImportsHeaderProps {
  onUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImportsHeader = ({ onUploadClick, fileInputRef, onFileChange }: ImportsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Importação de Dados Operacionais</h2>
        <p className="text-muted-foreground">
          Importe dados de sistemas externos para processamento operacional.
        </p>
      </div>
      <Button className="flex items-center gap-2" onClick={onUploadClick}>
        <Upload className="h-4 w-4" />
        Importar Arquivo
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          onChange={onFileChange}
        />
      </Button>
    </div>
  );
};

export default ImportsHeader;
