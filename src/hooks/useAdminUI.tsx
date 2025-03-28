
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAdminUI = () => {
  // Get the current route path
  const location = useLocation();
  
  // Default tab from session storage or 'dashboard'
  const [activeTab, setActiveTab] = useState(() => {
    // Attempt to get from URL first
    const path = location.pathname;
    if (path.startsWith('/admin/')) {
      const tabFromUrl = path.split('/')[2];
      if (tabFromUrl) return tabFromUrl;
    }
    
    // Then try session storage
    return sessionStorage.getItem('adminActiveTab') || 'dashboard';
  });
  
  const navigate = useNavigate();
  const initialRender = useRef(true);
  const navigationInProgress = useRef(false);
  const navigationLock = useRef(false);
  const hostname = window.location.hostname;
  
  // Log domain information for debugging
  useEffect(() => {
    console.log("Admin UI initialized on domain:", hostname);
  }, [hostname]);
  
  // Prevent rapid navigation changes
  const navigateWithLock = useCallback((path: string, options = {}) => {
    if (navigationLock.current) return;
    
    navigationLock.current = true;
    navigate(path, options);
    
    // Release lock after navigation completes
    setTimeout(() => {
      navigationLock.current = false;
    }, 300);
  }, [navigate]);
  
  // Persist active tab to session storage when it changes
  useEffect(() => {
    if (activeTab) {
      // Always store the active tab in session storage
      sessionStorage.setItem('adminActiveTab', activeTab);
      
      // Only update URL if not during initial render to prevent unnecessary redirects
      if (!initialRender.current && !navigationInProgress.current) {
        navigationInProgress.current = true;
        const currentPath = location.pathname;
        const expectedPath = activeTab === 'dashboard' ? '/admin' : `/admin/${activeTab}`;
        
        if (currentPath !== expectedPath && !currentPath.includes(expectedPath)) {
          navigateWithLock(expectedPath, { replace: true });
        }
        
        // Reset navigation flag after a short delay
        setTimeout(() => {
          navigationInProgress.current = false;
        }, 300);
      } else {
        initialRender.current = false;
      }
    }
  }, [activeTab, navigateWithLock, location.pathname]);
  
  // Other state management
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem('sidebarOpen');
    return stored ? stored === 'true' : true;
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom setActiveTab function
  const handleSetActiveTab = useCallback((tab: string) => {
    // Only update if tab is actually changing and no navigation is in progress
    if (tab && tab !== activeTab && !navigationLock.current) {
      console.log("Setting active tab:", tab);
      setActiveTab(tab);
    }
  }, [activeTab]);
  
  // Toggle functions
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebarOpen', String(newValue));
      return newValue;
    });
  }, []);
  
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', String(newValue));
      
      // Update document class for dark mode
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newValue;
    });
  }, []);
  
  // Initialize dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const toggleSection = useCallback((section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  }, []);
  
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);
  
  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
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
  };
};
