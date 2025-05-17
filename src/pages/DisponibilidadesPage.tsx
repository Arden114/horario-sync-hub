
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

// Mock de datos de disponibilidad
const mockDisponibilidad = {
  lunes: [
    { id: '1', inicio: '07:00', fin: '09:00', disponible: true },
    { id: '2', inicio: '09:00', fin: '11:00', disponible: false },
    { id: '3', inicio: '11:00', fin: '13:00', disponible: true },
    { id: '4', inicio: '13:00', fin: '15:00', disponible: false },
    { id: '5', inicio: '15:00', fin: '17:00', disponible: true },
    { id: '6', inicio: '17:00', fin: '19:00', disponible: true },
    { id: '7', inicio: '19:00', fin: '21:00', disponible: false },
  ],
  martes: [
    { id: '8', inicio: '07:00', fin: '09:00', disponible: false },
    { id: '9', inicio: '09:00', fin: '11:00', disponible: true },
    { id: '10', inicio: '11:00', fin: '13:00', disponible: true },
    { id: '11', inicio: '13:00', fin: '15:00', disponible: false },
    { id: '12', inicio: '15:00', fin: '17:00', disponible: false },
    { id: '13', inicio: '17:00', fin: '19:00', disponible: true },
    { id: '14', inicio: '19:00', fin: '21:00', disponible: true },
  ],
  miercoles: [
    { id: '15', inicio: '07:00', fin: '09:00', disponible: true },
    { id: '16', inicio: '09:00', fin: '11:00', disponible: true },
    { id: '17', inicio: '11:00', fin: '13:00', disponible: false },
    { id: '18', inicio: '13:00', fin: '15:00', disponible: false },
    { id: '19', inicio: '15:00', fin: '17:00', disponible: true },
    { id: '20', inicio: '17:00', fin: '19:00', disponible: false },
    { id: '21', inicio: '19:00', fin: '21:00', disponible: true },
  ],
  jueves: [
    { id: '22', inicio: '07:00', fin: '09:00', disponible: false },
    { id: '23', inicio: '09:00', fin: '11:00', disponible: false },
    { id: '24', inicio: '11:00', fin: '13:00', disponible: true },
    { id: '25', inicio: '13:00', fin: '15:00', disponible: true },
    { id: '26', inicio: '15:00', fin: '17:00', disponible: false },
    { id: '27', inicio: '17:00', fin: '19:00', disponible: true },
    { id: '28', inicio: '19:00', fin: '21:00', disponible: false },
  ],
  viernes: [
    { id: '29', inicio: '07:00', fin: '09:00', disponible: true },
    { id: '30', inicio: '09:00', fin: '11:00', disponible: true },
    { id: '31', inicio: '11:00', fin: '13:00', disponible: true },
    { id: '32', inicio: '13:00', fin: '15:00', disponible: false },
    { id: '33', inicio: '15:00', fin: '17:00', disponible: true },
    { id: '34', inicio: '17:00', fin: '19:00', disponible: false },
    { id: '35', inicio: '19:00', fin: '21:00', disponible: false },
  ],
  sabado: [
    { id: '36', inicio: '07:00', fin: '09:00', disponible: false },
    { id: '37', inicio: '09:00', fin: '11:00', disponible: true },
    { id: '38', inicio: '11:00', fin: '13:00', disponible: false },
    { id: '39', inicio: '13:00', fin: '15:00', disponible: true },
    { id: '40', inicio: '15:00', fin: '17:00', disponible: false },
    { id: '41', inicio: '17:00', fin: '19:00', disponible: true },
    { id: '42', inicio: '19:00', fin: '21:00', disponible: false },
  ]
};

// Mock de datos de docentes
const mockDocentes = [
  { id: '1', nombre: 'Juan Pérez', especialidad: 'Matemáticas' },
  { id: '2', nombre: 'María González', especialidad: 'Física' },
  { id: '3', nombre: 'Carlos Rodríguez', especialidad: 'Programación' }
];

const DisponibilidadesPage = () => {
  const { user } = useAuth();
  const [disponibilidad, setDisponibilidad] = useState(mockDisponibilidad);
  const [docentes, setDocentes] = useState(mockDocentes);
  const [selectedDocente, setSelectedDocente] = useState<string | null>(null);
  
  const isCoordinador = user?.rol === 'coordinador';
  
  // Togglear disponibilidad
  const toggleDisponibilidad = (dia: string, id: string) => {
    setDisponibilidad(prev => ({
      ...prev,
      [dia]: prev[dia as keyof typeof prev].map(bloque => 
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
    // Simular carga de archivo
    toast.success('Disponibilidad importada desde Excel correctamente');
  };

  // Render días de la semana
  const renderDias = () => {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const horasGuia = [7, 9, 11, 13, 15, 17, 19, 21];
    
    return (
      <div className="mt-4 grid grid-cols-7 gap-4">
        {/* Columna de horas */}
        <div className="pt-6">
          {horasGuia.map((hora, index) => (
            <div key={index} className="h-12 flex items-center justify-end pr-2 text-sm font-medium">
              {hora}:00
            </div>
          ))}
        </div>
        
        {/* Columnas para cada día */}
        {dias.map(dia => (
          <div key={dia} className="flex flex-col">
            <div className="h-6 text-center font-medium capitalize">{dia}</div>
            <div className="flex flex-col gap-px">
              {disponibilidad[dia as keyof typeof disponibilidad].map(bloque => (
                <div
                  key={bloque.id}
                  className={`
                    h-12 rounded-md border border-border p-1 text-xs cursor-pointer transition-colors
                    ${bloque.disponible 
                      ? 'bg-brand-green/20 hover:bg-brand-green/30' 
                      : 'bg-muted hover:bg-muted/80'
                    }
                  `}
                  onClick={() => toggleDisponibilidad(dia, bloque.id)}
                >
                  {bloque.inicio} - {bloque.fin}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                {isCoordinador ? 'Disponibilidades Docentes' : 'Mi Disponibilidad'}
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportar}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Importar Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportar}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Excel
                </Button>
                <Button onClick={handleGuardar}>Guardar</Button>
              </div>
            </div>
            
            {isCoordinador && (
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle>Seleccionar Docente</CardTitle>
                  <CardDescription>
                    Elige un docente para ver o editar su disponibilidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    onValueChange={(value) => setSelectedDocente(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un docente" />
                    </SelectTrigger>
                    <SelectContent>
                      {docentes.map(docente => (
                        <SelectItem key={docente.id} value={docente.id}>
                          {docente.nombre} - {docente.especialidad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {isCoordinador 
                    ? selectedDocente 
                      ? `Disponibilidad de ${docentes.find(d => d.id === selectedDocente)?.nombre}` 
                      : 'Seleccione un docente'
                    : 'Mi Disponibilidad'
                  }
                </CardTitle>
                <CardDescription>
                  Haga clic en un bloque de tiempo para marcarlo como disponible o no disponible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(!isCoordinador || (isCoordinador && selectedDocente)) ? (
                  renderDias()
                ) : (
                  <div className="flex h-40 items-center justify-center text-muted-foreground">
                    Seleccione un docente para ver su disponibilidad
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <div className="text-sm text-muted-foreground">
                <span className="mr-4">
                  <span className="inline-block h-3 w-3 rounded-full bg-brand-green/20 mr-1"></span>
                  Disponible
                </span>
                <span>
                  <span className="inline-block h-3 w-3 rounded-full bg-muted mr-1"></span>
                  No disponible
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DisponibilidadesPage;
