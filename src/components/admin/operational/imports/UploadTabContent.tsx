
import React, { useState } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderUp, Calendar, ArrowDownCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

const UploadTabContent = () => {
  const { toast } = useToast();
  const [clientSelected, setClientSelected] = useState("");
  const [importType, setImportType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock clients data
  const clients = [
    { id: 'client1', name: 'ABC Comércio Ltda' },
    { id: 'client2', name: 'XYZ Indústria S/A' },
    { id: 'client3', name: 'Delta Serviços' },
    { id: 'client4', name: 'Gama Consultoria' },
  ];
  
  // Mock import formats
  const importFormats = [
    { id: 'xml', name: 'XML' },
    { id: 'csv', name: 'CSV' },
    { id: 'json', name: 'JSON' },
    { id: 'pdf', name: 'PDF' },
    { id: 'doc', name: 'Documentos Word' },
  ];
  
  const handleUpload = () => {
    if (!clientSelected || !importType) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione um cliente e um tipo de importação",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload concluído",
        description: "Os arquivos foram enviados com sucesso",
        variant: "success"
      });
    }, 2000);
  };

  return (
    <TabsContent value="upload" className="space-y-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Upload de Arquivos</CardTitle>
            <CardDescription>
              Selecione um cliente e faça o upload dos arquivos para importação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={clientSelected} onValueChange={setClientSelected}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="import-type">Tipo de Importação</Label>
              <Select value={importType} onValueChange={setImportType}>
                <SelectTrigger id="import-type">
                  <SelectValue placeholder="Selecione o tipo de importação" />
                </SelectTrigger>
                <SelectContent>
                  {importFormats.map(format => (
                    <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="period">Período</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="period-start" type="text" placeholder="Data Inicial" className="pl-9" />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="period-end" type="text" placeholder="Data Final" className="pl-9" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">Arquivos</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <FolderUp className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Clique para escolher ou arraste seus arquivos aqui</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Suporta arquivos até 50MB
                    </p>
                  </div>
                  <Input id="file-upload" type="file" multiple className="hidden" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <ArrowDownCircle className="mr-2 h-4 w-4" />
                    Iniciar Upload
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

export default UploadTabContent;
