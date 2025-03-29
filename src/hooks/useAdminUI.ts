import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUIState {
  activeTab: string;
  sidebarOpen: boolean;
  darkMode: boolean;
  hasNotifications: boolean;
  searchQuery: string;
  expandedSection: string | null;
  mobileMenuOpen: boolean;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleSection: (section: string) => void;
  toggleMobileMenu: () => void;
  setSearchQuery: (query: string) => void;
}

export const useAdminUI = create<AdminUIState>()(
  persist(
    (set) => ({
      activeTab: 'dashboard',
      sidebarOpen: true,
      darkMode: false,
      hasNotifications: false,
      searchQuery: '',
      expandedSection: 'main',
      mobileMenuOpen: false,
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDarkMode };
      }),
      toggleSection: (section) => set((state) => ({
        expandedSection: state.expandedSection === section ? null : section
      })),
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'admin-ui-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        sidebarOpen: state.sidebarOpen,
        expandedSection: state.expandedSection,
      }),
    }
  )
); 