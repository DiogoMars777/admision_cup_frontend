import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-2xl relative">
        <div className="flex justify-center -mt-14">
          <div className="bg-primary p-4 rounded-2xl shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <Outlet />

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2026 Sistema CUP - UAGRM. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
