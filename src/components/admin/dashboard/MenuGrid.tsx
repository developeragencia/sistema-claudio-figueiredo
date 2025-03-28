
import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem, MenuGridProps } from './types';
import MenuItemCard from './MenuItemCard';
import { containerVariants } from './utils/animationUtils';

const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
};

export default MenuGrid;
