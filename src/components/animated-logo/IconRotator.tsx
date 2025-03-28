
import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileWarning, FolderCog, HardDrive, Layers, PieChart, Shield } from 'lucide-react';

interface IconRotatorProps {
  className?: string;
  color?: string;
  rotating?: boolean;
}

const IconRotator: React.FC<IconRotatorProps> = ({ className, color, rotating = false }) => {
  // List of icons to be displayed in rotation
  const icons = [
    <Database key="database" />,
    <FileWarning key="fileWarning" />,
    <FolderCog key="folderCog" />,
    <HardDrive key="hardDrive" />,
    <Layers key="layers" />,
    <PieChart key="pieChart" />,
    <Shield key="shield" />
  ];

  // Current icon to display
  const currentIcon = icons[0];

  const iconColor = color || 'currentColor';

  return (
    <motion.div
      className={`text-primary ${className || ''}`}
      style={{ color: iconColor }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotating ? 360 : 0 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: rotating ? Infinity : 0 }}
    >
      {currentIcon}
    </motion.div>
  );
};

export default IconRotator;
