
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SidebarSection as SidebarSectionType } from '@/types/admin-sidebar';

interface MobileSidebarSectionProps {
  section: SidebarSectionType;
  expandedSection: string | null;
  activeTab: string;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  toggleMobileMenu: () => void;
}

const MobileSidebarSection: React.FC<MobileSidebarSectionProps> = ({
  section,
  expandedSection,
  activeTab,
  toggleSection,
  setActiveTab,
  toggleMobileMenu
}) => {
  const isExpanded = expandedSection === section.id;
  
  const handleItemClick = (itemId: string) => {
    setActiveTab(itemId);
    toggleMobileMenu(); // Close mobile menu when item is selected
  };
  
  return (
    <div className="mb-3">
      <button
        className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-medium rounded-md hover:bg-muted/80 transition-colors"
        onClick={() => toggleSection(section.id)}
      >
        <span>{section.title}</span>
        <span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      </button>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="pl-2 mt-1 space-y-1"
        >
          {section.items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "flex items-center w-full rounded-md px-2 py-1.5 text-sm",
                activeTab === item.id 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted"
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 text-current">{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileSidebarSection;
