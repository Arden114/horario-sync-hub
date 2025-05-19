
import React from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PerfilPage = () => {
  const { user } = useAuth();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Información de tu cuenta en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" value={user?.nombre} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Electrónico</Label>
                    <Input id="correo" value={user?.correo} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rol">Rol</Label>
                    <Input 
                      id="rol" 
                      value={user?.rol === 'coordinador' ? 'Coordinador' : 'Docente'} 
                      readOnly 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <Input id="id" value={user?.id} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilPage;
