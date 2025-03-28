
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminMobileNav from './AdminMobileNav';
import MainContent from './MainContent';
import MobileMenu from './MobileMenu';
import { useNotificationStore } from '@/hooks/useNotificationStore';
import { useToast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  activeTab: string;
  children?: React.ReactNode;
}

const AdminLayout = ({ activeTab: initialActiveTab, children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  const [expandedSection, setExpandedSection] = useState<string | null>('main');
  const [searchQuery, setSearchQuery] = useState("");
  
  const hasUnreadNotifications = useNotificationStore(state => 
    state.notifications.some(n => !n.read)
  );
  
  // Mock user data - in a real app would come from auth
  const user = {
    id: '1',
    name: 'Admin User',
    email: 'admin@sistemasclaudio.com',
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Navigate to specific routes
    if (tab === 'profile') {
      navigate('/admin/profile');
    } else if (tab === 'notifications') {
      navigate('/admin/notifications');
    } else if (tab === 'clients') {
      navigate('/admin/clients');
    } else {
      navigate(`/admin/${tab}`);
    }
  };
  
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthRemembered');
    
    // Show toast notification
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    
    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <AdminHeader
        toggleSidebar={toggleSidebar}
        toggleMobileMenu={toggleMobileMenu}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
        hasNotifications={hasUnreadNotifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        setActiveTab={handleSetActiveTab}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          expandedSection={expandedSection}
          user={user}
          toggleSidebar={toggleSidebar}
          toggleSection={toggleSection}
          setActiveTab={handleSetActiveTab}
          handleLogout={handleLogout}
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminMobileNav
            activeTab={activeTab}
            setActiveTab={handleSetActiveTab}
          />
          
          {/* Use children instead of MainContent when children are provided */}
          {children ? (
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
              <div className="container mx-auto max-w-7xl">
                {children}
              </div>
            </main>
          ) : (
            <MainContent activeTab={activeTab} user={user} />
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={toggleMobileMenu}
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        user={user}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default AdminLayout;
