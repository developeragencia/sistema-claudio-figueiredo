
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { HistoryItem } from '@/types/declarations';
import { motion } from 'framer-motion';

interface CreditHistoryTabProps {
  history: HistoryItem[];
  formatDateTime: (dateString: string) => string;
}

const CreditHistoryTab: React.FC<CreditHistoryTabProps> = ({ history, formatDateTime }) => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Histórico</CardTitle>
        <CardDescription>Atividades relacionadas a este crédito tributário</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Nenhum registro de atividade disponível</p>
          </div>
        ) : (
          <motion.div 
            className="relative pl-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="absolute top-0 bottom-0 left-2 border-l-2 border-dashed border-muted/70"></div>
            
            {history.map((event) => (
              <motion.div 
                key={event.id} 
                className="relative"
                variants={itemVariants}
              >
                <div className={`absolute -left-6 top-0 w-4 h-4 rounded-full bg-card shadow-sm
                  ${event.status === 'APPROVED' ? 'border-2 border-green-500' : 
                    event.status === 'REJECTED' ? 'border-2 border-destructive' : 
                    'border-2 border-primary'}`}>
                </div>
                <div className="bg-card/50 p-3 rounded-lg border border-border/30 hover:border-border/60 transition-colors shadow-sm">
                  <p className="font-medium">{event.action}</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDateTime(event.date)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.user}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditHistoryTab;
