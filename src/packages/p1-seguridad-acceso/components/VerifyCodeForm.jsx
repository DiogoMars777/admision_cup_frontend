import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

export default function VerifyCodeForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      await authService.verifyCode({ ...data, email });
      navigate('/reset-password', { state: { email, code: data.code } });
    } catch (error) {
      console.error(error);
      alert('Código inválido');
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="code" className="sr-only">Código de 6 dígitos</label>
        <input
          {...register('code', { required: 'El código es obligatorio', minLength: 6, maxLength: 6 })}
          type="text"
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm text-center tracking-widest text-lg"
          placeholder="000000"
        />
        {errors.code && <p className="text-red-500 text-xs mt-1 text-center">{errors.code.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Verificando...' : 'Verificar Código'}
        </button>
      </div>
    </form>
  );
}
