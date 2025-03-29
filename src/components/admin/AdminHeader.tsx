import React from 'react';
import { 
  Sun, Moon, Menu, Search, Bell, Settings, 
  LogOut, User, Calendar, X, ChevronRight, AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { ActiveClientIndicator } from './indicators/ActiveClientIndicator';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  toggleDarkMode: () => void;
  handleLogout: () => void;
  sidebarOpen: boolean;
  darkMode: boolean;
  hasNotifications: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: any;
  setActiveTab: (tab: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  toggleSidebar,
  toggleMobileMenu,
  toggleDarkMode,
  handleLogout,
  sidebarOpen,
  darkMode,
  hasNotifications,
  searchQuery,
  setSearchQuery,
  user,
  setActiveTab,
}) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = React.useState(false);
  
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.getElementById('global-search')?.focus();
      }, 100);
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };
  
  const handleProfileClick = () => {
    setActiveTab('admin_profile');
    router.push('/admin/admin_profile');
  };
  
  const handleNotificationsClick = () => {
    setActiveTab('notifications');
    router.push('/admin/notifications');
  };
  
  const handleSettingsClick = () => {
    setActiveTab('settings');
    router.push('/admin/settings');
  };
  
  return (
    <header className="h-14 border-b border-border/40 flex items-center px-4 sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:flex hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="lg:hidden flex"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <AnimatePresence mode="wait">
            {!showSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <h1 className="text-xl font-semibold hidden sm:flex sm:items-center">
                  Sistemas <span className="text-primary ml-1"> Claudio Figueiredo</span>
                </h1>
                <h1 className="text-lg font-semibold flex sm:hidden">
                  SCF
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence mode="wait">
          {showSearch ? (
            <motion.div
              initial={{ opacity: 0, width: "0%" }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: "0%" }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 px-4 flex items-center"
            >
              <div className="relative w-full max-w-xl mx-auto">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="global-search"
                  placeholder="Buscar no sistema..."
                  className="w-full pl-9 pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-7 w-7"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <ActiveClientIndicator />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className={cn(
              "relative",
              showSearch && "text-primary"
            )}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationsClick}
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar-placeholder.png" alt={user?.name || "User"} />
                  <AvatarFallback>
                    {(user?.name?.charAt(0) || "U")}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "Usuário"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || "usuario@exemplo.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
