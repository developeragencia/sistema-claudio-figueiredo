
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'analyst';
  avatar?: string;
}

export const useAdminAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already stored in localStorage
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // Simulate fetching user data from an API (with mock data)
      setTimeout(() => {
        const mockUser: AdminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@sistemasclaudio.com',
          role: 'admin'
        };
        
        setUser(mockUser);
        localStorage.setItem('adminUser', JSON.stringify(mockUser));
        setLoading(false);
      }, 1000);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API login request
    setTimeout(() => {
      if (email === 'admin@sistemasclaudio.com' && password === 'admin123') {
        const mockUser: AdminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email,
          role: 'admin'
        };
        
        setUser(mockUser);
        localStorage.setItem('adminUser', JSON.stringify(mockUser));
        toast.success('Login realizado com sucesso');
        navigate('/admin');
      } else {
        toast.error('Credenciais inválidas');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setUser(null);
    toast.info('Logout realizado com sucesso');
    navigate('/login');
  };

  return { user, loading, handleLogin, handleLogout };
};
