
import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'coordinador' | 'docente';

interface User {
  id: string;
  nombre: string;
  usuario: string;
  especialidad?: string;
  rol: Role;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (usuario: string, password: string, rol: Role) => Promise<boolean>;
  logout: () => void;
}

// Mock de usuarios para demo
const MOCK_USERS = [
  {
    id: '1',
    nombre: 'Admin Usuario',
    usuario: 'admin',
    password: 'admin123',
    rol: 'coordinador' as Role
  },
  {
    id: '2',
    nombre: 'Juan Pérez',
    usuario: 'jperez',
    password: 'docente123',
    especialidad: 'Matemáticas',
    rol: 'docente' as Role
  },
  {
    id: '3',
    nombre: 'Usuario de Prueba',
    usuario: 'test',
    password: 'test123',
    especialidad: 'Informática',
    rol: 'docente' as Role
  },
  {
    id: '4',
    nombre: 'Coordinador de Prueba',
    usuario: 'coordtest',
    password: 'coord123',
    rol: 'coordinador' as Role
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (usuario: string, password: string, rol: Role): Promise<boolean> => {
    // Simular verificación de credenciales
    const foundUser = MOCK_USERS.find(
      u => u.usuario === usuario && u.password === password && u.rol === rol
    );

    if (foundUser) {
      // Omitimos la contraseña del objeto de usuario
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
