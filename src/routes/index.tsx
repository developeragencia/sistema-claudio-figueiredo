import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

// Lazy imports
const Login = lazy(() => import('@/pages/Login').then(module => ({ default: module.default })))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword').then(module => ({ default: module.default })))
const ResetPassword = lazy(() => import('@/pages/ResetPassword').then(module => ({ default: module.default })))
const Dashboard = lazy(() => import('@/pages/Dashboard').then(module => ({ default: module.default })))
const Proposals = lazy(() => import('@/pages/Proposals').then(module => ({ default: module.default })))
const ProposalDetails = lazy(() => import('@/pages/proposals/[id]').then(module => ({ default: module.default })))
const NewProposal = lazy(() => import('@/pages/proposals/new').then(module => ({ default: module.default })))
const Contracts = lazy(() => import('@/pages/Contracts').then(module => ({ default: module.default })))
const Profile = lazy(() => import('@/pages/Profile').then(module => ({ default: module.default })))
const Users = lazy(() => import('@/pages/Users').then(module => ({ default: module.default })))
const SystemSettings = lazy(() => import('@/pages/SystemSettings').then(module => ({ default: module.default })))
const SystemAudit = lazy(() => import('@/pages/SystemAudit').then(module => ({ default: module.default })))
const SystemLogs = lazy(() => import('@/pages/SystemLogs').then(module => ({ default: module.default })))
const Reports = lazy(() => import('@/pages/Reports').then(module => ({ default: module.default })))
const Clients = lazy(() => import('@/pages/Clients').then(module => ({ default: module.default })))
const ClientDetails = lazy(() => import('@/pages/ClientDetails').then(module => ({ default: module.default })))
const Notifications = lazy(() => import('@/pages/Notifications').then(module => ({ default: module.default })))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> }
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/proposals', element: <Proposals /> },
      { path: '/proposals/:id', element: <ProposalDetails /> },
      { path: '/proposals/new', element: <NewProposal /> },
      { path: '/contracts', element: <Contracts /> },
      { path: '/profile', element: <Profile /> },
      { path: '/users', element: <Users /> },
      { path: '/settings', element: <SystemSettings /> },
      { path: '/audit', element: <SystemAudit /> },
      { path: '/logs', element: <SystemLogs /> },
      { path: '/reports', element: <Reports /> },
      { path: '/clients', element: <Clients /> },
      { path: '/clients/:id', element: <ClientDetails /> },
      { path: '/notifications', element: <Notifications /> }
    ]
  }
]

export default routes 