import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { NavBar } from '@/components/NavBar';

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 