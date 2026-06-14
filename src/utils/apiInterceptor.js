
import { toast } from 'react-hot-toast';

export const applyGlobalInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    (response) => {
      const method = response.config.method?.toLowerCase();
      if (['post', 'put', 'patch', 'delete'].includes(method)) {
        // Ignorar login/auth si es necesario
        if (!response.config.url.includes('/login') && !response.config.url.includes('/logout')) {
            const msg = response.data?.message || 'Operación completada exitosamente.';
            toast.success(msg);
        }
      }
      return response;
    },
    (error) => {
      let msg = error.response?.data?.message || error.response?.data?.error || 'Ocurrió un error inesperado en el servidor.';
      
      // Manejo específico para errores de validación de Laravel (422)
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        msg = errors[firstErrorKey][0]; // Toma el primer mensaje de error específico
      }

      // No mostrar error global si es error de login/credenciales para que el componente lo maneje
      if (error.config && !error.config.url.includes('/login')) {
          toast.error(msg);
      }
      return Promise.reject(error);
    }
  );
  return apiInstance;
};
