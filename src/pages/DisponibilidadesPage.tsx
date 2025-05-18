
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Download, Save, Upload, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

// Mock de datos de disponibilidad con horarios de 7 AM a 8 PM
const generarHorariosDisponibilidad = () => {
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
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
              {/* Panel lateral de docentes - Solo visible para coordinadores */}
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
              
              {/* Panel principal de disponibilidad - Siempre visible, ocupa todo el ancho para docentes */}
              <Card className={`bg-background shadow-md ${!isCoordinador ? 'col-span-full' : ''}`}>
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Hora</TableHead>
                          {dias.map((dia) => (
                            <TableHead key={dia} className="text-center capitalize">
                              {dia}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {horas.map((hora) => (
                          <TableRow key={hora}>
                            <TableCell className="font-medium">{hora}</TableCell>
                            {dias.map((dia) => {
                              const bloque = disponibilidad[dia].find(b => b.hora === hora);
                              return (
                                <TableCell key={`${dia}-${hora}`} className="text-center">
                                  <div className="flex justify-center">
                                    <div 
                                      className={`
                                        w-6 h-6 rounded-md cursor-pointer flex items-center justify-center
                                        ${bloque?.disponible 
                                          ? 'bg-brand-lightblue text-white' 
                                          : 'border border-muted-foreground/20'
                                        }
                                      `}
                                      onClick={() => toggleDisponibilidad(dia, bloque?.id)}
                                    >
                                      {bloque?.disponible && (
                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                          <circle cx="12" cy="12" r="10"></circle>
                                          <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
