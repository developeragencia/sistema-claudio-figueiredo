
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';

interface MobileSidebarFooterProps {
  handleLogout: () => void;
}

const MobileSidebarFooter = ({ handleLogout }: MobileSidebarFooterProps) => {
  return (
    <div className="mt-auto pt-4 border-t border-border/40">
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="h-auto py-2 text-xs justify-start"
          onClick={() => window.open('/', '_blank')}
        >
          <Home className="mr-1.5 h-3.5 w-3.5" />
          Site
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="h-auto py-2 text-xs justify-start text-destructive hover:text-destructive" 
          onClick={handleLogout}
        >
          <LogOut className="mr-1.5 h-3.5 w-3.5" />
          Sair
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground text-center mt-3">
        v1.0.0 &copy; 2023 Sistemas Claudio Figueiredo
      </div>
    </div>
  );
};

export default MobileSidebarFooter;
