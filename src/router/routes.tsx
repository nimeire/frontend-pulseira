import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { RequireAuth } from '../components/require-auth/RequireAuth';
import { LandingPage } from '../pages/landing/LandingPage';
import { AboutPage } from '../pages/about/AboutPage';
import { SensorsPage } from '../pages/sensors/SensorsPage';
import { ContactPage } from '../pages/contact/ContactPage';
import { PrivacyPage } from '../pages/privacy/PrivacyPage';
import { FaqPage } from '../pages/faq/FaqPage';
import { LoginPage } from '../pages/auth/login/LoginPage';
import { CadastroPage } from '../pages/auth/cadastro/CadastroPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { PacientePage } from '../pages/paciente/PacientePage';
import { ResponsavelPage } from '../pages/responsavel/ResponsavelPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { PerfilPage } from '../pages/perfil/PerfilPage';

/**
 * Marketing/institutional routes share MainLayout (header + footer).
 * Auth routes (login/cadastro) and the dashboards (admin/paciente/
 * responsavel) render standalone, without the site header/footer. Each
 * dashboard is guarded by RequireAuth (only its own account type enters).
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'sobre', element: <AboutPage /> },
      { path: 'sensores', element: <SensorsPage /> },
      { path: 'contato', element: <ContactPage /> },
      { path: 'privacidade', element: <PrivacyPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <CadastroPage /> },
  {
    path: '/perfil',
    element: (
      <RequireAuth>
        <PerfilPage />
      </RequireAuth>
    ),
  },
  {
    path: '/admin',
    element: (
      <RequireAuth perfil="ADMIN">
        <AdminPage />
      </RequireAuth>
    ),
  },
  {
    path: '/paciente',
    element: (
      <RequireAuth perfil="PACIENTE">
        <PacientePage />
      </RequireAuth>
    ),
  },
  {
    path: '/responsavel',
    element: (
      <RequireAuth perfil="RESPONSAVEL">
        <ResponsavelPage />
      </RequireAuth>
    ),
  },
];
