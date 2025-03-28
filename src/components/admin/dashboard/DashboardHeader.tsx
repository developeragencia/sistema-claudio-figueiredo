
import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Layout className="w-6 h-6 text-primary" />
          Painel Principal
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo ao painel administrativo do sistema
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
