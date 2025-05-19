
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../lib/api';
import { toast } from 'sonner';

// Define the User interface based on your API response
interface User {
  id: string;
  nombre: string;
  correo: string;
  rol: 'coordinador' | 'docente';
}

// Define the context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string, rol: 'coordinador' | 'docente') => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load the user profile from the API
  const loadUserProfile = async () => {
    try {
      const userData = await authApi.getProfile();
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Clear tokens on error
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is authenticated on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      loadUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (username: string, password: string, rol: 'coordinador' | 'docente'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const data = await authApi.login(username, password);
      
      // Verify that we have both tokens
      if (data.access && data.refresh) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        // Get the user profile
        const success = await loadUserProfile();
        
        // Make sure the user has the requested role
        if (success && user && user.rol !== rol) {
          toast.error(`No tiene permisos de ${rol}`);
          logout();
          return false;
        }
        
        return success;
      } else {
        toast.error('Error de autenticación: tokens inválidos');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error de autenticación: credenciales inválidas');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
