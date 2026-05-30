import { useState, useEffect } from 'react';
import { Plus, Search, Filter, CheckCircle, XCircle, AlertCircle, Trash, Settings } from 'lucide-react';
import { requisitoService } from '../services/requisitoService';
import { postulanteService } from '../services/postulanteService';

export default function RequisitosPage() {
  const [activeTab, setActiveTab] = useState('enlaces'); // 'enlaces' o 'catalogo'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos
  const [requisitos, setRequisitos] = useState([]);
  const [catalogo, setCatalogo] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Enlazar
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [postulantes, setPostulantes] = useState([]);
  const [linkData, setLinkData] = useState({ id_postulante: '', id_catalogo: '' });

  // Modal Crear Catálogo
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [catalogData, setCatalogData] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    fetchData();
  }, [searchTerm, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'enlaces') {
        const data = await requisitoService.getAll(searchTerm);
        setRequisitos(data);
      } else {
        const data = await requisitoService.getCatalogo();
        setCatalogo(data);
      }
    } catch (error) {
      console.error("Error al cargar datos", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Funciones Enlace ---
  const openLinkModal = async () => {
    try {
      const dataPostulantes = await postulanteService.getAll();
      const dataCatalogo = await requisitoService.getCatalogo();
      setPostulantes(dataPostulantes);
      setCatalogo(dataCatalogo);
      setLinkData({ id_postulante: '', id_catalogo: '' });
      setShowLinkModal(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleLink = async (e) => {
    e.preventDefault();
    try {
      await requisitoService.enlazar(linkData);
      setShowLinkModal(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error al enlazar");
    }
  };

  const changeStatus = async (id, nuevoEstado) => {
    try {
      await requisitoService.updateEstado(id, nuevoEstado);
      fetchData();
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  // --- Funciones Catálogo ---
  const handleCreateCatalog = async (e) => {
    e.preventDefault();
    try {
      await requisitoService.createCatalogo(catalogData);
      setShowCatalogModal(false);
      fetchData();
    } catch (error) {
      alert("Error al crear requisito base");
    }
  };

  const handleDeleteCatalog = async (id) => {
    if (window.confirm("¿Eliminar este requisito del catálogo base?")) {
      try {
        await requisitoService.deleteCatalogo(id);
        fetchData();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  const handleDeleteEnlace = async (id) => {
    if (window.confirm("¿Eliminar este registro del postulante?")) {
      try {
        await requisitoService.delete(id);
        fetchData();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  // Utilitarios visuales
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Validado': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Observado': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Validado': return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'Observado': return <XCircle className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Requisitos</h2>
          <p className="text-sm text-gray-500">Gestión del catálogo base y revisión de documentos por postulante.</p>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'enlaces' ? (
            <button onClick={openLinkModal} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors text-sm font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Asignar a Postulante
            </button>
          ) : (
            <button onClick={() => { setCatalogData({nombre: '', descripcion: ''}); setShowCatalogModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors text-sm font-medium">
              <Settings className="h-4 w-4 mr-2" />
              Crear Requisito Base
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('enlaces')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'enlaces' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Revisión por Postulante
        </button>
        <button 
          onClick={() => setActiveTab('catalogo')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'catalogo' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Catálogo Base (Tipos de Requisito)
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Buscador solo visible en la tab de enlaces para no complicar */}
        {activeTab === 'enlaces' && (
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por postulante o requisito..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando datos...</div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === 'enlaces' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4 font-medium">Postulante</th>
                    <th className="px-6 py-4 font-medium">Requisito (Documento)</th>
                    <th className="px-6 py-4 font-medium">Estado Actual</th>
                    <th className="px-6 py-4 font-medium text-right">Acciones de Revisión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requisitos.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800">{req.nombre_postulante}</p>
                        <p className="text-xs text-gray-500">CI: {req.ci_postulante}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800">{req.nombre}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{req.descripcion || 'Sin descripción'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.estado)}`}>
                          {getStatusIcon(req.estado)}
                          {req.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          {req.estado !== 'Validado' && (
                            <button onClick={() => changeStatus(req.id, 'Validado')} className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 rounded text-xs font-medium transition-colors">Validar</button>
                          )}
                          {req.estado !== 'Observado' && (
                            <button onClick={() => changeStatus(req.id, 'Observado')} className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded text-xs font-medium transition-colors">Observar</button>
                          )}
                          <button onClick={() => handleDeleteEnlace(req.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors ml-2" title="Quitar asignación">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {requisitos.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500 text-sm">
                        No hay requisitos registrados para ningún postulante.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4 font-medium">Nombre del Requisito Base</th>
                    <th className="px-6 py-4 font-medium">Descripción General</th>
                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {catalogo.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800">{cat.nombre}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-500">{cat.descripcion || 'Sin descripción'}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteCatalog(cat.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors ml-2" title="Eliminar del catálogo">
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {catalogo.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-500 text-sm">
                        El catálogo está vacío. Crea tipos de requisitos primero.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Modal Asignar al Postulante */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Asignar Requisito a Postulante</h3>
            <form onSubmit={handleLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postulante</label>
                <select 
                  required
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm"
                  value={linkData.id_postulante}
                  onChange={(e) => setLinkData({...linkData, id_postulante: e.target.value})}
                >
                  <option value="">Seleccione...</option>
                  {postulantes.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requisito a exigir</label>
                <select 
                  required
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm"
                  value={linkData.id_catalogo}
                  onChange={(e) => setLinkData({...linkData, id_catalogo: e.target.value})}
                >
                  <option value="">Seleccione del catálogo...</option>
                  {catalogo.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowLinkModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg">Asignar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Crear en Catálogo */}
      {showCatalogModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Crear Tipo de Requisito Base</h3>
            <form onSubmit={handleCreateCatalog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre (Ej: Título, Fotos)</label>
                <input 
                  required
                  type="text" 
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm"
                  value={catalogData.nombre}
                  onChange={(e) => setCatalogData({...catalogData, nombre: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea 
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm"
                  rows="2"
                  value={catalogData.descripcion}
                  onChange={(e) => setCatalogData({...catalogData, descripcion: e.target.value})}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowCatalogModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Crear Base</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
