
import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import SiteEditor from './SiteEditor';
import AdminReports from './reports';
import AdminSettings from './AdminSettings';
import UserProfilePermissions from './user-profiles/UserProfilePermissions';
import TwoFactorAuthPanel from './security/TwoFactorAuthPanel';
import SessionExpirationPanel from './security/SessionExpirationPanel';
import AccessProtectionContent from './security/AccessProtectionContent';
import AuditTrailsPanel from './security/AuditTrailsPanel';
import { motion } from 'framer-motion';
import NotificationsContent from './notifications/NotificationsContent';
import BillingContent from './billing/BillingContent';
import SupportContent from './support/SupportContent';
import AdminTabHeader from './AdminTabHeader';
import AdminProfileSettings from './profile/AdminProfileSettings';
import DocumentationContent from './documentation/DocumentationContent';
import UsersPermissionsPanel from './users/UsersPermissionsPanel';

// Tax Credits Components
import TaxCreditManagement from './tax-credits/TaxCreditManagement';
import ClientManagement from './tax-credits/ClientManagement';
import RecoveryManagement from './tax-credits/RecoveryManagement';
import DataImports from './tax-credits/DataImports';
import DataProcessing from './tax-credits/DataProcessing';
import { AuditManagement } from './tax-credits/components/audit';
import IRRFCalculations from './tax-credits/IRRFCalculations';
import IRRFRecovery from './tax-credits/IRRFRecovery';
import TaxCreditCalculator from './tax-credits/TaxCreditCalculator';
import AdvancedTaxCreditCalculator from './tax-credits/AdvancedTaxCreditCalculator';
import CreditIdentification from './tax-credits/CreditIdentification';
import FiscalReports from './tax-credits/FiscalReports';
import CommercialProposals from './tax-credits/CommercialProposals';
import ClientDetailView from './tax-credits/components/client/ClientDetailView';

// Tax Reports Components
import DetailedReportsPanel from './tax-reports/DetailedReportsPanel';
import InteractiveDashboardPanel from './tax-reports/InteractiveDashboardPanel';
import RetentionReceiptsPanel from './tax-reports/RetentionReceiptsPanel';
import TaxCompensationReportsPanel from './tax-reports/TaxCompensationReportsPanel';
import FiscalReportsPanel from './tax-reports/FiscalReportsPanel';

// Operational Components
import OperationalImportsPanel from './operational/OperationalImportsPanel';
import OperationalRecoveryPanel from './operational/OperationalRecoveryPanel';
import OperationalCreditIdentificationPanel from './operational/OperationalCreditIdentificationPanel';
import OperationalDashboardPanel from './operational/OperationalDashboardPanel';
import OperationalReceiptsPanel from './operational/OperationalReceiptsPanel';
import OperationalAuditsPanel from './operational/OperationalAuditsPanel';
import DataVisualizationPanel from './operational/DataVisualizationPanel';
import OperationalMonitoringPanel from './operational/OperationalMonitoringPanel';
import ComplianceChecksPanel from './operational/ComplianceChecksPanel';
import OperationalReportsPanel from './operational/OperationalReportsPanel';
import DataProcessingPanel from './operational/DataProcessingPanel';
import DataReconciliationPanel from './operational/DataReconciliationPanel';

// New panels for Module Components
import IRRFCalculationsPanel from './tax-credits/calculations/IRRFCalculationsPanel';
import IRRFRecoveryPanel from './tax-credits/recovery/IRRFRecoveryPanel';
import CreditIdentificationPanel from './tax-credits/identification/CreditIdentificationPanel';
import AuditManagementPanel from './audit/AuditManagementPanel';
import CommercialProposalsPanel from './commercial/CommercialProposalsPanel';

// Extra Tab Content for any other tabs that are not yet implemented
import ExtraTabContent from './ExtraTabContent';

interface MainContentProps {
  activeTab: string;
  user: any;
}

const MainContent = ({ activeTab, user }: MainContentProps) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: {
        duration: 0.3
      }
    }
  };

  const renderContent = () => {
    if (activeTab.startsWith('client/')) {
      return <ClientDetailView />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UsersPermissionsPanel />;
      case 'profile':
        return <UserProfilePermissions userRole={user?.role || "client"} />;
      case 'notifications':
        return <NotificationsContent />;
      
      case 'clients':
        return <ClientManagement />;
      
      case 'tax_credits':
        return <TaxCreditManagement />;
      case 'recovery':
        return <RecoveryManagement />;
      case 'credit_identification':
        return <CreditIdentificationPanel />;
      case 'data_processing':
        return <DataProcessingPanel />;
      case 'audits':
        return <AuditManagement />;
      case 'calculations':
        return <IRRFCalculationsPanel />;
      case 'irrf_recovery':
        return <IRRFRecoveryPanel />;
      case 'tax_calculator':
        return <AdvancedTaxCreditCalculator />;
      case 'imports':
        return <DataImports />;
      case 'fiscal_reports':
        return <FiscalReportsPanel />;
      case 'proposals':
        return <CommercialProposalsPanel />;
      case 'audit_management':
        return <AuditManagementPanel />;
      
      case 'detailed_reports':
        return <DetailedReportsPanel />;
      case 'interactive_dashboard':
        return <InteractiveDashboardPanel />;
      case 'retention_receipts':
        return <RetentionReceiptsPanel />;
      case 'tax_compensation_reports':
        return <TaxCompensationReportsPanel />;
      
      // Operational routes
      case 'operational_imports':
        return <OperationalImportsPanel />;
      case 'operational_recovery':
        return <OperationalRecoveryPanel />;
      case 'operational_credit_identification':
        return <OperationalCreditIdentificationPanel />;
      case 'operational_dashboard':
        return <OperationalDashboardPanel />;
      case 'operational_receipts':
        return <OperationalReceiptsPanel />;
      case 'operational_audits':
        return <OperationalAuditsPanel />;
      case 'data_visualization':
        return <DataVisualizationPanel />;
      case 'operational_monitoring':
        return <OperationalMonitoringPanel />;
      case 'compliance_checks':
        return <ComplianceChecksPanel />;
      case 'operational_reports':
        return <OperationalReportsPanel />;
      case 'data_reconciliation':
        return <DataReconciliationPanel />;
      
      // Security routes
      case 'two_factor_auth':
        return <TwoFactorAuthPanel />;
      case 'session_expiration':
        return <SessionExpirationPanel />;
      case 'access_protection':
        return <AccessProtectionContent />;
      case 'audit_trails':
        return <AuditTrailsPanel />;
      
      case 'site':
        return <SiteEditor />;
      case 'content_reports':
        return <AdminReports />;
      
      case 'settings':
        return <AdminSettings user={user} />;
      case 'admin_profile':
        return <AdminProfileSettings />;
      case 'security':
        return <TwoFactorAuthPanel />;
      case 'billing':
        return <BillingContent />;
      case 'support':
        return <SupportContent />;
      case 'system_documentation':
        return <DocumentationContent />;
      
      default:
        if (activeTab.startsWith('client-')) {
          return <ExtraTabContent activeTab={activeTab} />;
        }
        return <AdminDashboard />;
    }
  };

  return (
    <motion.main 
      className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background"
      key={activeTab}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto max-w-7xl">
        <AdminTabHeader activeTab={activeTab} />
        {renderContent()}
      </div>
    </motion.main>
  );
};

export default MainContent;
