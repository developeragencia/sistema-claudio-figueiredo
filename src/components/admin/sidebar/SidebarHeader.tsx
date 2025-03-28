
import React from 'react';
import { cn } from '@/lib/utils';
import { PanelTop, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarHeaderProps {
  sidebarOpen: boolean;
  user: any;
}

const SidebarHeader = ({ sidebarOpen, user }: SidebarHeaderProps) => {
  return (
    <div className="p-4">
      {!sidebarOpen ? (
        <motion.div 
          className="flex justify-center mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm">
            <PanelTop className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="mb-2 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm">
            <PanelTop className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-medium text-foreground">PAINEL ADMINISTRATIVO</h2>
        </motion.div>
      )}
      
      <div className={cn(
        "mb-6 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3 border border-primary/10 shadow-sm transition-all duration-300",
        !sidebarOpen ? "p-2" : ""
      )}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.email?.split('@')[0] || 'admin'}
              </p>
              <div className="flex items-center mt-0.5">
                <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_4px_0_rgba(74,222,128,0.5)] animate-pulse"></span>
                <p className="text-xs text-muted-foreground ml-1.5">Online</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
