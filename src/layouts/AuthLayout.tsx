import React from 'react';
import { Outlet  } from "@/hooks/use-router";
import { Logo } from '@/components/Logo';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
} 