
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="hidden text-xl font-bold sm:inline-block">
              Horario Sync Hub
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user.nombre}
                <p className="text-xs text-muted-foreground">
                  {user.rol === 'coordinador' ? 'Coordinador' : 'Docente'}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/perfil" className="cursor-pointer">
                  Mi Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
