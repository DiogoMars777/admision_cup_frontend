import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div>
      <h3 className="mt-6 text-center text-xl font-bold text-gray-900 dark:text-white">
        Recuperar Contraseña
      </h3>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Ingresa tu correo para recibir un código de verificación.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
