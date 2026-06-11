import { useState } from 'react';
import { FileText, CreditCard, BookOpen, Clock, Award, User, Calendar } from 'lucide-react';

export default function InicioPostulantePage() {
  // Mock Data
  const materias = [
    { id: 1, nombre: 'Matemáticas', docente: 'Prof. García', nota: 85 },
    { id: 2, nombre: 'Física', docente: 'Prof. Martínez', nota: 78 },
    { id: 3, nombre: 'Química', docente: 'Prof. López', nota: 92 },
  ];

  const asignacion = {
    carrera: 'Ingeniería de Sistemas',
    grupo: 'Grupo A - Turno Mañana',
    aula: 'Edificio Central - Aula 101',
    horario: 'Lunes a Viernes - 08:00 a 14:00',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        
        {/* Mis Materias */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Mis Materias</h3>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-semibold">Materia</th>
                  <th className="pb-3 font-semibold">Docente</th>
                  <th className="pb-3 font-semibold">Nota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {materias.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-sm font-medium text-gray-800">{m.nombre}</td>
                    <td className="py-4 text-sm text-gray-600">{m.docente}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800 text-sm w-6">{m.nota}</span>
                        <div className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-800 rounded-full" 
                            style={{ width: `${m.nota}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Información de Asignación */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Información de Asignación</h3>
          
          <div className="space-y-6 flex-1">
            <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Carrera Asignada</p>
              <p className="text-sm text-gray-500">{asignacion.carrera}</p>
            </div>
            
            <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Grupo</p>
              <p className="text-sm text-gray-500">{asignacion.grupo}</p>
            </div>
            
            <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Aula</p>
              <p className="text-sm text-gray-500">{asignacion.aula}</p>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Horario</p>
              <p className="text-sm text-gray-500">{asignacion.horario}</p>
            </div>
          </div>

          <button className="mt-8 w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl shadow-sm text-sm font-semibold transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            Ver Horario Completo
          </button>
        </div>

      </div>
    </div>
  );
}
