import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Filter, Eye, ChevronRight, ArrowLeft, BookOpen, CheckCircle, FileText, Upload, UserPlus, Info, Pencil, Lock } from 'lucide-react';
import { aspiranteDocenteService } from '../services/aspiranteDocenteService';
import { materiaService } from '../../p3-academico/services/materiaService';

export default function PostulanteDocentePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [aspirantes, setAspirantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAspirante, setSelectedAspirante] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [requisitos, setRequisitos] = useState([]);
  const [editMode, setEditMode] = useState(false); // controla si los checkboxes están bloqueados
  
  // Modals
  const [showNuevaPostulacion, setShowNuevaPostulacion] = useState(false);
  const [showNuevoAspirante, setShowNuevoAspirante] = useState(false);
  
  // Catalogs
  const [catalogoMaterias, setCatalogoMaterias] = useState([]);

  // Form states
  const [materiaASeleccionar, setMateriaASeleccionar] = useState('');
  const [formAspirante, setFormAspirante] = useState({ ci: '', nombre: '', email: '', telefono: '', sexo: 'M', grado_academico: '', experiencia: 0 });

  useEffect(() => {
    fetchAspirantes();
    fetchCatalogoMaterias();
  }, [searchTerm]);

  const fetchAspirantes = async () => {
    try {
      setLoading(true);
      const data = await aspiranteDocenteService.getAll(searchTerm);
      setAspirantes(data);
    } catch (error) {
      console.error("Error fetching aspirantes", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogoMaterias = async () => {
    try {
      const response = await materiaService.getAll();
      setCatalogoMaterias(response);
    } catch (error) {
      console.error("Error fetching materias catalog", error);
    }
  };

  const loadMaterias = async (idAspirante) => {
    try {
      const data = await aspiranteDocenteService.getMaterias(idAspirante);
      setMaterias(data);
      setSelectedMateria(null);
      setRequisitos([]);
    } catch (error) {
      console.error("Error fetching materias", error);
    }
  };

  const handleSelectAspirante = async (aspirante) => {
    setSelectedAspirante(aspirante);
    await loadMaterias(aspirante.id);
  };

  const handleSelectMateria = async (materia) => {
    setSelectedMateria(materia);
    setEditMode(false); // reset modo edición al cambiar materia
    try {
      const data = await aspiranteDocenteService.getRequisitosMateria(selectedAspirante.id, materia.id_materia);
      setRequisitos(data);
    } catch (error) {
      console.error("Error fetching requisitos", error);
    }
  };

  const handleToggleRequisito = useCallback(async (reqId, currentVal) => {
    const newVal = !currentVal;
    // Actualización OPTIMISTA: aplica el cambio en local inmediatamente
    setRequisitos(prev => prev.map(r =>
      r.id_materia_requisito === reqId
        ? { ...r, cumplido: newVal, estado: newVal ? 'Cumplido' : 'Pendiente' }
        : r
    ));

    // Sincroniza con el servidor en segundo plano
    try {
      await aspiranteDocenteService.toggleRequisito({
        id_aspirante: selectedAspirante.id,
        id_materia_requisito: reqId,
        cumplido: newVal
      });
      // Actualiza materias y aspirantes en paralelo sin bloquear la UI
      Promise.all([
        aspiranteDocenteService.getMaterias(selectedAspirante.id).then(setMaterias),
        aspiranteDocenteService.getAll(searchTerm).then(setAspirantes)
      ]);
    } catch (error) {
      // Si falla, revierte el cambio
      setRequisitos(prev => prev.map(r =>
        r.id_materia_requisito === reqId
          ? { ...r, cumplido: currentVal, estado: currentVal ? 'Cumplido' : 'Pendiente' }
          : r
      ));
      console.error("Error toggling req", error);
    }
  }, [selectedAspirante, selectedMateria, searchTerm]);

  const handlePostularMateria = async (e) => {
    e.preventDefault();
    if (!materiaASeleccionar) return;
    try {
      await aspiranteDocenteService.postularMateria({
        id_aspirante: selectedAspirante.id,
        id_materia: materiaASeleccionar
      });
      setShowNuevaPostulacion(false);
      setMateriaASeleccionar('');
      await loadMaterias(selectedAspirante.id);
      fetchAspirantes();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al postular');
    }
  };

  const handleCreateAspirante = async (e) => {
    e.preventDefault();
    try {
      await aspiranteDocenteService.create(formAspirante);
      setShowNuevoAspirante(false);
      setFormAspirante({ ci: '', nombre: '', email: '', telefono: '', sexo: 'M', grado_academico: '', experiencia: 0 });
      fetchAspirantes();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al crear');
    }
  };

  const handleConvertirDocente = async () => {
    if(window.confirm('¿Desea aprobar y convertir a este aspirante en Docente oficial? Se le enviarán sus credenciales por correo.')) {
      try {
        await aspiranteDocenteService.convertirADocente(selectedAspirante.id);
        alert('¡Postulación exitosa! El aspirante ahora es Docente oficial.');
        setSelectedAspirante(null);
        fetchAspirantes();
      } catch (error) {
        alert(error.response?.data?.message || 'Error al convertir');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'activo':
      case 'aprobada':
      case 'cumplido':
      case 'docente oficial':
        return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap">Activo</span>;
      case 'en revisión':
      case 'en preparación':
      case 'pendiente':
        return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap">{status}</span>;
      case 'inactivo':
        return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap">Inactivo</span>;
      default:
        return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap">{status || 'Activo'}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Postulantes Docentes</h2>
          <p className="text-sm text-gray-500">Gestiona a los usuarios registrados como aspirantes a docente.</p>
        </div>
        <button 
          onClick={() => setShowNuevoAspirante(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Aspirante
        </button>
      </div>

      {!selectedAspirante ? (
        // LIST VIEW
        <div className="flex gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o documento..."
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
              <div className="p-8 text-center text-gray-500">Cargando aspirantes...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="px-6 py-4 font-medium">Aspirante</th>
                      <th className="px-6 py-4 font-medium">Documento</th>
                      <th className="px-6 py-4 font-medium text-center">Materias</th>
                      <th className="px-6 py-4 font-medium">Estado</th>
                      <th className="px-6 py-4 font-medium text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {aspirantes.map((aspirante) => (
                      <tr key={aspirante.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                            {aspirante.nombre.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{aspirante.nombre}</p>
                            <p className="text-xs text-gray-500">{aspirante.email || 'sin@email.com'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                          {aspirante.ci}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-blue-600 font-medium bg-blue-50/30">
                          {aspirante.cantidad_materias} materias
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(aspirante.estado)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleSelectAspirante(aspirante)} 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                            title="Ver detalle"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {aspirantes.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                          No se encontraron aspirantes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        // DETAIL VIEW
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <button 
            onClick={() => setSelectedAspirante(null)}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a la lista
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-2xl">
                {selectedAspirante.nombre.substring(0,2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-gray-800">{selectedAspirante.nombre}</h3>
                  {getStatusBadge(selectedAspirante.estado)}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500">
                  <span className="flex items-center"><FileText className="h-4 w-4 mr-1 text-gray-400"/> {selectedAspirante.ci}</span>
                  <span className="flex items-center"><UserPlus className="h-4 w-4 mr-1 text-gray-400"/> {selectedAspirante.email || 'sin@email.com'}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center min-w-[150px]">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Resumen</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-gray-800">{materias.length}</span>
                <span className="text-sm text-gray-500">materias postuladas</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-6 pt-4 flex gap-6">
              <button className="pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600">Materias postuladas</button>
              <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">Información personal</button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-gray-800">Materias a las que está postulando</h4>
                  <p className="text-sm text-gray-500">Listado de materias en las que el aspirante se ha postulado.</p>
                </div>
                <button 
                  onClick={() => setShowNuevaPostulacion(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" /> Nueva Postulación
                </button>
              </div>

              <div className="space-y-3 mb-8">
                {materias.map(materia => (
                  <div 
                    key={materia.id_postulacion}
                    onClick={() => handleSelectMateria(materia)}
                    className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                      selectedMateria?.id_postulacion === materia.id_postulacion 
                        ? 'border-blue-400 bg-blue-50/30 shadow-sm' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        materia.estado === 'Aprobada' ? 'bg-emerald-100 text-emerald-600' : 
                        materia.estado === 'En revisión' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800">{materia.nombre}</h5>
                        <div className="flex items-center text-xs text-gray-500 gap-2 mt-1">
                          <span>Código: MAT-{materia.id_materia}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>Modalidad: Presencial</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        {getStatusBadge(materia.estado)}
                        <p className="text-xs text-gray-500 mt-1">Postulado: {new Date(materia.fecha_postulacion).toLocaleDateString()}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
                {materias.length === 0 && (
                  <div className="text-center py-6 text-gray-500 text-sm border border-dashed rounded-xl bg-gray-50">
                    Aún no tiene materias postuladas.
                  </div>
                )}
              </div>

              {selectedMateria && (() => {
                const todosObligatoriosCumplidos = requisitos.length > 0 &&
                  requisitos.filter(r => r.obligatorio).every(r => r.cumplido);
                const bloqueado = todosObligatoriosCumplidos && !editMode;

                return (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">Requisitos de: {selectedMateria.nombre}</h4>
                        <p className="text-sm text-gray-500">Revisa los requisitos solicitados para esta materia y cumple con cada uno.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {bloqueado && (
                          <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg hover:bg-amber-100 text-sm font-semibold transition-colors"
                          >
                            <Pencil className="h-4 w-4 mr-2" /> Editar
                          </button>
                        )}
                        <button className="flex items-center text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors">
                          <FileText className="h-4 w-4 mr-2" /> Ver documentos
                        </button>
                      </div>
                    </div>

                    {bloqueado && (
                      <div className="mb-3 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
                        <Lock className="h-4 w-4 flex-shrink-0" />
                        <p>Todos los requisitos obligatorios están cumplidos. Haz clic en <b>Editar</b> para modificarlos.</p>
                      </div>
                    )}

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                            <th className="px-6 py-3 font-medium">Requisito</th>
                            <th className="px-6 py-3 font-medium">Descripción</th>
                            <th className="px-6 py-3 font-medium text-center">Obligatorio</th>
                            <th className="px-6 py-3 font-medium text-center">Cumplido</th>
                            <th className="px-6 py-3 font-medium">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {requisitos.map(req => (
                            <tr key={req.id_materia_requisito} className={`transition-colors ${bloqueado ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}>
                              <td className="px-6 py-4 font-semibold text-sm text-gray-800">{req.requisito_nombre}</td>
                              <td className="px-6 py-4 text-xs text-gray-500">{req.descripcion}</td>
                              <td className="px-6 py-4 text-center">
                                {req.obligatorio
                                  ? <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">Sí</span>
                                  : <span className="text-gray-400 text-xs font-medium">No</span>}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {bloqueado ? (
                                  <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
                                ) : (
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                    checked={!!req.cumplido}
                                    onChange={() => handleToggleRequisito(req.id_materia_requisito, req.cumplido)}
                                  />
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {req.cumplido ? (
                                  <span className="flex items-center text-xs font-semibold text-emerald-600">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Cumplido
                                  </span>
                                ) : (
                                  <span className="flex items-center text-xs font-semibold text-orange-500">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5"></div> Pendiente
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                          {requisitos.length === 0 && (
                            <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Esta materia no tiene requisitos específicos asignados.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {!bloqueado && (
                      <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                        <Info className="h-4 w-4 flex-shrink-0" />
                        <p>Debes cumplir todos los requisitos obligatorios (marcados con <b>"Sí"</b>) para que tu postulación pueda ser aprobada.</p>
                      </div>
                    )}
                  </div>
                );
              })()}
              
              {/* Botón de Aprobación Global del Aspirante */}
              {materias.length > 0 && materias.every(m => m.estado === 'Aprobada') && selectedAspirante.estado !== 'Docente Oficial' && (
                <div className="mt-8 border border-emerald-200 bg-emerald-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600" /> ¡Postulación Completa!
                    </h4>
                    <p className="text-sm text-emerald-800 mt-1">
                      El aspirante cumple todos los requisitos obligatorios de sus materias postuladas, puede ser aprobado y convertido en docente.
                    </p>
                  </div>
                  <button 
                    onClick={handleConvertirDocente}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md font-bold whitespace-nowrap transition-colors"
                  >
                    Aprobar y Convertir a Docente
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Modal Nueva Postulación */}
      {showNuevaPostulacion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Nueva Postulación</h3>
              <button onClick={() => setShowNuevaPostulacion(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            <form onSubmit={handlePostularMateria} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Materia</label>
                <select 
                  required
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm focus:ring-primary focus:border-primary"
                  value={materiaASeleccionar}
                  onChange={e => setMateriaASeleccionar(e.target.value)}
                >
                  <option value="">Selecciona una materia...</option>
                  {catalogoMaterias.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Al confirmar tu postulación, se registrará tu solicitud para esta materia y podrás comenzar a cumplir los requisitos.
                </p>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNuevaPostulacion(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nuevo Aspirante */}
      {showNuevoAspirante && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Registrar Nuevo Aspirante a Docente</h3>
              <button onClick={() => setShowNuevoAspirante(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateAspirante} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Carnet de Identidad</label>
                  <input required type="text" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.ci} onChange={e => setFormAspirante({...formAspirante, ci: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Sexo</label>
                  <select className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.sexo} onChange={e => setFormAspirante({...formAspirante, sexo: e.target.value})}>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                <input required type="text" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.nombre} onChange={e => setFormAspirante({...formAspirante, nombre: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                  <input required type="email" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.email} onChange={e => setFormAspirante({...formAspirante, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.telefono} onChange={e => setFormAspirante({...formAspirante, telefono: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Grado Académico</label>
                  <select required className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.grado_academico} onChange={e => setFormAspirante({...formAspirante, grado_academico: e.target.value})}>
                    <option value="">Seleccionar...</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Técnico Superior">Técnico Superior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Experiencia (años)</label>
                  <input required type="number" min="0" className="w-full border-gray-300 rounded-lg px-3 py-2 border sm:text-sm" value={formAspirante.experiencia} onChange={e => setFormAspirante({...formAspirante, experiencia: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNuevoAspirante(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Guardar Aspirante</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
