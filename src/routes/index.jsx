import { Routes, Route } from 'react-router-dom';
import SeguridadAccesoRoutes from '../packages/p1-seguridad-acceso/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SeguridadAccesoRoutes />} />
    </Routes>
  );
}
