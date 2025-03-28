
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getMenuSections } from './sidebar/SidebarMenuData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  handleLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  user,
  handleLogout
}: MobileMenuProps) => {
  const menuSections = getMenuSections();
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-border z-50 flex flex-col overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <p className="font-semibold">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'admin@sistemasclaudio.com'}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-2">
              {menuSections.map((section) => (
                <div key={section.id} className="mb-4">
                  <p className="px-4 text-xs font-medium text-muted-foreground mb-2">
                    {section.title}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        className={cn(
                          "flex items-center w-full px-4 py-2 text-sm",
                          activeTab === item.id 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                        )}
                        onClick={() => handleTabClick(item.id)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:bg-destructive/10" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
