
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportHistoryTable from './ImportHistoryTable';
import { motion } from 'framer-motion';

const HistoryTabContent = () => {
  return (
    <TabsContent value="history" className="space-y-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
        className="card-shimmer"
      >
        <ImportHistoryTable />
      </motion.div>
    </TabsContent>
  );
};

export default HistoryTabContent;
