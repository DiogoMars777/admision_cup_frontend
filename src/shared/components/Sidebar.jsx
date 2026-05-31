import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Book, Clipboard, Settings, Calendar, Building, Layers, LogOut } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Postulantes', path: '/postulantes', icon: Users },
  { name: 'Docentes', path: '/docentes', icon: Book },
  { name: 'Materias', path: '/materias', icon: Layers },
  { name: 'Grupos', path: '/grupos', icon: Calendar },
  { name: 'Aulas', path: '/aulas', icon: Building },
  { name: 'Roles', path: '/roles', icon: Clipboard },
  // add more as needed
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="bg-gray-800 text-white w-64 hidden lg:block h-screen flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">CUP Admin</div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 hover:bg-gray-700 ${active ? 'bg-gray-700' : ''}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          className="flex items-center w-full text-left hover:bg-gray-700 px-2 py-2 rounded"
          onClick={() => {
            // logout logic will be handled by authService elsewhere
            window.dispatchEvent(new Event('logout'));
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
