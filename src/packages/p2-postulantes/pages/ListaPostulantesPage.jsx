import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postulanteService } from '../services/postulanteService';

export default function ListaPostulantesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [postulantes, setPostulantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal para crear y editar
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  
  // Estado del formulario
  const [form, setForm] = useState({ 
    ci: '', nombre: '', email: '', fecha_nac: '', sexo: '', telefono: '', direccion: '', colegio: '' 
  });

  useEffect(() => {
    fetchPostulantes();
  }, [searchTerm]);

  const fetchPostulantes = async () => {
    try {
      const data = await postulanteService.getAll(searchTerm);
      setPostulantes(data);
    } catch (error) {
      console.error("Error al cargar postulantes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este postulante?")) {
      try {
        await postulanteService.delete(id);
        fetchPostulantes();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ci: '', nombre: '', email: '', fecha_nac: '', sexo: '', telefono: '', direccion: '', colegio: '' });
    setShowModal(true);
  };

  const openEdit = (postulante) => {
    setEditing(postulante);
    setForm({
      ci: postulante.ci || '',
      nombre: postulante.nombre,
      email: postulante.email || '',
      fecha_nac: postulante.fecha_nac || '',
      sexo: postulante.sexo || '',
      telefono: postulante.telefono || '',
      direccion: postulante.direccion || '',
      colegio: postulante.colegio || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await postulanteService.update(editing.id, form);
      } else {
        await postulanteService.create(form);
      }
      setShowModal(false);
      fetchPostulantes();
    } catch (error) {
      alert(error.response?.data?.message || "Error al procesar la solicitud");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Postulantes</h2>
          <p className="text-sm text-gray-500">Lista completa de estudiantes postulados al sistema.</p>
        </div>
        <button 
          onClick={openCreate}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Registrar Postulante
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o CI..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center text-gray-600 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando postulantes...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4 font-medium">Postulante</th>
                  <th className="px-6 py-4 font-medium">Documento</th>
                  <th className="px-6 py-4 font-medium">Contacto</th>
                  <th className="px-6 py-4 font-medium">Colegio</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {postulantes.map((postulante) => (
                  <tr key={postulante.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-800">{postulante.nombre}</p>
                      <p className="text-xs text-gray-500">{postulante.sexo === 'M' ? 'Masculino' : postulante.sexo === 'F' ? 'Femenino' : 'N/E'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {postulante.ci}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {postulante.telefono || 'Sin teléfono'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {postulante.colegio || 'No especificado'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => navigate('/p2/requisitos')} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Ver Requisitos">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(postulante)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Editar">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(postulante.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Eliminar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {postulantes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                      No se encontraron postulantes registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Crear / Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{editing ? 'Editar Postulante' : 'Registrar Nuevo Postulante'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carnet de Identidad (CI)</label>
                  <input required disabled={!!editing} className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm disabled:bg-gray-100" placeholder="Ej. 12345678" value={form.ci} onChange={e => setForm({...form, ci: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input required className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" placeholder="Nombres y Apellidos" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                </div>
              </div>

              {!editing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico (Para creación de cuenta auto)</label>
                  <input required type="email" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" placeholder="ejemplo@correo.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                  <input type="date" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={form.fecha_nac} onChange={e => setForm({...form, fecha_nac: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                  <select className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={form.sexo} onChange={e => setForm({...form, sexo: e.target.value})}>
                    <option value="">Seleccione...</option><option value="M">Masculino</option><option value="F">Femenino</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" placeholder="Ej. 70000000" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colegio de Egreso</label>
                  <input className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" placeholder="Nombre del Colegio" value={form.colegio} onChange={e => setForm({...form, colegio: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Domicilio</label>
                  <input className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" placeholder="Barrio, Calle, Número" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg">{editing ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
