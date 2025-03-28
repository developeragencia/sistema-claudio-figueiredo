
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface AnalysisProgressCardProps {
  analysisProgress: number;
  onCancel: () => void;
}

const AnalysisProgressCard: React.FC<AnalysisProgressCardProps> = ({
  analysisProgress,
  onCancel
}) => {
  const isComplete = analysisProgress >= 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 transition-colors duration-500">
          <CardTitle>Análise em Andamento</CardTitle>
          <CardDescription>
            {analysisProgress < 100 
              ? "Analisando pagamentos e identificando possíveis créditos tributários..." 
              : "Análise concluída. Revisando os resultados..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <motion.span
                key={analysisProgress}
                initial={{ scale: 1.2, color: "#0066ff" }}
                animate={{ scale: 1, color: "#000000" }}
                transition={{ duration: 0.3 }}
              >
                {analysisProgress}%
              </motion.span>
            </div>
            <Progress value={analysisProgress} className="h-2 overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-75"
                style={{ width: '100%', height: '100%' }}
                animate={{ 
                  x: ['-100%', '100%'], 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: 'linear',
                }}
              />
            </Progress>
            
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pagamentos analisados</span>
                <motion.span
                  key={Math.floor((analysisProgress / 100) * 843)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.floor((analysisProgress / 100) * 843)} / 843
                </motion.span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fornecedores processados</span>
                <motion.span
                  key={Math.floor((analysisProgress / 100) * 142)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.floor((analysisProgress / 100) * 142)} / 142
                </motion.span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Possíveis créditos identificados</span>
                <motion.span
                  key={Math.floor((analysisProgress / 100) * 5)}
                  initial={{ scale: 1.2, color: "#0066ff" }}
                  animate={{ scale: 1, color: "#000000" }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.floor((analysisProgress / 100) * 5)}
                </motion.span>
              </div>
            </div>
          </div>
        </CardContent>
        {analysisProgress < 100 && (
          <CardFooter>
            <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="w-full transition-colors duration-300 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30" 
                onClick={onCancel}
              >
                Cancelar Análise
              </Button>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default AnalysisProgressCard;
