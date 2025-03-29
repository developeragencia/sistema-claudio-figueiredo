import React from 'react';
import { Outlet  } from "@/hooks/use-router";
import Navigation from './Navigation';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <NotificationCenter />
    </div>
  );
};

export default Layout; 