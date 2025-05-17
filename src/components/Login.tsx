
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'coordinador' | 'docente'>('coordinador');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error al intentar iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-brand-lightblue/10 via-brand-purple/5 to-background dark:from-brand-blue/20 dark:via-brand-purple/10 dark:to-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Horario Sync Hub
          </CardTitle>
          <CardDescription className="text-lg">
            Gestión de horarios académicos
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <Select 
                value={rol} 
                onValueChange={(value) => setRol(value as 'coordinador' | 'docente')}
              >
                <SelectTrigger id="rol">
                  <SelectValue placeholder="Seleccione su rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coordinador">Coordinador</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
