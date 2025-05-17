
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Download, Users } from 'lucide-react';
import { toast } from 'sonner';

// Mock de datos para selector
const mockPeriodos = ['2024-A', '2024-B'];
const mockInstituciones = [{id: '1', nombre: 'Universidad Central'}, {id: '2', nombre: 'Instituto Técnico Superior'}];
const mockCarreras = [{id: '1', nombre: 'Ingeniería Informática', institucionId: '1'}, {id: '2', nombre: 'Medicina', institucionId: '1'}];
const mockCiclos = [{id: '1', nombre: 'Primer Ciclo', carreraId: '1'}, {id: '2', nombre: 'Segundo Ciclo', carreraId: '1'}];
const mockSecciones = [{id: '1', nombre: 'A', cicloId: '1'}, {id: '2', nombre: 'B', cicloId: '1'}];
const mockMaterias = [{id: '1', nombre: 'Programación I', cicloId: '1'}, {id: '2', nombre: 'Base de Datos', cicloId: '1'}];
const mockAulas = [{id: '1', nombre: 'Aula 101', institucionId: '1'}, {id: '2', nombre: 'Laboratorio 201', institucionId: '1'}];
const mockDocentes = [{id: '1', nombre: 'Juan Pérez'}, {id: '2', nombre: 'María González'}];

// Mock de horarios
const mockHorarios = [
  { 
    id: '1',
    dia: 'lunes',
    horaInicio: '07:00',
    horaFin: '09:00',
    materia: 'Programación I',
    docente: 'Juan Pérez',
    aula: 'Aula 101',
    ciclo: 'Primer Ciclo',
    seccion: 'A'
  },
  { 
    id: '2',
    dia: 'lunes',
    horaInicio: '09:00',
    horaFin: '11:00',
    materia: 'Base de Datos',
    docente: 'María González',
    aula: 'Laboratorio 201',
    ciclo: 'Primer Ciclo',
    seccion: 'A'
  },
  { 
    id: '3',
    dia: 'martes',
    horaInicio: '07:00',
    horaFin: '09:00',
    materia: 'Programación I',
    docente: 'Juan Pérez',
    aula: 'Laboratorio 201',
    ciclo: 'Primer Ciclo',
    seccion: 'A'
  }
];

