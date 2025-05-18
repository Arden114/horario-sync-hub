
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, Home, BookOpen, School, Calendar, Clock, User 
} from 'lucide-react';

export function Sidebar() {
  const { user } = useAuth();
  
  // Enlaces comunes para ambos roles
  const commonLinks = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/perfil', icon: User, label: 'Perfil' },
  ];
  
  // Enlaces específicos para el coordinador
  const coordinadorLinks = [
    { to: '/usuarios', icon: Users, label: 'Usuarios' },
    { to: '/instituciones', icon: School, label: 'Instituciones' },
    { to: '/disponibilidades', icon: Clock, label: 'Disponibilidades' },
    { to: '/horarios', icon: Calendar, label: 'Horarios' }
  ];
  
  // Enlaces específicos para el docente
  const docenteLinks = [
    { to: '/disponibilidades', icon: Clock, label: 'Mi Disponibilidad' },
    { to: '/horarios', icon: Calendar, label: 'Mi Horario' }
  ];
  
  // Determinar qué enlaces mostrar según el rol
  const links = [
    ...commonLinks,
    ...(user?.rol === 'coordinador' ? coordinadorLinks : docenteLinks)
  ];

  return (
    <aside className="hidden border-r bg-background sticky top-0 h-screen lg:block lg:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <span className="font-semibold">
            {user?.rol === 'coordinador' ? 'Coordinador' : 'Docente'}
          </span>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                  isActive && "bg-accent text-accent-foreground"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
