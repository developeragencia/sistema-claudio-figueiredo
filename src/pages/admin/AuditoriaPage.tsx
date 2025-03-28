
import React from 'react';
import AuditManagementContent from '@/components/admin/tax-credits/components/AuditManagementContent';
import AdminLayout from '@/components/admin/AdminLayout';
import useAuditManagement from '@/hooks/useAuditManagement';
import NewAuditForm from '@/components/admin/audit/NewAuditForm';
import { motion } from 'framer-motion';

const AuditoriaPage = () => {
  const {
    handleCreateAudit,
    handleSaveAudit,
    isFormOpen,
    setIsFormOpen,
    currentAudit,
    isEditMode
  } = useAuditManagement();
  
  return (
    <AdminLayout activeTab="auditorias">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AuditManagementContent />
        
        <NewAuditForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveAudit}
          initialData={currentAudit || {}}
          isEdit={isEditMode}
        />
      </motion.div>
    </AdminLayout>
  );
};

export default AuditoriaPage;
