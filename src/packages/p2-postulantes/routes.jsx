import { Routes, Route } from 'react-router-dom';
import ListaPostulantesPage from './pages/ListaPostulantesPage';
import RegistrarPostulantePage from './pages/RegistrarPostulantePage';
import RequisitosPage from './pages/RequisitosPage';

export default function PostulantesRoutes() {
  return (
    <Routes>
      <Route path="/postulantes" element={<ListaPostulantesPage />} />
      <Route path="/postulantes/nuevo" element={<RegistrarPostulantePage />} />
      <Route path="/requisitos" element={<RequisitosPage />} />
    </Routes>
  );
}
