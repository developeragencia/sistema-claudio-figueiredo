
import React, { useEffect, useCallback, memo } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminUI } from '@/hooks/useAdminUI';
import { useLocation, useParams, useNavigate  } from "@/hooks/use-router";

// Admin components
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileNav from '@/components/admin/AdminMobileNav';
import AdminHeader from '@/components/admin/AdminHeader';
import MainContent from '@/components/admin/MainContent';
import AdminLoading from '@/components/admin/AdminLoading';
import MobileMenuOverlay from '@/components/admin/MobileMenuOverlay';

// Memoized components to prevent unnecessary re-renders
const MemoizedAdminSidebar = memo(AdminSidebar);
const MemoizedAdminHeader = memo(AdminHeader);
const MemoizedMobileMenuOverlay = memo(MobileMenuOverlay);
const MemoizedAdminMobileNav = memo(AdminMobileNav);

const Admin = () => {
  const { user, loading, handleLogout } = useAdminAuth();
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
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
    toggleMobileMenu
  } = useAdminUI();
  
  const location = useLocation();
  const params = useParams();
  
  // Parse the route path to set the active tab
  useEffect(() => {
    try {
      // Extract the tab from the current URL path
      const pathParts = location.pathname.split('/');
      
      // If we're at /admin with subtabs
      if (pathParts.length >= 3) {
        const tabFromUrl = pathParts[2];
        if (tabFromUrl && tabFromUrl !== activeTab) {
          setActiveTab(tabFromUrl);
          // Store in session storage for persistence
          sessionStorage.setItem('adminActiveTab', tabFromUrl);
        }
      } else if (pathParts.length === 2 && pathParts[1] === 'admin') {
        // We're at /admin with no subtab specified
        const storedTab = sessionStorage.getItem('adminActiveTab');
        if (storedTab && storedTab !== activeTab) {
          setActiveTab(storedTab);
        } else if (!storedTab && activeTab !== 'dashboard') {
          setActiveTab('dashboard');
          sessionStorage.setItem('adminActiveTab', 'dashboard');
        }
      }
    } catch (error) {
      console.error("Error parsing admin route:", error);
      // Fallback to dashboard
      setActiveTab('dashboard');
    }
  }, [location.pathname, setActiveTab, activeTab]);

  if (loading) {
    return <AdminLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <MemoizedAdminHeader 
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
      
      <MemoizedMobileMenuOverlay 
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
      
      <MemoizedAdminMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-1 overflow-hidden">
        <MemoizedAdminSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          expandedSection={expandedSection}
          user={user}
          toggleSidebar={toggleSidebar}
          toggleSection={toggleSection}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        
        <MainContent activeTab={activeTab} user={user} />
      </div>
    </div>
  );
};

export default Admin;
