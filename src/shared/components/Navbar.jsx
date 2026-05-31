import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    // Dispatch logout event handled elsewhere (DashboardLayout) or call authService
    window.dispatchEvent(new Event('logout'));
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md h-14 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.toggle('hidden');
        }}>
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">CUP - Administración</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => {}}
            className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || ''} alt={user.nombre || 'U'} />
              <AvatarFallback>{(user.nombre || 'U')[0]}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline text-sm text-gray-700">{user.nombre || 'Usuario'}</span>
          </Button>
          {/* Dropdown could be added */}
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}
