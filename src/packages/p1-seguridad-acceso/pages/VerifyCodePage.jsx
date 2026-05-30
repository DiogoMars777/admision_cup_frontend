import VerifyCodeForm from '../components/VerifyCodeForm';

export default function VerifyCodePage() {
  return (
    <div>
      <h3 className="mt-6 text-center text-xl font-bold text-gray-900 dark:text-white">
        Verificar Código
      </h3>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Ingresa el código de 6 dígitos que enviamos a tu correo.
      </p>
      <VerifyCodeForm />
    </div>
  );
}
