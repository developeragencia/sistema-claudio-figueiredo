
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

import { getMenuSections } from './sidebar/SidebarMenuData';
import MobileSidebarSection from './sidebar/MobileSidebarSection';
import MobileUserProfile from './sidebar/MobileUserProfile';
import MobileSearchInput from './sidebar/MobileSearchInput';
import MobileSidebarFooter from './sidebar/MobileSidebarFooter';

interface AdminMobileSidebarProps {
  activeTab: string;
  expandedSection: string | null;
  user: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  toggleMobileMenu: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
  handleLogout: () => void;
}

const AdminMobileSidebar = ({
  activeTab,
  expandedSection,
  user,
  searchQuery,
  setSearchQuery,
  toggleSection,
  setActiveTab,
  toggleMobileMenu,
  toggleDarkMode,
  darkMode,
  handleLogout
}: AdminMobileSidebarProps) => {
  const menuSections = getMenuSections();

  return (
    <motion.div 
      className="fixed left-0 top-0 h-full w-3/4 max-w-xs bg-card border-r border-border/40 shadow-lg overflow-auto p-4"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <AnimatedLogo size="sm" showText={false} />
            </div>
            <div>
              <h2 className="text-base font-semibold">PAINEL ADMINISTRATIVO</h2>
              <p className="text-[10px] text-muted-foreground">Sistemas Claudio Figueiredo</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* User Profile */}
        <MobileUserProfile user={user} />
        
        {/* Search Input */}
        <MobileSearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Menu Sections */}
        <nav className="flex-1 overflow-y-auto">
          {menuSections.map((section) => (
            <MobileSidebarSection
              key={section.id}
              section={section}
              expandedSection={expandedSection}
              activeTab={activeTab}
              toggleSection={toggleSection}
              setActiveTab={setActiveTab}
              toggleMobileMenu={toggleMobileMenu}
            />
          ))}
        </nav>
        
        {/* Footer */}
        <MobileSidebarFooter handleLogout={handleLogout} />
      </div>
    </motion.div>
  );
};

export default AdminMobileSidebar;
