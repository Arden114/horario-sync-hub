import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { horariosApi } from '@/lib/api';
import { toast } from 'sonner';
import { Calendar, RefreshCcw, Trash } from 'lucide-react';

const HorariosPage = () => {
  const { user } = useAuth();
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load horarios
  useEffect(() => {
    const fetchHorarios = async () => {
      setIsLoading(true);
      try {
        const data = await horariosApi.getAll();
        setHorarios(data);
      } catch (error) {
        console.error('Error fetching horarios:', error);
        toast.error('No se pudieron cargar los horarios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  // Generate new schedule (coordinators only)
  const handleGenerateSchedule = async () => {
    if (user?.rol !== 'coordinador') {
      toast.error('Solo los coordinadores pueden generar horarios');
      return;
    }

    setIsLoading(true);
    try {
      const result = await horariosApi.generar({
        // Add necessary parameters here
      });
      toast.success('Horario generado exitosamente');
      // Refresh the list
      const data = await horariosApi.getAll();
      setHorarios(data);
    } catch (error) {
      console.error('Error generating schedule:', error);
      toast.error('Error al generar el horario');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a schedule (coordinators only)
  const handleDeleteSchedule = async (id: string) => {
    if (user?.rol !== 'coordinador') {
      toast.error('Solo los coordinadores pueden eliminar horarios');
      return;
    }

    if (confirm('¿Está seguro que desea eliminar este horario?')) {
      setIsLoading(true);
      try {
        await horariosApi.delete(id);
        toast.success('Horario eliminado exitosamente');
        // Remove from state
        setHorarios(horarios.filter(h => h.id !== id));
      } catch (error) {
        console.error('Error deleting schedule:', error);
        toast.error('Error al eliminar el horario');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">
                {user?.rol === 'coordinador' ? 'Gestión de Horarios' : 'Mi Horario'}
              </h1>
              
              {user?.rol === 'coordinador' && (
                <Button 
                  onClick={handleGenerateSchedule} 
                  disabled={isLoading}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Generar Horario
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center">
                <p>Cargando horarios...</p>
              </div>
            ) : horarios.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-center text-muted-foreground">
                    No hay horarios disponibles
                  </p>
                  {user?.rol === 'coordinador' && (
                    <Button onClick={handleGenerateSchedule} variant="outline" className="mt-4">
                      Generar Horario
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* This is a placeholder for the actual horarios data */}
                {/* You would map through your horarios here */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Horario #1
                    </CardTitle>
                    {user?.rol === 'coordinador' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteSchedule('1')}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p>Detalles del horario...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HorariosPage;
