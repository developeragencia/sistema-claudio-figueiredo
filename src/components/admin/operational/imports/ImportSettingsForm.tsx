
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ImportSettingsForm = () => {
  const [directory, setDirectory] = React.useState("/imports/operational");
  const [defaultFormat, setDefaultFormat] = React.useState("XML");
  const [validation, setValidation] = React.useState("Ativada");
  const [schedule, setSchedule] = React.useState("Manual");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de importação foram salvas com sucesso.",
      variant: "success"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Importação</CardTitle>
        <CardDescription>
          Personalize o processo de importação de dados operacionais.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Diretório Padrão</label>
            <Input 
              placeholder="/imports/operational" 
              value={directory}
              onChange={(e) => setDirectory(e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Formato Padrão</label>
            <Input 
              placeholder="XML" 
              value={defaultFormat}
              onChange={(e) => setDefaultFormat(e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Validação Automática</label>
            <Select value={validation} onValueChange={setValidation}>
              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativada">Ativada</SelectItem>
                <SelectItem value="Desativada">Desativada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Agendamento</label>
            <Select value={schedule} onValueChange={setSchedule}>
              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Diário">Diário</SelectItem>
                <SelectItem value="Semanal">Semanal</SelectItem>
                <SelectItem value="Mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="w-full md:w-auto flex items-center gap-2 relative overflow-hidden group" 
            onClick={handleSaveSettings}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeatDelay: 5, repeat: Infinity }}
            >
              <Save className="h-4 w-4" />
            </motion.span>
            Salvar Configurações
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ImportSettingsForm;
