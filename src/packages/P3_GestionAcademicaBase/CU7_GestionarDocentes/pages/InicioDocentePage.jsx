import { useState } from 'react';
import { Users, UserCheck, UserX, Calendar, Clock, BookOpen, MapPin } from 'lucide-react';

export default function InicioDocentePage() {
  const [selectedGroup, setSelectedGroup] = useState('Grupo A');

  // Mock Data
  const stats = {
    total: 83,
    aprobados: 72,
    aprobadosPerc: 86.7,
    reprobados: 11,
    reprobadosPerc: 13.3,
    asistencia: 91,
  };

  const grupos = [
    { id: 'Grupo A', nombre: 'Grupo A - Matemáticas', estudiantes: 28, horario: 'Lun-Mier 08:00-10:00', aula: 'Aula 101' },
    { id: 'Grupo B', nombre: 'Grupo B - Física', estudiantes: 25, horario: 'Mar-Jue 10:00-12:00', aula: 'Aula 203' },
    { id: 'Grupo C', nombre: 'Grupo C - Química', estudiantes: 30, horario: 'Vie 14:00-18:00', aula: 'Lab 1' },
  ];

  const estudiantes = [
    { id: 1, nombre: 'Juan Pérez', nota: 85, asistencia: 95, estado: 'Aprobado' },
    { id: 2, nombre: 'María González', nota: 78, asistencia: 90, estado: 'Aprobado' },
    { id: 3, nombre: 'Carlos Ruiz', nota: 92, asistencia: 100, estado: 'Aprobado' },
    { id: 4, nombre: 'Ana Torres', nota: 65, asistencia: 85, estado: 'Pendiente' },
    { id: 5, nombre: 'Luis Morales', nota: 45, asistencia: 70, estado: 'Reprobado' },
  ];

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return <span className="bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-bold">Aprobado</span>;
      case 'Reprobado':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold">Reprobado</span>;
      default:
        return <span className="text-gray-400 text-xs font-medium">--</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Panel Docente</h2>
        <p className="text-gray-500 mt-1">Gestiona tus grupos y estudiantes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Estudiantes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center transition-transform hover:-translate-y-1">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Estudiantes</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</p>
          </div>
          <div className="w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-200">
            <Users className="w-7 h-7" />
          </div>
        </div>

        {/* Aprobados */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center transition-transform hover:-translate-y-1">
          <div>
            <p className="text-sm font-medium text-gray-500">Aprobados</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-4xl font-bold text-gray-800">{stats.aprobados}</p>
              <p className="text-sm font-semibold text-emerald-500">{stats.aprobadosPerc}%</p>
            </div>
          </div>
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-200">
            <UserCheck className="w-7 h-7" />
          </div>
        </div>

        {/* Reprobados */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center transition-transform hover:-translate-y-1">
          <div>
            <p className="text-sm font-medium text-gray-500">Reprobados</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-4xl font-bold text-gray-800">{stats.reprobados}</p>
              <p className="text-sm font-semibold text-red-500">{stats.reprobadosPerc}%</p>
            </div>
          </div>
          <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-red-200">
            <UserX className="w-7 h-7" />
          </div>
        </div>

        {/* Asistencia */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center transition-transform hover:-translate-y-1">
          <div>
            <p className="text-sm font-medium text-gray-500">Asistencia Promedio</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">{stats.asistencia}%</p>
          </div>
          <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-purple-200">
            <Calendar className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Mis Grupos Asignados */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Mis Grupos Asignados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grupos.map((grupo) => (
            <div 
              key={grupo.id} 
              onClick={() => setSelectedGroup(grupo.id)}
              className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer ${selectedGroup === grupo.id ? 'border-blue-800 shadow-md transform -translate-y-1' : 'border-transparent shadow-sm hover:border-blue-100'}`}
            >
              <h4 className="text-lg font-bold text-gray-800 mb-4">{grupo.nombre}</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  {grupo.estudiantes} estudiantes
                </div>
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <Clock className="w-4 h-4 mr-3 text-gray-400" />
                  {grupo.horario}
                </div>
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  {grupo.aula}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estudiantes Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Estudiantes - {selectedGroup}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Estudiante</th>
                <th className="px-6 py-4 font-semibold">Nota Final</th>
                <th className="px-6 py-4 font-semibold">Asistencia</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {estudiantes.map((est) => (
                <tr key={est.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{est.nombre}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-700 w-6">{est.nota}</span>
                      <div className="w-32 h-2.5 bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-800 rounded-full" 
                          style={{ width: `${est.nota}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{est.asistencia}%</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(est.estado)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Horario Semanal */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Horario Semanal</h3>
        <div className="grid grid-cols-5 gap-4">
          {/* Lunes */}
          <div>
            <div className="bg-gray-50 text-center py-2 rounded-t-lg font-bold text-sm text-gray-700 mb-3 border-b-2 border-gray-200">
              Lunes
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <p className="font-bold text-gray-800 text-sm">08:00-10:00</p>
              <p className="text-xs text-gray-500 mt-1">Grupo A</p>
            </div>
          </div>
          {/* Martes */}
          <div>
            <div className="bg-gray-50 text-center py-2 rounded-t-lg font-bold text-sm text-gray-700 mb-3 border-b-2 border-gray-200">
              Martes
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <p className="font-bold text-gray-800 text-sm">10:00-12:00</p>
              <p className="text-xs text-gray-500 mt-1">Grupo B</p>
            </div>
          </div>
          {/* Miércoles */}
          <div>
            <div className="bg-gray-50 text-center py-2 rounded-t-lg font-bold text-sm text-gray-700 mb-3 border-b-2 border-gray-200">
              Miércoles
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <p className="font-bold text-gray-800 text-sm">08:00-10:00</p>
              <p className="text-xs text-gray-500 mt-1">Grupo A</p>
            </div>
          </div>
          {/* Jueves */}
          <div>
            <div className="bg-gray-50 text-center py-2 rounded-t-lg font-bold text-sm text-gray-700 mb-3 border-b-2 border-gray-200">
              Jueves
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <p className="font-bold text-gray-800 text-sm">10:00-12:00</p>
              <p className="text-xs text-gray-500 mt-1">Grupo B</p>
            </div>
          </div>
          {/* Viernes */}
          <div>
            <div className="bg-gray-50 text-center py-2 rounded-t-lg font-bold text-sm text-gray-700 mb-3 border-b-2 border-gray-200">
              Viernes
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <p className="font-bold text-gray-800 text-sm">14:00-18:00</p>
              <p className="text-xs text-gray-500 mt-1">Grupo C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
