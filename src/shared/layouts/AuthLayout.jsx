import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GraduationCap, Shield, FileText } from 'lucide-react';
import PublicPostulacionModal from '../components/PublicPostulacionModal';

export default function AuthLayout() {
  const [showPublicModal, setShowPublicModal] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0a4a8e 100%)'
      }}>
        {/* Botón flotante para el formulario público (Desktop, en panel izquierdo) */}
        <div className="absolute top-6 right-6 z-50">
          <button 
            onClick={() => setShowPublicModal(true)}
            className="flex flex-col items-center justify-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/20 hover:border-white/40 transition-all group"
            title="Formulario de Postulación"
          >
            <div className="bg-white/20 text-white p-2 rounded-full mb-1 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Formulario de</span>
            <span className="text-xs font-bold text-white tracking-wide">Postulación</span>
          </button>
        </div>

        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          {/* Logo */}
          <div className="mb-8 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-2xl">
            <GraduationCap className="h-16 w-16 text-white" />
          </div>

          <h1 className="text-4xl font-bold mb-3 text-center tracking-tight">
            Sistema CUP
          </h1>
          <p className="text-lg text-blue-200 mb-8 text-center max-w-md">
            Plataforma de Admisión y Gestión Académica
          </p>

          <div className="w-16 h-0.5 bg-blue-400/50 rounded mb-8" />

          {/* Características */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Acceso Seguro</p>
                <p className="text-xs text-blue-200/70">Protección y control de acceso por roles</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Gestión Académica</p>
                <p className="text-xs text-blue-200/70">Administración integral de procesos</p>
              </div>
            </div>
          </div>

          {/* Footer del panel */}
          <div className="absolute bottom-8 text-center">
            <p className="text-xs text-blue-300/50">
              Universidad Autónoma Gabriel René Moreno
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho con formulario */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-6 sm:p-8 relative">
        
        {/* Botón para mobile (cuando el panel izquierdo no se ve) */}
        <div className="lg:hidden absolute top-4 right-4 z-50">
          <button 
            onClick={() => setShowPublicModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-900">Postulación</span>
          </button>
        </div>

        <div className="w-full max-w-md">
          {/* Logo visible solo en mobile */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-4 rounded-2xl shadow-lg mb-4">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Sistema CUP</h1>
            <p className="text-xs text-gray-500">Admisión Universitaria</p>
          </div>

          {/* Card del formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-8">
            <Outlet />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} Sistema CUP — UAGRM. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Modal de Postulación Pública */}
      <PublicPostulacionModal 
        isOpen={showPublicModal} 
        onClose={() => setShowPublicModal(false)} 
      />
    </div>
  );
}
