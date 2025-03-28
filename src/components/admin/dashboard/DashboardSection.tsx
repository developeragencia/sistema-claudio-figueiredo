
import React from 'react';
import { motion } from 'framer-motion';
import MenuGrid from './MenuGrid';
import { MenuItem } from './types';

interface DashboardSectionProps {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
  delay?: number;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ 
  title, 
  icon, 
  items,
  delay = 0
}) => {
  // Variantes de animação para o contêiner e título
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: delay,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.section
      className="mt-12 first:mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className="relative"
        variants={titleVariants}
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <motion.span 
            className="mr-2 p-2 rounded-lg bg-muted/80 text-muted-foreground group-hover:text-primary transition-colors duration-300"
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
          >
            {icon}
          </motion.span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/70">
            {title}
          </span>
        </h2>
        
        {/* Linha decorativa abaixo do título */}
        <motion.div 
          className="h-0.5 w-16 bg-gradient-to-r from-primary/80 to-transparent mb-6 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
        />
      </motion.div>

      <MenuGrid items={items} />
    </motion.section>
  );
};

export default DashboardSection;
