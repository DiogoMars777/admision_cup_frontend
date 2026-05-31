import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    setErrorMsg('');
    try {
      await authService.login(data);
      navigate('/dashboard');
    } catch (error) {
      setErrorMsg('Credenciales incorrectas o usuario inactivo.');
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Error de autenticación</p>
            <p className="text-xs text-red-600 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Campo Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Correo electrónico
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail className="h-4.5 w-4.5 text-gray-400" />
          </div>
          <input
            id="email"
            {...register('email', { required: 'El correo es obligatorio' })}
            type="email"
            className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            placeholder="usuario@correo.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email.message}</p>}
      </div>

      {/* Campo Contraseña */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-4.5 w-4.5 text-gray-400" />
          </div>
          <input
            id="password"
            {...register('password', { required: 'La contraseña es obligatoria' })}
            type={showPassword ? "text" : "password"}
            className="block w-full pl-11 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.password.message}</p>}
      </div>

      {/* Recordarme + Recuperar */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            {...register('remember')}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30 cursor-pointer"
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Recordarme</span>
        </label>
        <Link 
          to="/forgot-password" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {/* Botón Ingresar */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: isSubmitting 
            ? '#64748b' 
            : 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0a4a8e 100%)',
        }}
        onMouseEnter={(e) => { if (!isSubmitting) e.target.style.opacity = '0.9'; }}
        onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Ingresando...
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4 mr-2" />
            Ingresar al Sistema
          </>
        )}
      </button>

      {/* Credenciales de prueba */}
      <div className="mt-4 bg-blue-50/60 rounded-xl p-4 border border-blue-100">
        <p className="text-xs font-semibold text-blue-800 mb-2">Credenciales de prueba:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
          <div>
            <span className="text-blue-500 font-medium">Usuario:</span>
            <p className="font-mono text-blue-800">diogomars2020@gmail.com</p>
          </div>
          <div>
            <span className="text-blue-500 font-medium">Contraseña:</span>
            <p className="font-mono text-blue-800">admin123</p>
          </div>
        </div>
      </div>
    </form>
  );
}
