import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SidebarSection as SidebarSectionType } from '@/types/admin-sidebar';
import { useRouter } from 'next/navigation'

interface SidebarSectionProps {
  section: SidebarSectionType;
  activeTab: string;
  expandedSection: string | null;
  sidebarOpen: boolean;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
}

const SidebarSection = ({
  section,
  activeTab,
  expandedSection,
  sidebarOpen,
  toggleSection,
  setActiveTab
}: SidebarSectionProps) => {
  const router = useRouter();
  const isExpanded = expandedSection === section.id;
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    // Navigate to the appropriate route
    if (tabId === 'profile') {
      router.push('/secure/profile');
    } else if (tabId === 'notifications') {
      router.push('/secure/notifications');
    } else if (tabId === 'clients') {
      router.push('/secure/clients');
    } else if (tabId === 'dashboard') {
      router.push('/secure/dashboard');
    } else {
      router.push(`/secure/${tabId}`);
    }
  };

  // Animation variants for menu items
  const menuItemVariants = {
    closed: { opacity: 0, y: -10, height: 0 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };
  
  return (
    <div className="my-2">
      {/* Section header with enhanced styling and animation */}
      {sidebarOpen && (
        <motion.button
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-sidebar-foreground bg-sidebar-accent/50 hover:bg-sidebar-primary/20 rounded-md transition-all duration-200"
          onClick={() => toggleSection(section.id)}
          whileHover={{ 
            backgroundColor: 'hsla(var(--sidebar-primary)/0.15)',
            scale: 1.02
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="tracking-wide uppercase">{section.title}</span>
          <motion.div
            initial={{ rotate: isExpanded ? 0 : -90 }}
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-sidebar-primary" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-sidebar-primary" />
            )}
          </motion.div>
        </motion.button>
      )}
      
      {/* Section items with enhanced animations and transitions */}
      <motion.div 
        className={cn(
          "space-y-1 mt-1",
          sidebarOpen && !isExpanded ? "hidden" : "block",
          !sidebarOpen ? "px-2" : ""
        )}
        initial="closed"
        animate={sidebarOpen && isExpanded || !sidebarOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            height: 'auto',
            transition: { staggerChildren: 0.07, delayChildren: 0.1 }
          },
          closed: {
            opacity: 0,
            height: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
          }
        }}
      >
        {section.items.map((item, index) => (
          <motion.button
            key={item.id}
            custom={index}
            variants={menuItemVariants}
            className={cn(
              "flex items-center w-full rounded-md px-3 py-2 text-sm shadow-sm",
              activeTab === item.id 
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                : "bg-sidebar-accent/30 text-sidebar-foreground hover:bg-sidebar-primary/20 hover:text-sidebar-foreground",
              !sidebarOpen && "justify-center p-2"
            )}
            onClick={() => handleTabClick(item.id)}
            whileHover={{ scale: 1.03, x: sidebarOpen ? 4 : 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className={cn(
                "mr-2 text-current", 
                !sidebarOpen && "mr-0",
                activeTab === item.id ? "text-sidebar-primary-foreground" : "text-sidebar-primary"
              )}
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.span>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
            
            {/* Active indicator animation */}
            {activeTab === item.id && sidebarOpen && (
              <motion.div 
                className="ml-auto h-1.5 w-1.5 rounded-full bg-white"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SidebarSection;
