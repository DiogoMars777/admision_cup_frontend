import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const aspiranteDocenteService = {
  getAll: async (search = '') => {
    const response = await api.get(`/aspirantes-docentes?search=${search}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/aspirantes-docentes', data);
    return response.data;
  },

  getMaterias: async (id) => {
    const response = await api.get(`/aspirantes-docentes/${id}/materias`);
    return response.data;
  },

  getRequisitosMateria: async (id, idMateria) => {
    const response = await api.get(`/aspirantes-docentes/${id}/materias/${idMateria}/requisitos`);
    return response.data;
  },

  toggleRequisito: async (data) => {
    const response = await api.post('/aspirantes-docentes/requisito/toggle', data);
    return response.data;
  },

  postularMateria: async (data) => {
    const response = await api.post('/aspirantes-docentes/postular', data);
    return response.data;
  },

  convertirADocente: async (id) => {
    const response = await api.post(`/aspirantes-docentes/${id}/convertir`);
    return response.data;
  }
};
