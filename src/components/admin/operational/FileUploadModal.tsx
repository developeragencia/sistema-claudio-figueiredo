
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileType, Database, FileText, FileImage } from "lucide-react";

interface FileUploadModalProps {
  format: string;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const FileUploadModal = ({ format, onClose, onUpload }: FileUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptedFileTypes = () => {
    switch (format) {
      case 'XML':
        return '.xml,application/xml,text/xml';
      case 'CSV':
        return '.csv,text/csv';
      case 'JSON':
        return '.json,application/json';
      case 'PDF':
        return '.pdf,application/pdf';
      case 'Word':
        return '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return '';
    }
  };

  const getFormatIcon = () => {
    switch (format) {
      case 'XML':
      case 'CSV':
        return <FileType className="h-12 w-12 text-primary" />;
      case 'JSON':
        return <Database className="h-12 w-12 text-primary" />;
      case 'PDF':
      case 'Word':
        return <FileText className="h-12 w-12 text-primary" />;
      default:
        return <FileImage className="h-12 w-12 text-primary" />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Arquivo {format}</DialogTitle>
          <DialogDescription>
            Selecione ou arraste um arquivo {format} para importar dados operacionais.
          </DialogDescription>
        </DialogHeader>
        
        <div 
          className={`flex flex-col items-center justify-center p-6 mt-2 border-2 border-dashed rounded-lg 
            ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'} 
            ${file ? 'bg-gray-50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileSelector}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={getAcceptedFileTypes()}
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="text-center">
              {getFormatIcon()}
              <p className="mt-2 text-sm font-semibold">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div className="text-center cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm font-medium">
                Arraste e solte o arquivo aqui ou clique para selecionar
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {format === 'Outros' ? 'Suporta diversos formatos de arquivo' : `Somente arquivos ${format}`}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!file}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Importar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
