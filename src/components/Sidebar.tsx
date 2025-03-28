import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
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
    title: 'Configurações',
    icon: Settings,
    href: '/settings'
  }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handler = () => setIsOpen(prev => !prev);
    document.addEventListener('toggle-sidebar', handler);
    return () => document.removeEventListener('toggle-sidebar', handler);
  }, []);

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform",
      !isOpen && "-translate-x-full"
    )}>
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold">Secure Bridge</h1>
      </div>
      
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 