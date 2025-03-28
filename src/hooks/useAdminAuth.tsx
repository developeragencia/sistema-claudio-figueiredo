
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Log domain information for debugging
  useEffect(() => {
    const hostname = window.location.hostname;
    console.log("Admin auth initialized on domain:", hostname);
  }, []);

  useEffect(() => {
    let isMounted = true; // Track component mount state to prevent state updates after unmount
    
    const checkAuth = async () => {
      try {
        console.log("Checking auth status...");
        
        // First check for remembered auth in localStorage
        const rememberedAuth = localStorage.getItem('adminAuthRemembered');
        const adminAuth = localStorage.getItem('adminAuth');
        let adminAuthData = null;
        
        if (rememberedAuth) {
          try {
            const authData = JSON.parse(rememberedAuth);
            const now = Date.now();
            const authTime = authData.timestamp || 0;
            // 30 days validity
            if (now - authTime < 30 * 24 * 60 * 60 * 1000) {
              console.log("Using remembered auth");
              if (isMounted) {
                setUser({ 
                  id: authData.id || 'default-id',
                  email: authData.email || 'admin@sistemasclaudio.com',
                  name: authData.name || 'Admin User'
                });
                setLoading(false);
              }
              return;
            } else {
              localStorage.removeItem('adminAuthRemembered');
            }
          } catch (e) {
            console.error("Error parsing remembered auth:", e);
            localStorage.removeItem('adminAuthRemembered');
          }
        }
        
        // Then check regular session
        if (adminAuth) {
          try {
            adminAuthData = JSON.parse(adminAuth);
            const now = Date.now();
            const authTime = adminAuthData.timestamp || 0;
            // 1 day validity
            if (now - authTime < 24 * 60 * 60 * 1000) {
              console.log("Using admin auth");
              if (isMounted) {
                setUser({ 
                  id: adminAuthData.id || 'default-id',
                  email: adminAuthData.email || 'admin@sistemasclaudio.com',
                  name: adminAuthData.name || 'Admin User'
                });
                setLoading(false);
              }
              return;
            } else {
              localStorage.removeItem('adminAuth');
              adminAuthData = null;
            }
          } catch (e) {
            console.error("Error parsing admin auth:", e);
            localStorage.removeItem('adminAuth');
          }
        }
        
        // Finally check Supabase session
        console.log("Checking Supabase session");
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase auth error:", error);
          throw error;
        }
        
        if (data.session) {
          console.log("Found Supabase session");
          const userData = {
            id: data.session.user.id,
            email: data.session.user.email,
            name: data.session.user.user_metadata?.name || 'Admin User',
            avatar: data.session.user.user_metadata?.avatar
          };
          if (isMounted) {
            setUser(userData);
            
            // Also save in localStorage for fallback
            localStorage.setItem('adminAuth', JSON.stringify({
              ...userData,
              timestamp: Date.now()
            }));
            
            setLoading(false);
          }
        } else {
          // For development, use a fallback user if no session
          if (import.meta.env.DEV) {
            console.log("DEV mode: using fallback user");
            if (isMounted) {
              setUser({
                id: 'fallback-id',
                email: 'admin@sistemasclaudio.com',
                name: 'Admin User (Dev)'
              });
              setLoading(false);
            }
          } else {
            console.log("No valid session found, redirecting to login");
            // No valid session found, redirect to login
            if (window.location.pathname !== '/login' && isMounted) {
              navigate('/login');
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Erro de autenticação. Por favor, faça login novamente.");
        if (isMounted) {
          setLoading(false);
          if (window.location.pathname !== '/login') {
            navigate('/login');
          }
        }
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change:", event);
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminAuthRemembered');
          if (isMounted) {
            setUser(null);
            if (window.location.pathname !== '/login') {
              navigate('/login');
            }
          }
        } else if (session && isMounted) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || 'Admin User',
            avatar: session.user.user_metadata?.avatar
          };
          setUser(userData);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminAuthRemembered');
      await supabase.auth.signOut();
      uiToast({
        title: "Sessão encerrada",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      uiToast({
        variant: "destructive",
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar encerrar sua sessão.",
      });
    }
  };

  return { user, loading, handleLogout };
};
