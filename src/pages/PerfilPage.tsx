
import React from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
                  Visualiza y actualiza tu información personal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <Input id="nombre" value={user?.nombre} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="usuario">Nombre de Usuario</Label>
                    <Input id="usuario" value={user?.usuario} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rol">Rol</Label>
                    <Input 
                      id="rol" 
                      value={user?.rol === 'coordinador' ? 'Coordinador' : 'Docente'} 
                      readOnly 
                    />
                  </div>
                  
                  {user?.rol === 'docente' && (
                    <div className="space-y-2">
                      <Label htmlFor="especialidad">Especialidad</Label>
                      <Input id="especialidad" value={user?.especialidad || 'No especificada'} readOnly />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {user?.rol === 'coordinador' && (
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Períodos Académicos</CardTitle>
                  <CardDescription>
                    Administra los períodos académicos del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="actual">
                    <TabsList className="mb-4">
                      <TabsTrigger value="actual">Período Actual</TabsTrigger>
                      <TabsTrigger value="crear">Crear Período</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="actual">
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">2024-B</h3>
                              <p className="text-sm text-muted-foreground">01/06/2024 - 30/09/2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Activo</span>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">2024-A</h3>
                              <p className="text-sm text-muted-foreground">01/01/2024 - 31/05/2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Activo</span>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="crear">
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="periodo-nombre">Nombre del Período</Label>
                          <Input id="periodo-nombre" placeholder="Ej: 2024-C" />
                        </div>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                            <Input id="fecha-inicio" type="date" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="fecha-fin">Fecha de Fin</Label>
                            <Input id="fecha-fin" type="date" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch id="estado-activo" />
                          <Label htmlFor="estado-activo">Período Activo</Label>
                        </div>
                        
                        <Button type="submit">Crear Período</Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilPage;
