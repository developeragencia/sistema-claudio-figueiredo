
import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLoading from '../components/admin/AdminLoading';
import AdminLayout from '../components/admin/AdminLayout';

// Eager-loaded components
import TaxCreditManagement from '../components/admin/tax-credits/TaxCreditManagement';
import OperationalCreditIdentificationPanel from '../components/admin/tax-credits/components/OperationalCreditIdentificationPanel';
import OperationalImportsPanel from '../components/admin/operational/OperationalImportsPanel';
import DataFilterPanel from '../components/admin/imports/DataFilterPanel';
import SelicCorrectionPanel from '../components/admin/tax-credits/calculations/SelicCorrectionPanel';
import SelicIntegrationPanel from '../components/admin/tax-credits/calculations/selic-correction/SelicIntegrationPanel';
import CommercialProposalsPanel from '../components/admin/commercial/CommercialProposalsPanel';
import TwoFactorAuthPanel from '../components/admin/security/TwoFactorAuthPanel';
import SessionExpirationPanel from '../components/admin/security/SessionExpirationPanel';
import AccessProtectionContent from '../components/admin/security/AccessProtectionContent';
import AuditTrailsPanel from '../components/admin/security/AuditTrailsPanel';
import TaxCompensationReportsPanel from '../components/admin/tax-reports/TaxCompensationReportsPanel';
import AdvancedTaxCreditCalculator from '../components/admin/tax-credits/AdvancedTaxCreditCalculator';
import ClientManagement from '../components/admin/tax-credits/ClientManagement';
import DetailedReportsPanel from '../components/admin/tax-reports/DetailedReportsPanel';
import InteractiveDashboardPanel from '../components/admin/tax-reports/InteractiveDashboardPanel';
import RetentionReceiptsPanel from '../components/admin/tax-reports/RetentionReceiptsPanel';
import FiscalReportsPanel from '../components/admin/tax-reports/FiscalReportsPanel';
import IRRFCalculationsPanel from '../components/admin/tax-credits/calculations/IRRFCalculationsPanel';
import IRRFRecoveryPanel from '../components/admin/tax-credits/recovery/IRRFRecoveryPanel';
import CreditIdentificationPanel from '../components/admin/tax-credits/identification/CreditIdentificationPanel';
import AuditManagementPanel from '../components/admin/audit/AuditManagementPanel';
import AdminProfileSettings from '../components/admin/profile/AdminProfileSettings';
import UsersPermissionsPanel from '../components/admin/users/UsersPermissionsPanel';

// Operational routes components
import OperationalDashboardPanel from '../components/admin/operational/OperationalDashboardPanel';
import OperationalAuditsPanel from '../components/admin/operational/OperationalAuditsPanel';
import OperationalReceiptsPanel from '../components/admin/operational/OperationalReceiptsPanel';
import DataVisualizationPanel from '../components/admin/operational/DataVisualizationPanel';
import OperationalMonitoringPanel from '../components/admin/operational/OperationalMonitoringPanel';
import ComplianceChecksPanel from '../components/admin/operational/ComplianceChecksPanel';
import OperationalReportsPanel from '../components/admin/operational/OperationalReportsPanel';
import DataProcessingPanel from '../components/admin/operational/DataProcessingPanel';
import DataReconciliationPanel from '../components/admin/operational/DataReconciliationPanel';

// Lazy-loaded components
const AdminUsers = lazy(() => import('../components/admin/AdminUsers'));
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboard'));
const SiteEditor = lazy(() => import('../components/admin/SiteEditor'));
const AdminSettings = lazy(() => import('../components/admin/AdminSettings'));

