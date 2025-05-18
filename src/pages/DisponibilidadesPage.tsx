
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Download, Save, Upload, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

// Mock de datos de disponibilidad con horarios de 7 AM a 8 PM
const generarHorariosDisponibilidad = () => {
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const horas = [];
  
  // Generar horas de 7 AM a 8 PM
  for (let hora = 7; hora <= 20; hora++) {
    const horaFormateada = hora < 12 ? `${hora}:00 AM` : `${hora === 12 ? 12 : hora - 12}:00 PM`;
    horas.push(horaFormateada);
  }
  
  // Generar estructura de datos para cada día y hora
  let id = 1;
  const disponibilidad = {};
  
  dias.forEach(dia => {
    disponibilidad[dia] = horas.map((hora) => {
      // Generar disponibilidad aleatoria para demostración
      const disponible = Math.random() > 0.5;
      return { id: `${id++}`, hora, disponible };
    });
  });
  
  return { dias, horas, disponibilidad };
};

// Mock de datos de docentes
const mockDocentes = [
  { id: '1', nombre: 'Juan Pérez', especialidad: 'Matemáticas', activo: true },
  { id: '2', nombre: 'Ana Gómez', especialidad: 'Programación', activo: true },
  { id: '3', nombre: 'Carlos Ruiz', especialidad: 'Sistemas', activo: true },
  { id: '4', nombre: 'Lucía Martínez', especialidad: 'Base de Datos', activo: true },
  { id: '5', nombre: 'Roberto Torres', especialidad: 'Redes', activo: false }
];

const DisponibilidadesPage = () => {
  const { user } = useAuth();
  const { dias, horas, disponibilidad: initialDisponibilidad } = generarHorariosDisponibilidad();
  const [disponibilidad, setDisponibilidad] = useState(initialDisponibilidad);
  const [busquedaDocente, setBusquedaDocente] = useState("");
  const [selectedDocente, setSelectedDocente] = useState(mockDocentes[0]);
  
  const isCoordinador = user?.rol === 'coordinador';
  
  // Filtrar docentes según la búsqueda
  const docentesFiltrados = mockDocentes.filter(docente => 
    docente.nombre.toLowerCase().includes(busquedaDocente.toLowerCase()) ||
    docente.especialidad.toLowerCase().includes(busquedaDocente.toLowerCase())
  );
  
  // Togglear disponibilidad
  const toggleDisponibilidad = (dia, id) => {
    setDisponibilidad(prev => ({
      ...prev,
      [dia]: prev[dia].map(bloque => 
        bloque.id === id ? { ...bloque, disponible: !bloque.disponible } : bloque
      )
    }));
  };
  
  // Guardar disponibilidad
  const handleGuardar = () => {
    toast.success('Disponibilidad guardada correctamente');
  };
  
  // Exportar a Excel
  const handleExportar = () => {
    toast.success('Disponibilidad exportada a Excel correctamente');
  };
  
  // Importar desde Excel
  const handleImportar = () => {
    toast.success('Disponibilidad importada desde Excel correctamente');
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Disponibilidades</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
              {/* Panel lateral de docentes */}
              {isCoordinador && (
                <Card className="bg-background shadow-md">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-4">Docentes</h2>
                    <div className="relative mb-4">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar docente..."
                        className="pl-8"
                        value={busquedaDocente}
                        onChange={(e) => setBusquedaDocente(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      {docentesFiltrados.map((docente) => (
                        <div
                          key={docente.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors flex items-center justify-between ${
                            selectedDocente.id === docente.id
                              ? 'bg-brand-lightblue text-white'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setSelectedDocente(docente)}
                        >
                          <div>
                            <div className="font-medium">{docente.nombre}</div>
                            <div className="text-sm text-muted-foreground">{docente.especialidad}</div>
                          </div>
                          <div className={`h-2 w-2 rounded-full ${docente.activo ? 'bg-brand-green' : 'bg-brand-red'}`}></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Panel principal de disponibilidad */}
              <Card className="bg-background shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">
                      {isCoordinador
                        ? `Disponibilidad de ${selectedDocente.nombre}`
                        : 'Mi Disponibilidad'
                      }
                    </h2>
                    <div className="flex items-center gap-2">
                      {isCoordinador && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleImportar}
                            className="text-xs"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Importar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExportar}
                            className="text-xs"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Exportar
                          </Button>
                        </>
                      )}
                      <Button onClick={handleGuardar} size="sm" className="bg-brand-lightblue hover:bg-brand-lightblue/90">
                        <Save className="mr-2 h-4 w-4" />
                        Guardar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-2 min-w-[700px]">
                      {/* Encabezados de días */}
                      <div className="font-medium text-center py-2"></div>
                      {dias.map((dia, index) => (
                        <div key={index} className="font-medium text-center py-2 capitalize">
                          {dia}
                        </div>
                      ))}
                      
                      {/* Filas de horas */}
                      {horas.map((hora, horaIndex) => (
                        <React.Fragment key={hora}>
                          <div className="text-sm text-right pr-2 py-2">{hora}</div>
                          
                          {dias.map((dia, diaIndex) => {
                            const bloque = disponibilidad[dia][horaIndex];
                            return (
                              <div 
                                key={`${dia}-${hora}`}
                                className={`
                                  rounded-md border transition-colors cursor-pointer flex items-center justify-center
                                  ${bloque.disponible 
                                    ? 'bg-brand-lightblue/80 hover:bg-brand-lightblue border-brand-lightblue' 
                                    : 'bg-transparent hover:bg-muted/30 border-muted'
                                  }
                                `}
                                onClick={() => toggleDisponibilidad(dia, bloque.id)}
                              >
                                <div className="h-5 w-5">
                                  {bloque.disponible && <div className="h-full w-full flex items-center justify-center text-white">
                                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                  </div>}
                                </div>
                              </div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DisponibilidadesPage;
