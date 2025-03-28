
import React from 'react';
import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMenuSections } from './sidebar/SidebarMenuData';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarSection from './sidebar/SidebarSection';
import SidebarFooter from './sidebar/SidebarFooter';

interface AdminSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  expandedSection: string | null;
  user: any;
  toggleSidebar: () => void;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar = ({
  activeTab,
  sidebarOpen,
  expandedSection,
  user,
  toggleSidebar,
  toggleSection,
  setActiveTab,
  handleLogout
}: AdminSidebarProps) => {
  const menuSections = getMenuSections();

  return (
    <motion.aside 
      className={cn(
        "bg-sidebar transition-all duration-300 ease-in-out border-r border-sidebar-border overflow-hidden hidden md:block relative",
        sidebarOpen ? "w-64" : "w-[70px]"
      )}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-sidebar-primary/10 to-transparent pointer-events-none z-0" />
      
      <div className="flex flex-col h-full pb-4 relative z-10">
        <SidebarHeader sidebarOpen={sidebarOpen} user={user} />
        
        <nav className="px-3 flex-1 overflow-y-auto scrollbar-none">
          {menuSections.map((section) => (
            <SidebarSection
              key={section.id}
              section={section}
              activeTab={activeTab}
              expandedSection={expandedSection}
              sidebarOpen={sidebarOpen}
              toggleSection={toggleSection}
              setActiveTab={setActiveTab}
            />
          ))}
        </nav>
        
        <SidebarFooter sidebarOpen={sidebarOpen} handleLogout={handleLogout} />
      </div>
      
      {/* Toggle button with enhanced styling */}
      <motion.button
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-20 bg-background border border-sidebar-border rounded-full p-1.5 shadow-md transition-all hover:bg-sidebar-primary/20 group",
          sidebarOpen ? "rotate-0" : "rotate-180"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-3.5 w-3.5 text-sidebar-primary group-hover:text-primary" />
        ) : (
          <PanelLeftOpen className="h-3.5 w-3.5 text-sidebar-primary group-hover:text-primary" />
        )}
      </motion.button>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sidebar-primary/10 to-transparent pointer-events-none z-0" />
    </motion.aside>
  );
};

export default AdminSidebar;
