import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../../shared/layouts/AuthLayout';
import DashboardLayout from '../../shared/layouts/DashboardLayout';

// P1
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const VerifyCodePage = lazy(() => import('./pages/VerifyCodePage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'));
const BitacoraPage = lazy(() => import('./pages/BitacoraPage'));
const RolesPage = lazy(() => import('./pages/RolesPage'));

// P2
const ListaPostulantesPage = lazy(() => import('../p2-postulantes/pages/ListaPostulantesPage'));
const PostulanteDocentePage = lazy(() => import('../p2-postulantes/pages/PostulanteDocentePage'));
const RequisitosPage = lazy(() => import('../p2-postulantes/pages/RequisitosPage'));
const DocumentosPage = lazy(() => import('../p2-postulantes/pages/DocumentosPage'));
const PagosPage = lazy(() => import('../p2-postulantes/pages/PagosPage'));
const InicioPostulantePage = lazy(() => import('../p2-postulantes/pages/InicioPostulantePage'));

// P3
const MateriasPage = lazy(() => import('../p3-academico/pages/MateriasPage'));
const DocentesPage = lazy(() => import('../p3-academico/pages/DocentesPage'));
const GruposPage = lazy(() => import('../p3-academico/pages/GruposPage'));
const AulasPage = lazy(() => import('../p3-academico/pages/AulasPage'));
const InicioDocentePage = lazy(() => import('../p3-academico/pages/InicioDocentePage'));

export default function SeguridadAccesoRoutes() {
  const LoadingFallback = () => (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-2 text-sm text-gray-500 font-medium">Cargando módulo...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* P1 */}
          <Route path="/p1/usuarios" element={<UsuariosPage />} />
          <Route path="/p1/roles" element={<RolesPage />} />
          <Route path="/p1/bitacora" element={<BitacoraPage />} />
          {/* P2 */}
          <Route path="/p2/postulantes" element={<ListaPostulantesPage />} />
          <Route path="/p2/postulante-docente" element={<PostulanteDocentePage />} />
          <Route path="/p2/requisitos" element={<RequisitosPage />} />
          <Route path="/p2/documentos" element={<DocumentosPage />} />
          <Route path="/p2/pagos" element={<PagosPage />} />
          {/* P3 */}
          <Route path="/p3/materias" element={<MateriasPage />} />
          <Route path="/p3/docentes" element={<DocentesPage />} />
          <Route path="/p3/grupos" element={<GruposPage />} />
          <Route path="/p3/aulas" element={<AulasPage />} />
          <Route path="/docente/dashboard" element={<InicioDocentePage />} />
          <Route path="/postulante/dashboard" element={<InicioPostulantePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
