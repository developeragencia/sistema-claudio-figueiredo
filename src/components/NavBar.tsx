import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import AnimatedLogo from './AnimatedLogo';
import { Menu, X, Home, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isSistemasPage = pathname === '/sistemas';
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoHover = () => {
    if (isSistemasPage) {
      setIsHovering(true);
      setTimeout(() => setIsHovering(false), 3000);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => document.dispatchEvent(new CustomEvent('toggle-sidebar'))}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.email}</span>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

interface NavButtonProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === to || 
    (to === '/admin' && pathname.startsWith('/admin'));

  return (
    <Link href={to} passHref legacyBehavior>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Button 
          variant={isActive ? "default" : "outline"}
          size="sm"
          className={cn(
            "relative overflow-hidden group",
            isActive ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
          )}
        >
          {/* Shimmer effect on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <span className="flex items-center gap-1.5">
            <motion.span
              initial={{ rotate: 0 }}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.span>
            {label}
          </span>
        </Button>
      </motion.div>
    </Link>
  );
};

interface MobileNavButtonProps extends NavButtonProps {
  onClick: () => void;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({ to, label, icon, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === to || 
    (to === '/admin' && pathname.startsWith('/admin'));

  return (
    <Link href={to} onClick={onClick} className="block w-full">
      <Button 
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start px-3 py-2 transition-all",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
        )}
      >
        <span className="mr-2">{icon}</span>
        {label}
      </Button>
    </Link>
  );
};

export default NavBar;
