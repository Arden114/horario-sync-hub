
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'coordinador' | 'docente'>('coordinador');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(usuario, password, rol);
      
      if (success) {
        toast.success(`Bienvenido al sistema de gestión de horarios`);
        navigate('/');
      }
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error al intentar iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-yellow-100 via-cyan-100 to-background dark:from-blue-900/20 dark:via-purple-900/10 dark:to-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-red-600">
            La Pontificia
          </CardTitle>
          <CardDescription className="text-lg">
            Sistema de Horarios
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Nombre de usuario"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Rol</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={rol === 'coordinador' ? 'default' : 'outline'}
                  className={rol === 'coordinador' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                  onClick={() => setRol('coordinador')}
                >
                  Coordinador
                </Button>
                <Button
                  type="button"
                  variant={rol === 'docente' ? 'default' : 'outline'}
                  className={rol === 'docente' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                  onClick={() => setRol('docente')}
                >
                  Docente
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600" 
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
