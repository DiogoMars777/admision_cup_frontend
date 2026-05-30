import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Save, User, MapPin, GraduationCap, ArrowLeft, CheckCircle } from 'lucide-react';
import { postulanteService } from '../services/postulanteService';

export default function RegistrarPostulantePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    setErrorMsg('');
    setSuccess(false);
    try {
      await postulanteService.create(data);
      setSuccess(true);
      reset(); // Limpiar el formulario
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al registrar postulante');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/p2/postulantes')}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registrar Nuevo Postulante</h2>
          <p className="text-sm text-gray-500">Completa la información personal y académica del estudiante.</p>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg flex items-center text-emerald-700">
          <CheckCircle className="h-5 w-5 mr-3" />
          ¡Postulante registrado con éxito en la base de datos!
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Sección: Datos Personales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-semibold text-gray-800">Datos Personales</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carnet de Identidad (CI)</label>
              <input 
                {...register('ci', { required: 'El CI es obligatorio' })}
                type="text" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
                placeholder="Ej. 12345678"
              />
              {errors.ci && <p className="text-red-500 text-xs mt-1">{errors.ci.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input 
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                type="text" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
                placeholder="Nombres y Apellidos"
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
              <input 
                {...register('fecha_nac')}
                type="date" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
              <select 
                {...register('sexo')}
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
              >
                <option value="">Seleccione...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input 
                {...register('telefono')}
                type="text" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
                placeholder="Ej. 70000000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico (Para creación de cuenta)</label>
              <input 
                {...register('email', { required: 'El correo es obligatorio para crear su cuenta' })}
                type="email" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Sección: Ubicación y Origen */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-semibold text-gray-800">Ubicación y Educación</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Domicilio</label>
              <input 
                {...register('direccion')}
                type="text" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
                placeholder="Barrio, Calle, Número"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colegio de Egreso</label>
              <input 
                {...register('colegio')}
                type="text" 
                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 border sm:text-sm"
                placeholder="Nombre de la Unidad Educativa"
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end space-x-3">
          <button 
            type="button"
            onClick={() => navigate('/p2/postulantes')}
            className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm flex items-center disabled:opacity-70"
          >
            <Save className="h-5 w-5 mr-2" />
            {isSubmitting ? 'Guardando...' : 'Guardar Postulante'}
          </button>
        </div>

      </form>
    </div>
  );
}
