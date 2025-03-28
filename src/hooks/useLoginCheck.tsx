
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const useLoginCheck = () => {
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Track component mount state
    
    // Log domain information for debugging
    const hostname = window.location.hostname;
    console.log("Login check initialized on domain:", hostname);
    
    const checkSession = async () => {
      try {
        // Check localStorage first for remembered session - most efficient path
        const rememberedAuth = localStorage.getItem('adminAuthRemembered');
        if (rememberedAuth) {
          try {
            const authData = JSON.parse(rememberedAuth);
            // If saved session is less than 30 days old, use it
            if (authData && (Date.now() - authData.timestamp) < 30 * 24 * 60 * 60 * 1000) {
              if (isMounted) {
                setTimeout(() => {
                  navigate('/admin');
                }, 200); // Faster transition
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
        
        // Next check regular session
        const sessionAuth = localStorage.getItem('adminAuth');
        if (sessionAuth) {
          try {
            const authData = JSON.parse(sessionAuth);
            if (authData && (Date.now() - authData.timestamp) < 24 * 60 * 60 * 1000) {
              if (isMounted) {
                setTimeout(() => {
                  navigate('/admin');
                }, 200); // Faster transition
              }
              return;
            } else {
              localStorage.removeItem('adminAuth');
            }
          } catch (e) {
            console.error("Error parsing session auth:", e);
            localStorage.removeItem('adminAuth');
          }
        }
        
        // Only check Supabase as last resort - most expensive operation
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking Supabase session:", error);
          toast.error("Erro ao verificar a sessão");
        }
        
        if (data.session) {
          if (isMounted) {
            setTimeout(() => {
              navigate('/admin');
            }, 200); // Faster transition
          }
        } else if (isMounted) {
          setInitializing(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        toast.error("Erro ao verificar sua sessão. Por favor, tente novamente.");
        if (isMounted) {
          setInitializing(false);
        }
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session && isMounted) {
          setTimeout(() => {
            navigate('/admin');
          }, 200); // Faster transition
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { initializing };
};

export default useLoginCheck;
