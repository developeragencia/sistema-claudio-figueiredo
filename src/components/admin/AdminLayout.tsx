import React, { Suspense } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminUI } from '@/hooks/useAdminUI';
import { usePathname } from 'next/navigation';

// Admin components
import AdminSidebar from './AdminSidebar';
import AdminMobileNav from './AdminMobileNav';
import AdminHeader from './AdminHeader';
import MainContent from './MainContent';
import MobileMenuOverlay from './MobileMenuOverlay';
import AdminLoading from './AdminLoading';

// Componentes com Suspense
const SuspenseMainContent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<AdminLoading />}>
    {children}
  </Suspense>
);

const SuspenseSidebar = (props: any) => (
  <Suspense fallback={<div className="w-64 bg-sidebar" />}>
    <AdminSidebar {...props} />
  </Suspense>
);

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

const AdminLayout = ({ children, activeTab }: AdminLayoutProps) => {
  const { user, handleLogout } = useAdminAuth();
  const pathname = usePathname();
  const {
    sidebarOpen,
    darkMode,
    hasNotifications,
    searchQuery,
    setSearchQuery,
    expandedSection,
    mobileMenuOpen,
    toggleSidebar,
    toggleDarkMode,
    toggleSection,
    toggleMobileMenu,
    setActiveTab
  } = useAdminUI();

  // Atualiza a aba ativa quando o pathname mudar
  React.useEffect(() => {
    const tab = pathname.split('/').pop() || 'dashboard';
    setActiveTab(tab);
  }, [pathname, setActiveTab]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <AdminHeader 
        toggleSidebar={toggleSidebar}
        toggleMobileMenu={toggleMobileMenu}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
        hasNotifications={hasNotifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        setActiveTab={setActiveTab}
      />
      
      <MobileMenuOverlay 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
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
      />
      
      <AdminMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-1 overflow-hidden">
        <SuspenseSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          expandedSection={expandedSection}
          user={user}
          toggleSidebar={toggleSidebar}
          toggleSection={toggleSection}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto">
          <SuspenseMainContent>
            {children}
          </SuspenseMainContent>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
