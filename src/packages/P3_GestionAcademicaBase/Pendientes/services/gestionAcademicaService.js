import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000/api', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
api.interceptors.request.use((c) => { const t = localStorage.getItem('token'); if (t) c.headers.Authorization = `Bearer ${t}`; return c; });

const gestionAcademicaService = {
  getAll: async (search = '') => {
    const response = await api.get(`/gestiones-academicas${search ? `?search=${search}` : ''}`);
    return response.data;
  },

  getCups: async () => {
    const response = await api.get('/gestiones-academicas/cups');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/gestiones-academicas', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/gestiones-academicas/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/gestiones-academicas/${id}`);
    return response.data;
  },

  getEvaluaciones: async (id) => {
    const response = await api.get(`/gestiones-academicas/${id}/evaluaciones`);
    return response.data;
  },

  updateEvaluacion: async (id, data) => {
    const response = await api.put(`/gestiones-academicas/${id}/evaluaciones`, data);
    return response.data;
  }
};

export default gestionAcademicaService;
