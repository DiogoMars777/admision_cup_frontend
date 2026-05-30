import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido!</h2>
        <p className="text-sm text-gray-500 mt-1">Ingresa a tu sistema CUP UAGRM</p>
      </div>
      <LoginForm />
    </div>
  );
}
