import React from 'react';
import { Outlet } from 'react-router-dom';
import { ActiveClientSelector } from '../header/ActiveClientSelector';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <ActiveClientSelector />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
} 