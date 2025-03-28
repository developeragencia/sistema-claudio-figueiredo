
import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  LayoutGrid, 
  Settings,
  CreditCard,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminMobileNav: React.FC<AdminMobileNavProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'clients', icon: Users, label: 'Clientes' },
    { id: 'tax_credits', icon: CreditCard, label: 'Créditos' },
    { id: 'tax_calculator', icon: Calculator, label: 'Calculadora' },
    { id: 'settings', icon: Settings, label: 'Configurações' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-40">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 w-full transition-colors",
              activeTab === item.id 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-4 w-4 mb-1" />
            <span className="text-[10px] md:text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AdminMobileNav;
