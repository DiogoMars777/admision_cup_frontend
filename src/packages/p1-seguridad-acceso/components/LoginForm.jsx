import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, LogIn, Info } from 'lucide-react';
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
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded flex items-center text-sm text-red-700">
          <Info className="h-4 w-4 mr-2" />
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Usuario o Correo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('email', { required: 'El correo es obligatorio' })}
            type="email"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="admin o correo@ejemplo.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('password', { required: 'La contraseña es obligatoria' })}
            type={showPassword ? "text" : "password"}
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center">
          <input
            id="remember-me"
            {...register('remember')}
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
            Recordarme
          </label>
        </div>
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Recuperar contraseña
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 mt-2"
      >
        <LogIn className="h-4 w-4 mr-2" />
        {isSubmitting ? 'Ingresando...' : 'Ingresar al Sistema'}
      </button>

      <div className="mt-6 bg-emerald-50 rounded-lg p-4 border border-emerald-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-emerald-800">Credenciales por defecto:</h3>
            <div className="mt-2 text-sm text-emerald-700">
              <p><strong>Usuario:</strong> diogomars2020@gmail.com</p>
              <p><strong>Contraseña:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
