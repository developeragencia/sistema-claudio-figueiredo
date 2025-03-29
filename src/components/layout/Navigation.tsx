import React from 'react';
import { Link, useLocation  } from "@/hooks/use-router";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';
import ActiveClientSelector from '@/components/clients/ActiveClientSelector';
import { cn } from '@/lib/utils';
import { hasAnyPermission } from '@/lib/permissions';
import { BarChart3, Building2, FileText } from 'lucide-react';
import { Logo } from "@/components/Logo";

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Logo className="w-40 h-40" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user?.role !== 'CLIENT' && (
            <ActiveClientSelector />
          )}
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navigation; 