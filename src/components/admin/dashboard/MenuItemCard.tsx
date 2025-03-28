
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, MousePointerClick, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MenuItem } from './types';
import {
  itemVariants,
  shimmerVariants,
  pulseVariants,
  iconAnimationVariants
} from './utils/animationUtils';
import {
  getBaseCardStyles,
  getHoverGradientStyles,
  getIconColorFromGradient
} from './utils/colorUtils';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent) => {
    // Prevent event propagation so parent elements don't capture the click
    event.stopPropagation();
    event.preventDefault();
    
    // Add console.log to debug navigation
    console.log('Navigating to:', item.route, 'isExternal:', item.isExternal);
    
    if (item.isExternal) {
      window.open(item.route, '_blank');
    } else {
      // Navigate to the appropriate route based on the item's route value
      if (item.route === 'clients') {
        navigate('/secure/clients');
      } else if (item.route === 'tax_credits') {
        navigate('/secure/tax_credits');
      } else if (item.route === 'tax_calculator') {
        navigate('/secure/tax_calculator');
      } else if (item.route === 'calculations/irrf') {
        navigate('/secure/calculations/irrf');
      } else if (item.route === 'irrf_recovery') {
        navigate('/secure/irrf_recovery');
      } else if (item.route === 'credit_identification') {
        navigate('/secure/credit_identification');
      } else if (item.route === 'detailed_reports') {
        navigate('/secure/detailed_reports');
      } else if (item.route === 'tax_compensation_reports') {
        navigate('/secure/tax_compensation_reports');
      } else if (item.route === 'interactive_dashboard') {
        navigate('/secure/interactive_dashboard');
      } else if (item.route === 'retention_receipts') {
        navigate('/secure/retention_receipts');
      } else if (item.route === 'fiscal_reports') {
        navigate('/secure/fiscal_reports');
      } else if (item.route === 'commercial/proposals') {
        navigate('/secure/proposals');
      } else if (item.route === 'audit_management') {
        navigate('/secure/audit_management');
      } else if (item.route.startsWith('/')) {
        // Route already has a leading slash
        navigate(item.route);
      } else if (item.route === 'dashboard') {
        // For dashboard, navigate to the secure dashboard
        navigate('/secure/dashboard');
      } else {
        navigate(`/secure/${item.route}`);
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 cursor-pointer",
        "border backdrop-blur-sm group transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10",
        getBaseCardStyles(item.color),
      )}
      variants={itemVariants}
      whileHover="hover"
      onClick={(e) => handleMenuClick(e)}
      layoutId={`menu-card-${item.id}`}
    >
      {/* Background overlay that only appears on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        "group-hover:opacity-100",
        getHoverGradientStyles(item.color)
      )} />
      
      {/* Shimmer effect only on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Highlight indicator with conditional animation */}
      {item.highlight && (
        <div className="absolute top-3 right-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity, 
              duration: 6,
              ease: "linear"
            }}
          >
            <Sparkles className="h-5 w-5 text-yellow-300 filter drop-shadow-md" />
          </motion.div>
        </div>
      )}
      
      {/* New item indicator with conditional pulse - repositioned to center top */}
      {item.new && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="flex items-center px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white shadow-sm"
          >
            <Star className="h-3 w-3 mr-1" />
            Novo
          </motion.div>
        </div>
      )}
      
      {/* Icon container with site color styling and animation */}
      <motion.div 
        className="h-14 w-14 rounded-lg flex items-center justify-center mb-4 shadow-sm border border-muted/50 group-hover:border-primary/20 transition-all duration-300"
        style={{ 
          background: `linear-gradient(135deg, ${getIconColorFromGradient(item.color)}40, ${getIconColorFromGradient(item.color)}70)` 
        }}
        variants={iconAnimationVariants}
        initial="initial"
        whileHover="hover"
      >
        {/* Animated icon wrapper */}
        <motion.div 
          className="text-white flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1], 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          {item.icon}
        </motion.div>
      </motion.div>

      {/* Title with color transition on hover */}
      <h3 className="text-lg font-medium mb-2 transition-all duration-300 text-foreground/90 group-hover:text-primary">
        {item.title}
      </h3>
      
      {/* Description with transition effects */}
      <p className="text-sm text-muted-foreground/70 mb-4 transition-all duration-300 group-hover:text-foreground/80">
        {item.description}
      </p>
      
      {/* Action button with hover effect */}
      <div className="flex items-center mt-auto text-sm font-medium">
        <motion.span 
          className="transition-all duration-300 text-muted-foreground group-hover:text-primary"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
        >
          Acessar
        </motion.span>
        {item.isExternal ? (
          <motion.div
            initial={{ x: 0, rotate: 0 }}
            whileHover={{ x: 5, rotate: 15 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
          >
            <ExternalLink className="ml-2 h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.div>
        )}
      </div>

      {/* Click effect with animated circle */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ 
            scale: [0, 1.5],
            opacity: [0, 0.3, 0],
            transition: { duration: 0.7 }
          }}
        >
          <MousePointerClick className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>

      {/* Corner decoration with subtle animation */}
      <motion.div 
        className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500" 
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
};

export default MenuItemCard;
