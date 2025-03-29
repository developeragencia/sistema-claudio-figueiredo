import React from 'react';
import { Link, useLocation  } from "@/hooks/use-router";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  FileText,
  FileBarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SidebarLink {
  title: string;
  icon: React.ElementType;
  href: string;
  roles?: string[];
}

const links: SidebarLink[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard'
  },
  {
    title: 'Clientes',
    icon: Users,
    href: '/clients'
  },
  {
    title: 'Propostas',
    icon: FileText,
    href: '/proposals'
  },
  {
    title: 'Contratos',
    icon: FileBarChart2,
    href: '/contracts'
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/settings'
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const filteredLinks = links.filter(link => {
    if (!link.roles) return true;
    return link.roles.includes(user?.role || '');
  });

  return (
    <div
      className={cn(
        'relative flex flex-col border-r bg-background',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-20 rounded-full border bg-background"
        onClick={toggleSidebar}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center space-x-2">
          {!collapsed && <span className="font-bold">SecureBridge</span>}
        </Link>
      </div>

      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent' : 'transparent',
                  collapsed && 'justify-center'
                )}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{link.title}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
} 