const AdminRoutes = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine active tab based on route
  const getActiveTab = () => {
    if (path.includes('/admin/users')) return 'users';
    if (path.includes('/admin/site')) return 'site';
    if (path.includes('/admin/settings')) return 'settings';
    if (path.includes('/admin/tax_credits')) return 'tax_credits';
    if (path.includes('/admin/clients')) return 'clients';
    if (path.includes('/admin/credit_identification')) return 'credit_identification';
    if (path.includes('/admin/operational_imports')) return 'operational_imports';
    if (path.includes('/admin/imports/filter')) return 'imports_filter';
    if (path.includes('/admin/calculations/selic')) return 'selic';
    if (path.includes('/admin/calculations/selic-integration')) return 'selic_integration';
    if (path.includes('/admin/commercial/proposals')) return 'commercial_proposals';
    if (path.includes('/admin/two_factor_auth')) return 'two_factor_auth';
    if (path.includes('/admin/session_expiration')) return 'session_expiration';
    if (path.includes('/admin/access_protection')) return 'access_protection';
    if (path.includes('/admin/audit_trails')) return 'audit_trails';
    if (path.includes('/admin/tax_compensation_reports')) return 'tax_compensation_reports';
    if (path.includes('/admin/tax_calculator')) return 'tax_calculator';
    if (path.includes('/admin/admin_profile')) return 'admin_profile';
    if (path.includes('/admin/calculations/irrf')) return 'calculations';
    if (path.includes('/admin/irrf_recovery')) return 'irrf_recovery';
    if (path.includes('/admin/detailed_reports')) return 'detailed_reports';
    if (path.includes('/admin/interactive_dashboard')) return 'interactive_dashboard';
    if (path.includes('/admin/retention_receipts')) return 'retention_receipts';
    if (path.includes('/admin/fiscal_reports')) return 'fiscal_reports';
    if (path.includes('/admin/proposals')) return 'proposals';
    if (path.includes('/admin/audit_management')) return 'audit_management';
    if (path.includes('/admin/users_permissions')) return 'users';
    
    // Operational route paths
    if (path.includes('/admin/operational_dashboard')) return 'operational_dashboard';
    if (path.includes('/admin/operational_audits')) return 'operational_audits';
    if (path.includes('/admin/operational_receipts')) return 'operational_receipts';
    if (path.includes('/admin/data_visualization')) return 'data_visualization';
    if (path.includes('/admin/operational_monitoring')) return 'operational_monitoring';
    if (path.includes('/admin/compliance_checks')) return 'compliance_checks';
    if (path.includes('/admin/operational_reports')) return 'operational_reports';
    if (path.includes('/admin/data_processing')) return 'data_processing';
    if (path.includes('/admin/data_reconciliation')) return 'data_reconciliation';
    
    // Default to dashboard
    return 'dashboard';
  };
  
  const activeTab = getActiveTab();

  return (
    <Routes>
      <Route path="/" element={<AdminLayout activeTab={activeTab} />}>
        <Route index element={
          <Suspense fallback={<AdminLoading />}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="users" element={
          <Suspense fallback={<AdminLoading />}>
            <AdminUsers />
          </Suspense>
        } />
        <Route path="site" element={
          <Suspense fallback={<AdminLoading />}>
            <SiteEditor />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<AdminLoading />}>
            <AdminSettings />
          </Suspense>
        } />
        <Route path="admin_profile" element={<AdminProfileSettings />} />
        <Route path="tax_credits" element={<TaxCreditManagement />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="credit_identification" element={<CreditIdentificationPanel />} />
        <Route path="operational_imports" element={<OperationalImportsPanel />} />
        <Route path="imports/filter" element={<DataFilterPanel />} />
        <Route path="calculations/selic" element={<SelicCorrectionPanel />} />
        <Route path="calculations/selic-integration" element={<SelicIntegrationPanel />} />
        <Route path="calculations/irrf" element={<IRRFCalculationsPanel />} />
        <Route path="commercial/proposals" element={<CommercialProposalsPanel />} />
        <Route path="two_factor_auth" element={<TwoFactorAuthPanel />} />
        <Route path="session_expiration" element={<SessionExpirationPanel />} />
        <Route path="access_protection" element={<AccessProtectionContent />} />
        <Route path="audit_trails" element={<AuditTrailsPanel />} />
        <Route path="users_permissions" element={<UsersPermissionsPanel />} />
        <Route path="tax_compensation_reports" element={<TaxCompensationReportsPanel />} />
        <Route path="tax_calculator" element={<AdvancedTaxCreditCalculator />} />
        <Route path="irrf_recovery" element={<IRRFRecoveryPanel />} />
        <Route path="detailed_reports" element={<DetailedReportsPanel />} />
        <Route path="interactive_dashboard" element={<InteractiveDashboardPanel />} />
        <Route path="retention_receipts" element={<RetentionReceiptsPanel />} />
        <Route path="fiscal_reports" element={<FiscalReportsPanel />} />
        <Route path="proposals" element={<CommercialProposalsPanel />} />
        <Route path="audit_management" element={<AuditManagementPanel />} />
        
        {/* Operational routes */}
        <Route path="operational_dashboard" element={<OperationalDashboardPanel />} />
        <Route path="operational_audits" element={<OperationalAuditsPanel />} />
        <Route path="operational_receipts" element={<OperationalReceiptsPanel />} />
        <Route path="data_visualization" element={<DataVisualizationPanel />} />
        <Route path="operational_monitoring" element={<OperationalMonitoringPanel />} />
        <Route path="compliance_checks" element={<ComplianceChecksPanel />} />
        <Route path="operational_reports" element={<OperationalReportsPanel />} />
        <Route path="data_processing" element={<DataProcessingPanel />} />
        <Route path="data_reconciliation" element={<DataReconciliationPanel />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
