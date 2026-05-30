import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authService.forgotPassword(data);
      navigate('/verify-code', { state: { email: data.email } });
    } catch (error) {
      console.error(error);
      alert('Error al procesar solicitud');
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <input
          {...register('email', { required: 'El correo es obligatorio' })}
          type="email"
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
          placeholder="Ej: tu-correo@gmail.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Código'}
        </button>
      </div>
      <div className="text-center mt-4 text-sm">
          <Link to="/" className="font-medium text-primary hover:text-primary-dark">
            Volver al Login
          </Link>
        </div>
    </form>
  );
}
