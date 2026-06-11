import { Routes, Route } from 'react-router-dom';
import SeguridadAccesoRoutes from "../packages/routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SeguridadAccesoRoutes />} />
    </Routes>
  );
}
