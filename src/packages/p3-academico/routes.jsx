import { Routes, Route } from 'react-router-dom';
import MateriasPage from './pages/MateriasPage';
import DocentesPage from './pages/DocentesPage';
import GruposPage from './pages/GruposPage';
import AulasPage from './pages/AulasPage';

export default function AcademicoRoutes() {
  return (
    <Routes>
      <Route path="/materias" element={<MateriasPage />} />
      <Route path="/docentes" element={<DocentesPage />} />
      <Route path="/grupos" element={<GruposPage />} />
      <Route path="/aulas" element={<AulasPage />} />
    </Routes>
  );
}
