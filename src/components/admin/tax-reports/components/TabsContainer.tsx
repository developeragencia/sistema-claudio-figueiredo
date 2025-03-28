
import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: ReactNode;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  setActiveTab,
  children
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/30 backdrop-blur-sm rounded-xl">
          <TabsTrigger 
            value="simulation"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
          >
            Simulação
          </TabsTrigger>
          <TabsTrigger 
            value="per_dcomp"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
          >
            PER/DCOMP
          </TabsTrigger>
          <TabsTrigger 
            value="judicial"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
          >
            Decisões Judiciais
          </TabsTrigger>
        </TabsList>
      </motion.div>
      
      <div className="mt-4">
        {children}
      </div>
    </Tabs>
  );
};

export default TabsContainer;
