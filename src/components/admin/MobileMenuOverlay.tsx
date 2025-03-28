
import React from 'react';
import AdminMobileSidebar from './AdminMobileSidebar';

interface MobileMenuOverlayProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  activeTab: string;
  expandedSection: string | null;
  user: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
  handleLogout: () => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  activeTab,
  expandedSection,
  user,
  searchQuery,
  setSearchQuery,
  toggleSection,
  setActiveTab,
  toggleDarkMode,
  darkMode,
  handleLogout
}) => {
  if (!mobileMenuOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
      onClick={(e) => e.target === e.currentTarget && toggleMobileMenu()}
    >
      <div 
        className="h-full w-3/4 max-w-sm bg-background border-r shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <AdminMobileSidebar 
          activeTab={activeTab}
          expandedSection={expandedSection}
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleSection={toggleSection}
          setActiveTab={setActiveTab}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          handleLogout={handleLogout}
          toggleMobileMenu={toggleMobileMenu}
        />
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
