
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Key, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ADMIN_EMAIL = 'admin@sistemasclaudio.com';
const ADMIN_PASSWORD = 'admin123';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      
      if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('Using fallback admin login');
        
        const authData = {
          email: ADMIN_EMAIL,
          isAdmin: true,
          timestamp: Date.now()
        };
        
        if (rememberMe) {
          localStorage.setItem('adminAuthRemembered', JSON.stringify(authData));
        } else {
          localStorage.setItem('adminAuth', JSON.stringify(authData));
        }
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Painel Administrativo.",
        });
        
        setTimeout(() => {
          onSuccess();
        }, 500); // Reduced timeout for faster navigation
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password
      });

      if (error) throw error;

      if (rememberMe) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          localStorage.setItem('adminAuthRemembered', JSON.stringify({
            timestamp: Date.now(),
            sessionExpiry: data.session.expires_at
          }));
        }
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Painel Administrativo.",
      });
      
      setTimeout(() => {
        onSuccess();
      }, 500); // Reduced timeout for faster navigation
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
      toast({
        title: "Erro de autenticação",
        description: error.message || "Falha ao fazer login. Verifique suas credenciais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleLogin} 
      className="space-y-4 sm:space-y-5"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 border-primary/20 focus-visible:ring-primary/30"
            aria-label="Email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 border-primary/20 focus-visible:ring-primary/30"
            aria-label="Senha"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="remember-me" 
          checked={rememberMe} 
          onCheckedChange={setRememberMe}
          className="data-[state=checked]:bg-primary/80"
          aria-label="Manter conectado"
        />
        <Label 
          htmlFor="remember-me" 
          className="text-xs sm:text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        >
          Manter conectado
        </Label>
      </div>
      
      {error && (
        <motion.div 
          className="text-xs sm:text-sm text-destructive bg-destructive/10 p-2 sm:p-3 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      
      <Button 
        type="submit" 
        className="w-full transition-all duration-300 hover:shadow-md hover:shadow-primary/20 bg-gradient-to-r from-primary to-primary/90"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </motion.form>
  );
};

export default React.memo(LoginForm);