const HorariosPage = () => {
  const { user } = useAuth();
  const isCoordinador = user?.rol === 'coordinador';
  
  // Estados para selección
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>(mockPeriodos[0]);
  const [selectedInstitucion, setSelectedInstitucion] = useState<string>('');
  const [selectedCarrera, setSelectedCarrera] = useState<string>('');
  const [selectedCiclo, setSelectedCiclo] = useState<string>('');
  const [selectedSeccion, setSelectedSeccion] = useState<string>('');
  const [selectedMateria, setSelectedMateria] = useState<string>('');
  const [selectedAula, setSelectedAula] = useState<string>('');
  const [selectedDocente, setSelectedDocente] = useState<string>('');
  const [selectedDia, setSelectedDia] = useState<string>('');
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [horaFin, setHoraFin] = useState<string>('');
  
  // Estado para los horarios
  const [horarios, setHorarios] = useState(mockHorarios);
  
  // Filtrar elementos según selección previa
  const filteredCarreras = mockCarreras.filter(carrera => 
    !selectedInstitucion || carrera.institucionId === selectedInstitucion
  );
  
  const filteredCiclos = mockCiclos.filter(ciclo => 
    !selectedCarrera || ciclo.carreraId === selectedCarrera
  );
  
  const filteredSecciones = mockSecciones.filter(seccion => 
    !selectedCiclo || seccion.cicloId === selectedCiclo
  );
  
  const filteredMaterias = mockMaterias.filter(materia => 
    !selectedCiclo || materia.cicloId === selectedCiclo
  );
  
  const filteredAulas = mockAulas.filter(aula => 
    !selectedInstitucion || aula.institucionId === selectedInstitucion
  );
  
  // Crear horario manualmente
  const handleCrearHorario = () => {
    if (!selectedMateria || !selectedAula || !selectedDocente || !selectedDia || !horaInicio || !horaFin) {
      toast.error('Debe completar todos los campos');
      return;
    }
    
    const materia = mockMaterias.find(m => m.id === selectedMateria)?.nombre;
    const docente = mockDocentes.find(d => d.id === selectedDocente)?.nombre;
    const aula = mockAulas.find(a => a.id === selectedAula)?.nombre;
    const ciclo = mockCiclos.find(c => c.id === selectedCiclo)?.nombre;
    const seccion = mockSecciones.find(s => s.id === selectedSeccion)?.nombre;
    
    const newHorario = {
      id: String(horarios.length + 1),
      dia: selectedDia,
      horaInicio,
      horaFin,
      materia,
      docente,
      aula,
      ciclo,
      seccion
    };
    
    setHorarios([...horarios, newHorario]);
    toast.success('Horario creado correctamente');
    
    // Resetear campos
    setSelectedMateria('');
    setSelectedAula('');
    setSelectedDocente('');
    setSelectedDia('');
    setHoraInicio('');
    setHoraFin('');
  };
  
  // Generar horario automáticamente
  const handleGenerarAutomatico = () => {
    if (!selectedInstitucion || !selectedCarrera) {
      toast.error('Debe seleccionar institución y carrera');
      return;
    }
    
    toast.success('Generando horario automáticamente...');
    setTimeout(() => {
      toast.success('Horario generado correctamente');
    }, 2000);
  };
  
  // Publicar horarios
  const handlePublicar = () => {
    toast.success('Horarios publicados correctamente');
  };
  
  // Exportar horarios a Excel
  const handleExportar = () => {
    toast.success('Horarios exportados a Excel correctamente');
  };
  
  // Renderizar horarios en formato de calendario
  const renderCalendario = () => {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const horas = Array.from({ length: 15 }, (_, i) => i + 7); // 7:00 a 21:00
    
    return (
      <div className="mt-4 overflow-x-auto pb-6">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-7 gap-2">
            {/* Columna de horas */}
            <div>
              <div className="h-12 border-b"></div>
              {horas.map((hora, index) => (
                <div key={index} className="h-16 flex items-center justify-end pr-2 text-sm font-medium">
                  {hora}:00
                </div>
              ))}
            </div>
            
            {/* Columnas para cada día */}
            {dias.map(dia => (
              <div key={dia} className="flex flex-col">
                <div className="h-12 border-b text-center font-medium capitalize py-3">
                  {dia}
                </div>
                <div className="relative">
                  {horas.map((hora, index) => (
                    <div 
                      key={index} 
                      className="h-16 border-b border-dashed last:border-b-0"
                    ></div>
                  ))}
                  
                  {/* Mostrar horarios para este día */}
                  {horarios
                    .filter(h => h.dia === dia)
                    .map(horario => {
                      const horaInicioNum = parseInt(horario.horaInicio.split(':')[0]);
                      const horaFinNum = parseInt(horario.horaFin.split(':')[0]);
                      const duracion = horaFinNum - horaInicioNum;
                      const top = (horaInicioNum - 7) * 64; // 64px por hora (h-16)
                      
                      return (
                        <div
                          key={horario.id}
                          className="absolute left-1 right-1 rounded-md bg-brand-blue/20 border border-brand-blue p-2 overflow-hidden"
                          style={{
                            top: `${top}px`,
                            height: `${duracion * 64 - 4}px`,
                          }}
                        >
                          <div className="text-xs font-medium truncate">{horario.materia}</div>
                          <div className="text-xs truncate">{horario.docente}</div>
                          <div className="text-xs truncate">{horario.aula}</div>
                          <div className="text-xs truncate">
                            {horario.horaInicio} - {horario.horaFin}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
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
                {isCoordinador ? 'Gestión de Horarios' : 'Mi Horario'}
              </h1>
              <div className="flex items-center gap-2">
                {isCoordinador && (
                  <Button 
                    variant="outline"
                    onClick={handlePublicar}
                  >
                    Publicar
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={handleExportar}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Excel
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Período Académico</CardTitle>
                <CardDescription>
                  Seleccione el período académico para {isCoordinador ? 'crear o' : ''} visualizar horarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  defaultValue={selectedPeriodo}
                  onValueChange={setSelectedPeriodo}
                >
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Seleccione un período" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPeriodos.map((periodo) => (
                      <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            {isCoordinador ? (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Creación de Horarios</CardTitle>
                  <CardDescription>
                    Puede crear horarios manualmente o generarlos automáticamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="manual">
                    <TabsList className="mb-4">
                      <TabsTrigger value="manual">Modo Manual</TabsTrigger>
                      <TabsTrigger value="automatico">Modo Automático</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="manual">
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="institucion">Institución</Label>
                            <Select
                              value={selectedInstitucion}
                              onValueChange={setSelectedInstitucion}
                            >
                              <SelectTrigger id="institucion">
                                <SelectValue placeholder="Seleccione institución" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockInstituciones.map((institucion) => (
                                  <SelectItem key={institucion.id} value={institucion.id}>
                                    {institucion.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="carrera">Carrera</Label>
                            <Select
                              value={selectedCarrera}
                              onValueChange={setSelectedCarrera}
                              disabled={!selectedInstitucion}
                            >
                              <SelectTrigger id="carrera">
                                <SelectValue placeholder="Seleccione carrera" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredCarreras.map((carrera) => (
                                  <SelectItem key={carrera.id} value={carrera.id}>
                                    {carrera.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="ciclo">Ciclo</Label>
                            <Select
                              value={selectedCiclo}
                              onValueChange={setSelectedCiclo}
                              disabled={!selectedCarrera}
                            >
                              <SelectTrigger id="ciclo">
                                <SelectValue placeholder="Seleccione ciclo" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredCiclos.map((ciclo) => (
                                  <SelectItem key={ciclo.id} value={ciclo.id}>
                                    {ciclo.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="seccion">Sección</Label>
                            <Select
                              value={selectedSeccion}
                              onValueChange={setSelectedSeccion}
                              disabled={!selectedCiclo}
                            >
                              <SelectTrigger id="seccion">
                                <SelectValue placeholder="Seleccione sección" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredSecciones.map((seccion) => (
                                  <SelectItem key={seccion.id} value={seccion.id}>
                                    {seccion.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="materia">Materia</Label>
                            <Select
                              value={selectedMateria}
                              onValueChange={setSelectedMateria}
                              disabled={!selectedCiclo}
                            >
                              <SelectTrigger id="materia">
                                <SelectValue placeholder="Seleccione materia" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredMaterias.map((materia) => (
                                  <SelectItem key={materia.id} value={materia.id}>
                                    {materia.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="docente">Docente</Label>
                            <Select
                              value={selectedDocente}
                              onValueChange={setSelectedDocente}
                            >
                              <SelectTrigger id="docente">
                                <SelectValue placeholder="Seleccione docente" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockDocentes.map((docente) => (
                                  <SelectItem key={docente.id} value={docente.id}>
                                    {docente.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="aula">Aula</Label>
                            <Select
                              value={selectedAula}
                              onValueChange={setSelectedAula}
                              disabled={!selectedInstitucion}
                            >
                              <SelectTrigger id="aula">
                                <SelectValue placeholder="Seleccione aula" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredAulas.map((aula) => (
                                  <SelectItem key={aula.id} value={aula.id}>
                                    {aula.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="dia">Día</Label>
                            <Select
                              value={selectedDia}
                              onValueChange={setSelectedDia}
                            >
                              <SelectTrigger id="dia">
                                <SelectValue placeholder="Seleccione día" />
                              </SelectTrigger>
                              <SelectContent>
                                {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].map(dia => (
                                  <SelectItem key={dia} value={dia} className="capitalize">
                                    {dia}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="hora-inicio">Hora de Inicio</Label>
                            <Select
                              value={horaInicio}
                              onValueChange={setHoraInicio}
                            >
                              <SelectTrigger id="hora-inicio">
                                <SelectValue placeholder="Seleccione hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 14 }, (_, i) => i + 7).map(hora => {
                                  const horaStr = `${hora.toString().padStart(2, '0')}:00`;
                                  return (
                                    <SelectItem key={horaStr} value={horaStr}>
                                      {horaStr}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="hora-fin">Hora de Fin</Label>
                            <Select
                              value={horaFin}
                              onValueChange={setHoraFin}
                              disabled={!horaInicio}
                            >
                              <SelectTrigger id="hora-fin">
                                <SelectValue placeholder="Seleccione hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 14 }, (_, i) => i + 8).map(hora => {
                                  const horaStr = `${hora.toString().padStart(2, '0')}:00`;
                                  const horaInicioNum = horaInicio ? parseInt(horaInicio.split(':')[0]) : 0;
                                  if (hora > horaInicioNum) {
                                    return (
                                      <SelectItem key={horaStr} value={horaStr}>
                                        {horaStr}
                                      </SelectItem>
                                    );
                                  }
                                  return null;
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Button
                          className="mt-2"
                          onClick={handleCrearHorario}
                        >
                          Crear Horario
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="automatico">
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="auto-institucion">Institución</Label>
                            <Select
                              value={selectedInstitucion}
                              onValueChange={setSelectedInstitucion}
                            >
                              <SelectTrigger id="auto-institucion">
                                <SelectValue placeholder="Seleccione institución" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockInstituciones.map((institucion) => (
                                  <SelectItem key={institucion.id} value={institucion.id}>
                                    {institucion.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="auto-carrera">Carrera</Label>
                            <Select
                              value={selectedCarrera}
                              onValueChange={setSelectedCarrera}
                              disabled={!selectedInstitucion}
                            >
                              <SelectTrigger id="auto-carrera">
                                <SelectValue placeholder="Seleccione carrera" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredCarreras.map((carrera) => (
                                  <SelectItem key={carrera.id} value={carrera.id}>
                                    {carrera.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button
                            className="mt-2"
                            onClick={handleGenerarAutomatico}
                            disabled={!selectedInstitucion || !selectedCarrera}
                          >
                            Generar Automáticamente
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Esta acción generará horarios optimizados en base a la disponibilidad de docentes y aulas.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : null}
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Vista de Horarios
                </CardTitle>
                <CardDescription>
                  {isCoordinador ? 'Visualización de horarios creados' : 'Visualización de su horario'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="filtro-institucion">Institución</Label>
                    <Select>
                      <SelectTrigger id="filtro-institucion">
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {mockInstituciones.map((institucion) => (
                          <SelectItem key={institucion.id} value={institucion.id}>
                            {institucion.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="filtro-carrera">Carrera</Label>
                    <Select>
                      <SelectTrigger id="filtro-carrera">
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {mockCarreras.map((carrera) => (
                          <SelectItem key={carrera.id} value={carrera.id}>
                            {carrera.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="filtro-ciclo">Ciclo</Label>
                    <Select>
                      <SelectTrigger id="filtro-ciclo">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {mockCiclos.map((ciclo) => (
                          <SelectItem key={ciclo.id} value={ciclo.id}>
                            {ciclo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {renderCalendario()}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HorariosPage;
