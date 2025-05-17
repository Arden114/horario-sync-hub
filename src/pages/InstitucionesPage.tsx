
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { School, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

// Mock de datos
const mockInstituciones = [
  { id: '1', nombre: 'Universidad Central', ubicacion: 'Ciudad Norte', tipo: 'Universidad' },
  { id: '2', nombre: 'Instituto Técnico Superior', ubicacion: 'Ciudad Sur', tipo: 'Instituto' },
  { id: '3', nombre: 'Colegio San Martín', ubicacion: 'Ciudad Este', tipo: 'Colegio' }
];

const mockAulas = [
  { id: '1', nombre: 'Aula 101', tipo: 'Teórica', capacidad: 30, institucionId: '1' },
  { id: '2', nombre: 'Laboratorio 201', tipo: 'Laboratorio', capacidad: 20, institucionId: '1' },
  { id: '3', nombre: 'Aula 301', tipo: 'Teórica', capacidad: 40, institucionId: '2' },
];

const mockCarreras = [
  { id: '1', nombre: 'Ingeniería Informática', codigo: 'INF', institucionId: '1' },
  { id: '2', nombre: 'Medicina', codigo: 'MED', institucionId: '1' },
  { id: '3', nombre: 'Técnico en Redes', codigo: 'TRED', institucionId: '2' },
];

const mockCiclos = [
  { id: '1', nombre: 'Primer Ciclo', seccion: 'A', carreraId: '1' },
  { id: '2', nombre: 'Segundo Ciclo', seccion: 'B', carreraId: '1' },
  { id: '3', nombre: 'Primer Ciclo', seccion: 'A', carreraId: '3' },
];

const mockMaterias = [
  { id: '1', nombre: 'Programación I', codigo: 'PRG1', tipo: 'Teórica', horasTotales: 60, cicloId: '1' },
  { id: '2', nombre: 'Base de Datos', codigo: 'BD', tipo: 'Práctica', horasTotales: 40, cicloId: '1' },
  { id: '3', nombre: 'Redes', codigo: 'RED', tipo: 'Teórica-Práctica', horasTotales: 80, cicloId: '3' },
];

const InstitucionesPage = () => {
  const [instituciones, setInstituciones] = useState(mockInstituciones);
  const [aulas, setAulas] = useState(mockAulas);
  const [carreras, setCarreras] = useState(mockCarreras);
  const [ciclos, setCiclos] = useState(mockCiclos);
  const [materias, setMaterias] = useState(mockMaterias);
  
  const [selectedInstitucion, setSelectedInstitucion] = useState<any>(null);
  const [selectedCarrera, setSelectedCarrera] = useState<any>(null);
  const [selectedCiclo, setSelectedCiclo] = useState<any>(null);
  
  const [openInstitucionDialog, setOpenInstitucionDialog] = useState(false);
  const [openAulaDialog, setOpenAulaDialog] = useState(false);
  const [openCarreraDialog, setOpenCarreraDialog] = useState(false);
  const [openCicloDialog, setOpenCicloDialog] = useState(false);
  const [openMateriaDialog, setOpenMateriaDialog] = useState(false);
  
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Obtener aulas filtradas por institución seleccionada
  const filteredAulas = aulas.filter(aula => 
    selectedInstitucion && aula.institucionId === selectedInstitucion.id
  );
  
  // Obtener carreras filtradas por institución seleccionada
  const filteredCarreras = carreras.filter(carrera => 
    selectedInstitucion && carrera.institucionId === selectedInstitucion.id
  );
  
  // Obtener ciclos filtrados por carrera seleccionada
  const filteredCiclos = ciclos.filter(ciclo => 
    selectedCarrera && ciclo.carreraId === selectedCarrera.id
  );
  
  // Obtener materias filtradas por ciclo seleccionado
  const filteredMaterias = materias.filter(materia => 
    selectedCiclo && materia.cicloId === selectedCiclo.id
  );
  
  // Abrir diálogo para crear/editar institución
  const handleInstitucionDialog = (institucion?: any) => {
    if (institucion) {
      setCurrentItem({...institucion});
      setIsEditing(true);
    } else {
      setCurrentItem({id: '', nombre: '', ubicacion: '', tipo: ''});
      setIsEditing(false);
    }
    setOpenInstitucionDialog(true);
  };
  
  // Abrir diálogo para crear/editar aula
  const handleAulaDialog = (aula?: any) => {
    if (!selectedInstitucion) {
      toast.error('Debe seleccionar una institución primero');
      return;
    }
    
    if (aula) {
      setCurrentItem({...aula});
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: '',
        nombre: '',
        tipo: '',
        capacidad: '',
        institucionId: selectedInstitucion.id
      });
      setIsEditing(false);
    }
    setOpenAulaDialog(true);
  };
  
  // Abrir diálogo para crear/editar carrera
  const handleCarreraDialog = (carrera?: any) => {
    if (!selectedInstitucion) {
      toast.error('Debe seleccionar una institución primero');
      return;
    }
    
    if (carrera) {
      setCurrentItem({...carrera});
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: '',
        nombre: '',
        codigo: '',
        institucionId: selectedInstitucion.id
      });
      setIsEditing(false);
    }
    setOpenCarreraDialog(true);
  };
  
  // Abrir diálogo para crear/editar ciclo
  const handleCicloDialog = (ciclo?: any) => {
    if (!selectedCarrera) {
      toast.error('Debe seleccionar una carrera primero');
      return;
    }
    
    if (ciclo) {
      setCurrentItem({...ciclo});
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: '',
        nombre: '',
        seccion: '',
        carreraId: selectedCarrera.id
      });
      setIsEditing(false);
    }
    setOpenCicloDialog(true);
  };
  
  // Abrir diálogo para crear/editar materia
  const handleMateriaDialog = (materia?: any) => {
    if (!selectedCiclo) {
      toast.error('Debe seleccionar un ciclo primero');
      return;
    }
    
    if (materia) {
      setCurrentItem({...materia});
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: '',
        nombre: '',
        codigo: '',
        tipo: '',
        horasTotales: '',
        cicloId: selectedCiclo.id
      });
      setIsEditing(false);
    }
    setOpenMateriaDialog(true);
  };
  
  // Guardar institución
  const handleSaveInstitucion = () => {
    if (isEditing) {
      setInstituciones(instituciones.map(i => 
        i.id === currentItem.id ? currentItem : i
      ));
      toast.success(`Institución ${currentItem.nombre} actualizada correctamente`);
    } else {
      const newId = String(instituciones.length + 1);
      setInstituciones([...instituciones, { ...currentItem, id: newId }]);
      toast.success(`Institución ${currentItem.nombre} creada correctamente`);
    }
    setOpenInstitucionDialog(false);
  };
  
  // Guardar aula
  const handleSaveAula = () => {
    if (isEditing) {
      setAulas(aulas.map(a => 
        a.id === currentItem.id ? currentItem : a
      ));
      toast.success(`Aula ${currentItem.nombre} actualizada correctamente`);
    } else {
      const newId = String(aulas.length + 1);
      setAulas([...aulas, { ...currentItem, id: newId }]);
      toast.success(`Aula ${currentItem.nombre} creada correctamente`);
    }
    setOpenAulaDialog(false);
  };
  
  // Guardar carrera
  const handleSaveCarrera = () => {
    if (isEditing) {
      setCarreras(carreras.map(c => 
        c.id === currentItem.id ? currentItem : c
      ));
      toast.success(`Carrera ${currentItem.nombre} actualizada correctamente`);
    } else {
      const newId = String(carreras.length + 1);
      setCarreras([...carreras, { ...currentItem, id: newId }]);
      toast.success(`Carrera ${currentItem.nombre} creada correctamente`);
    }
    setOpenCarreraDialog(false);
  };
  
  // Guardar ciclo
  const handleSaveCiclo = () => {
    if (isEditing) {
      setCiclos(ciclos.map(c => 
        c.id === currentItem.id ? currentItem : c
      ));
      toast.success(`Ciclo ${currentItem.nombre} actualizado correctamente`);
    } else {
      const newId = String(ciclos.length + 1);
      setCiclos([...ciclos, { ...currentItem, id: newId }]);
      toast.success(`Ciclo ${currentItem.nombre} creado correctamente`);
    }
    setOpenCicloDialog(false);
  };
  
  // Guardar materia
  const handleSaveMateria = () => {
    if (isEditing) {
      setMaterias(materias.map(m => 
        m.id === currentItem.id ? currentItem : m
      ));
      toast.success(`Materia ${currentItem.nombre} actualizada correctamente`);
    } else {
      const newId = String(materias.length + 1);
      setMaterias([...materias, { ...currentItem, id: newId }]);
      toast.success(`Materia ${currentItem.nombre} creada correctamente`);
    }
    setOpenMateriaDialog(false);
  };
  
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Gestión de Instituciones</h1>
              <Button onClick={() => handleInstitucionDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Institución
              </Button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {instituciones.map((institucion) => (
                <Card 
                  key={institucion.id}
                  className={
                    selectedInstitucion?.id === institucion.id
                      ? "border-primary"
                      : ""
                  }
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>{institucion.nombre}</CardTitle>
                      <CardDescription>{institucion.tipo}</CardDescription>
                    </div>
                    <div className="h-9 w-9 rounded-lg bg-primary/10 p-2 text-primary">
                      <School className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{institucion.ubicacion}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedInstitucion(institucion)}
                      >
                        Seleccionar
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleInstitucionDialog(institucion)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedInstitucion && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  Gestión de {selectedInstitucion.nombre}
                </h2>
                
                <Tabs defaultValue="aulas">
                  <TabsList className="mb-4">
                    <TabsTrigger value="aulas">Aulas</TabsTrigger>
                    <TabsTrigger value="carreras">Carreras</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="aulas" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium">Aulas</h3>
                      <Button onClick={() => handleAulaDialog()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Aula
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Capacidad</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAulas.length > 0 ? (
                            filteredAulas.map((aula) => (
                              <TableRow key={aula.id}>
                                <TableCell>{aula.id}</TableCell>
                                <TableCell>{aula.nombre}</TableCell>
                                <TableCell>{aula.tipo}</TableCell>
                                <TableCell>{aula.capacidad}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleAulaDialog(aula)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Editar</span>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center">
                                No hay aulas registradas
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="carreras" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium">Carreras</h3>
                      <Button onClick={() => handleCarreraDialog()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Carrera
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCarreras.length > 0 ? (
                            filteredCarreras.map((carrera) => (
                              <TableRow 
                                key={carrera.id}
                                className={
                                  selectedCarrera?.id === carrera.id
                                    ? "bg-accent/50"
                                    : ""
                                }
                              >
                                <TableCell>{carrera.id}</TableCell>
                                <TableCell>{carrera.nombre}</TableCell>
                                <TableCell>{carrera.codigo}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedCarrera(carrera)}
                                    >
                                      Seleccionar
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleCarreraDialog(carrera)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Editar</span>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center">
                                No hay carreras registradas
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {selectedCarrera && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium">
                            Ciclos de {selectedCarrera.nombre}
                          </h3>
                          <Button onClick={() => handleCicloDialog()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Ciclo
                          </Button>
                        </div>
                        
                        <div className="rounded-lg border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Sección</TableHead>
                                <TableHead>Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredCiclos.length > 0 ? (
                                filteredCiclos.map((ciclo) => (
                                  <TableRow 
                                    key={ciclo.id}
                                    className={
                                      selectedCiclo?.id === ciclo.id
                                        ? "bg-accent/50"
                                        : ""
                                    }
                                  >
                                    <TableCell>{ciclo.id}</TableCell>
                                    <TableCell>{ciclo.nombre}</TableCell>
                                    <TableCell>{ciclo.seccion}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => setSelectedCiclo(ciclo)}
                                        >
                                          Seleccionar
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => handleCicloDialog(ciclo)}
                                        >
                                          <Edit className="h-4 w-4" />
                                          <span className="sr-only">Editar</span>
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center">
                                    No hay ciclos registrados
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        
                        {selectedCiclo && (
                          <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-medium">
                                Materias de {selectedCiclo.nombre} - Sección {selectedCiclo.seccion}
                              </h3>
                              <Button onClick={() => handleMateriaDialog()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nueva Materia
                              </Button>
                            </div>
                            
                            <div className="rounded-lg border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Horas Totales</TableHead>
                                    <TableHead>Acciones</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {filteredMaterias.length > 0 ? (
                                    filteredMaterias.map((materia) => (
                                      <TableRow key={materia.id}>
                                        <TableCell>{materia.id}</TableCell>
                                        <TableCell>{materia.nombre}</TableCell>
                                        <TableCell>{materia.codigo}</TableCell>
                                        <TableCell>{materia.tipo}</TableCell>
                                        <TableCell>{materia.horasTotales}</TableCell>
                                        <TableCell>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleMateriaDialog(materia)}
                                          >
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Editar</span>
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  ) : (
                                    <TableRow>
                                      <TableCell colSpan={6} className="text-center">
                                        No hay materias registradas
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
          
          {/* Diálogo para crear/editar institución */}
          <Dialog open={openInstitucionDialog} onOpenChange={setOpenInstitucionDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Institución" : "Crear Institución"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Modifica los datos de la institución seleccionada" 
                    : "Completa el formulario para crear una nueva institución"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={currentItem?.nombre || ''}
                    onChange={(e) => setCurrentItem({...currentItem, nombre: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input
                    id="ubicacion"
                    value={currentItem?.ubicacion || ''}
                    onChange={(e) => setCurrentItem({...currentItem, ubicacion: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Input
                    id="tipo"
                    value={currentItem?.tipo || ''}
                    onChange={(e) => setCurrentItem({...currentItem, tipo: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenInstitucionDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveInstitucion}>
                  {isEditing ? "Guardar Cambios" : "Crear Institución"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Diálogo para crear/editar aula */}
          <Dialog open={openAulaDialog} onOpenChange={setOpenAulaDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Aula" : "Crear Aula"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Modifica los datos del aula seleccionada" 
                    : "Completa el formulario para crear una nueva aula"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre-aula">Nombre</Label>
                  <Input
                    id="nombre-aula"
                    value={currentItem?.nombre || ''}
                    onChange={(e) => setCurrentItem({...currentItem, nombre: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tipo-aula">Tipo</Label>
                  <Input
                    id="tipo-aula"
                    value={currentItem?.tipo || ''}
                    onChange={(e) => setCurrentItem({...currentItem, tipo: e.target.value})}
                    placeholder="Teórica, Laboratorio, etc."
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="capacidad">Capacidad</Label>
                  <Input
                    id="capacidad"
                    type="number"
                    value={currentItem?.capacidad || ''}
                    onChange={(e) => setCurrentItem({...currentItem, capacidad: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAulaDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveAula}>
                  {isEditing ? "Guardar Cambios" : "Crear Aula"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Diálogo para crear/editar carrera */}
          <Dialog open={openCarreraDialog} onOpenChange={setOpenCarreraDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Carrera" : "Crear Carrera"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Modifica los datos de la carrera seleccionada" 
                    : "Completa el formulario para crear una nueva carrera"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre-carrera">Nombre</Label>
                  <Input
                    id="nombre-carrera"
                    value={currentItem?.nombre || ''}
                    onChange={(e) => setCurrentItem({...currentItem, nombre: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="codigo-carrera">Código</Label>
                  <Input
                    id="codigo-carrera"
                    value={currentItem?.codigo || ''}
                    onChange={(e) => setCurrentItem({...currentItem, codigo: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCarreraDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveCarrera}>
                  {isEditing ? "Guardar Cambios" : "Crear Carrera"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Diálogo para crear/editar ciclo */}
          <Dialog open={openCicloDialog} onOpenChange={setOpenCicloDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Ciclo" : "Crear Ciclo"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Modifica los datos del ciclo seleccionado" 
                    : "Completa el formulario para crear un nuevo ciclo"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre-ciclo">Nombre</Label>
                  <Input
                    id="nombre-ciclo"
                    value={currentItem?.nombre || ''}
                    onChange={(e) => setCurrentItem({...currentItem, nombre: e.target.value})}
                    placeholder="Ej: Primer Ciclo"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="seccion">Sección</Label>
                  <Input
                    id="seccion"
                    value={currentItem?.seccion || ''}
                    onChange={(e) => setCurrentItem({...currentItem, seccion: e.target.value})}
                    placeholder="Ej: A, B, C"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCicloDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveCiclo}>
                  {isEditing ? "Guardar Cambios" : "Crear Ciclo"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Diálogo para crear/editar materia */}
          <Dialog open={openMateriaDialog} onOpenChange={setOpenMateriaDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Materia" : "Crear Materia"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Modifica los datos de la materia seleccionada" 
                    : "Completa el formulario para crear una nueva materia"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre-materia">Nombre</Label>
                  <Input
                    id="nombre-materia"
                    value={currentItem?.nombre || ''}
                    onChange={(e) => setCurrentItem({...currentItem, nombre: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="codigo-materia">Código</Label>
                  <Input
                    id="codigo-materia"
                    value={currentItem?.codigo || ''}
                    onChange={(e) => setCurrentItem({...currentItem, codigo: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tipo-materia">Tipo</Label>
                  <Input
                    id="tipo-materia"
                    value={currentItem?.tipo || ''}
                    onChange={(e) => setCurrentItem({...currentItem, tipo: e.target.value})}
                    placeholder="Teórica, Práctica, Teórica-Práctica"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="horas">Horas Totales</Label>
                  <Input
                    id="horas"
                    type="number"
                    value={currentItem?.horasTotales || ''}
                    onChange={(e) => setCurrentItem({...currentItem, horasTotales: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenMateriaDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveMateria}>
                  {isEditing ? "Guardar Cambios" : "Crear Materia"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
        </main>
      </div>
    </div>
  );
};

export default InstitucionesPage;
