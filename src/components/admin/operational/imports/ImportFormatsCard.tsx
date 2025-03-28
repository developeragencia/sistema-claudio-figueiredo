
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileType, Database, FileText, FileImage } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImportFormatsCardProps {
  onFormatClick: (format: string) => void;
}

const ImportFormatsCard = ({ onFormatClick }: ImportFormatsCardProps) => {
  const formatButtons = [
    { format: 'XML', icon: <FileType className="h-8 w-8" />, tooltip: 'Importar arquivos XML' },
    { format: 'CSV', icon: <FileType className="h-8 w-8" />, tooltip: 'Importar planilhas CSV' },
    { format: 'JSON', icon: <Database className="h-8 w-8" />, tooltip: 'Importar dados JSON' },
    { format: 'PDF', icon: <FileText className="h-8 w-8" />, tooltip: 'Importar documentos PDF' },
    { format: 'Word', icon: <FileText className="h-8 w-8" />, tooltip: 'Importar documentos Word' },
    { format: 'Outros', icon: <FileImage className="h-8 w-8" />, tooltip: 'Importar outros formatos' },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Formatos Suportados</CardTitle>
        <CardDescription>
          Selecione o tipo de arquivo que deseja importar para o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formatButtons.map((item) => (
          <TooltipProvider key={item.format}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => onFormatClick(item.format)}
                  className="h-24 flex flex-col justify-center items-center gap-2 border border-dashed rounded-md 
                            hover:bg-primary/5 hover:border-primary transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                  >
                    {item.icon}
                  </motion.div>
                  <span>{item.format}</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </CardContent>
    </Card>
  );
};

export default ImportFormatsCard;
