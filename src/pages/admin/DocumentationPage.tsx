
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { motion } from 'framer-motion';
import DocumentationContent from '@/components/admin/documentation/DocumentationContent';

const DocumentationPage = () => {
  return (
    <AdminLayout activeTab="system_documentation">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <DocumentationContent />
      </motion.div>
    </AdminLayout>
  );
};

export default DocumentationPage;
