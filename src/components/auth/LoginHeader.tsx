
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="mx-auto w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
        <Shield className="h-7 sm:h-8 w-7 sm:w-8 text-primary" />
      </div>
      <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-1">
        Acesso Administrativo
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground max-w-xs mx-auto">
        Entre com suas credenciais para acessar o painel
      </CardDescription>
    </motion.div>
  );
};

export default LoginHeader;
