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

export const bitacoraService = {
  getAll: async (params) => {
    const res = await api.get('/bitacora', { params });
    return res.data;
  },
  getStats: async () => {
    const res = await api.get('/bitacora/stats');
    return res.data;
  }
};
