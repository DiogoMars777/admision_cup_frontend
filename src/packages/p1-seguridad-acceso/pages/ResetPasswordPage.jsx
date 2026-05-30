import ResetPasswordForm from '../components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div>
      <h3 className="mt-6 text-center text-xl font-bold text-gray-900 dark:text-white">
        Nueva Contraseña
      </h3>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Establece tu nueva contraseña de acceso.
      </p>
      <ResetPasswordForm />
    </div>
  );
}
