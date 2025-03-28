
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, Home, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarFooterProps {
  sidebarOpen: boolean;
  handleLogout: () => void;
}

const SidebarFooter = ({ sidebarOpen, handleLogout }: SidebarFooterProps) => {
  return (
    <div className="px-3 mt-auto">
      <div className={cn(
        "rounded-lg overflow-hidden border border-primary/10 shadow-sm bg-gradient-to-br from-primary/5 to-transparent",
        !sidebarOpen && "p-2 flex justify-center"
      )}>
        {sidebarOpen ? (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Acesso Rápido</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="h-auto py-1.5 text-xs justify-start bg-card hover:bg-card/80 border-border/50 transition-all duration-200"
                onClick={() => window.open('/', '_blank')}
              >
                <Home className="mr-1 h-3.5 w-3.5" />
                Site
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-auto py-1.5 text-xs justify-start bg-card hover:bg-card/80 text-destructive hover:text-destructive border-border/50 transition-all duration-200" 
                onClick={handleLogout}
              >
                <LogOut className="mr-1 h-3.5 w-3.5" />
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 p-2 hover:bg-primary/5"
              onClick={() => window.open('/', '_blank')}
            >
              <Home className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
      
      {sidebarOpen && (
        <motion.div 
          className="text-xs text-muted-foreground text-center mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          v1.0.0 &copy; 2023 Sistemas Claudio
        </motion.div>
      )}
    </div>
  );
};

export default SidebarFooter;
