import React, { useEffect, useState } from 'react';
import AnimatedLogo from '@/components/AnimatedLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { Construction, Wrench, Timer, ArrowRight, RefreshCcw, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate  } from "@/hooks/use-router";

const Maintenance = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [message, setMessage] = useState('Estamos realizando manutenção em nosso sistema para melhorar sua experiência.');
  const [attemptedBypass, setAttemptedBypass] = useState(false);

  useEffect(() => {
    // Get maintenance details from localStorage
    const maintenanceEndDate = localStorage.getItem('maintenanceEndDate');
    const maintenanceMessage = localStorage.getItem('maintenanceMessage');

    // If maintenance mode is not active, redirect to home
    const maintenanceMode = localStorage.getItem('maintenanceMode');
    if (maintenanceMode !== 'true') {
      navigate('/');
      return;
    }
    
    // Set custom message if available
    if (maintenanceMessage) {
      setMessage(maintenanceMessage);
    }
    
    // Setup countdown timer
    const updateCountdown = () => {
      const now = new Date();
      const endTime = maintenanceEndDate ? new Date(maintenanceEndDate) : new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      if (now >= endTime) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const diff = endTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ hours, minutes, seconds });
    };
    
    // Initial update
    updateCountdown();
    
    // Setup interval for countdown
    const interval = setInterval(updateCountdown, 1000);
    
    // Clean up
    return () => clearInterval(interval);
  }, [navigate]);

  const handleAdminLogin = () => {
    setAttemptedBypass(true);
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: { 
        repeat: Infinity, 
        duration: 2 
      }
    }
  };

  const countdownItemVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    }
  };

  const icons = [<Wrench key={0} />, <RefreshCcw key={1} />, <Construction key={2} />];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex(prev => (prev + 1) % icons.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex flex-col items-center justify-center px-4 lg:px-8">
        <motion.div 
          className="relative mx-auto w-full max-w-4xl flex flex-col items-center p-6 sm:p-10 rounded-2xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Layered background */}
          <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
          
          {/* Floating particles */}
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-float-medium"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-float-fast"></div>
          
          {/* Content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center text-center"
            variants={itemVariants}
          >
            <div className="mb-2 scale-150 transform-gpu">
              <AnimatedLogo size="lg" hovering={true} />
            </div>
          </motion.div>
          
          <motion.div 
            className="relative z-10 mt-8 bg-white/10 backdrop-blur-md p-8 rounded-xl border border-primary/20 shadow-xl w-full max-w-3xl"
            variants={itemVariants}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white p-2 px-4 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap text-sm font-medium">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                {icons[currentIconIndex]}
              </motion.div>
              <span>Modo de Manutenção</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-foreground flex items-center justify-center gap-3">
              <AlertTriangle className="h-7 w-7 text-amber-500" />
              <span>Site em Manutenção</span>
            </h1>
            
            <motion.div 
              className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6"
              variants={pulseVariants}
              animate="pulse"
            >
              <p className="text-lg text-muted-foreground">{message}</p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <motion.div 
                className="bg-card p-4 rounded-xl shadow border border-primary/10 flex items-center gap-3"
                whileHover={{ y: -5, boxShadow: "0 12px 30px -10px rgba(110, 89, 165, 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Clock className="text-primary h-5 w-5" />
                <div className="text-sm font-medium">
                  Tempo estimado: <span className="text-primary">Em breve</span>
                </div>
              </motion.div>
              
              <div className="text-center sm:text-left">
                <div className="text-sm text-muted-foreground mb-1">Retorno estimado em:</div>
                <div className="flex items-center gap-2 justify-center">
                  <motion.div
                    key={`hours-${countdown.hours}`}
                    initial="initial"
                    animate="animate"
                    variants={countdownItemVariants}
                    className="bg-primary/10 p-2 rounded-md w-16 text-center"
                  >
                    <div className="text-xl font-bold text-primary">{countdown.hours}</div>
                    <div className="text-xs text-muted-foreground">horas</div>
                  </motion.div>
                  
                  <span className="text-xl">:</span>
                  
                  <motion.div
                    key={`minutes-${countdown.minutes}`}
                    initial="initial"
                    animate="animate"
                    variants={countdownItemVariants}
                    className="bg-primary/10 p-2 rounded-md w-16 text-center"
                  >
                    <div className="text-xl font-bold text-primary">{countdown.minutes}</div>
                    <div className="text-xs text-muted-foreground">minutos</div>
                  </motion.div>
                  
                  <span className="text-xl">:</span>
                  
                  <motion.div
                    key={`seconds-${countdown.seconds}`}
                    initial="initial"
                    animate="animate"
                    variants={countdownItemVariants}
                    className="bg-primary/10 p-2 rounded-md w-16 text-center"
                  >
                    <div className="text-xl font-bold text-primary">{countdown.seconds}</div>
                    <div className="text-xs text-muted-foreground">segundos</div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-8">
              Estamos trabalhando para melhorar sua experiência. Agradecemos sua paciência.
            </div>
            
            <AnimatePresence>
              {!attemptedBypass ? (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center"
                >
                  <Button
                    variant="outline"
                    className="group relative overflow-hidden"
                    onClick={handleAdminLogin}
                  >
                    <span className="relative z-10 flex items-center">
                      Acesso Administrativo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 h-full w-0 bg-primary/10 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-sm text-primary font-medium">
                    Redirecionando para a página de login...
                  </div>
                  <div className="mt-2 w-full bg-primary/10 h-1 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            className="relative z-10 mt-6 text-xs text-muted-foreground"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} Sistemas Claudio Figueiredo. Todos os direitos reservados.
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Maintenance;
