
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Search, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

// Mock de datos de usuarios
const mockUsuarios = [
  { 
    id: '1',
    nombreCompleto: 'Admin Usuario',
    usuario: 'admin',
    especialidad: '-',
    rol: 'coordinador',
    estado: true
  },
  { 
    id: '2',
    nombreCompleto: 'Juan Pérez',
    usuario: 'jperez', 
    especialidad: 'Matemáticas',
    rol: 'docente',
    estado: true
  },
  { 
    id: '3',
    nombreCompleto: 'María González',
    usuario: 'mgonzalez', 
    especialidad: 'Física',
    rol: 'docente',
    estado: true
  },
  { 
    id: '4',
    nombreCompleto: 'Carlos Rodríguez',
    usuario: 'crodriguez', 
    especialidad: 'Programación',
    rol: 'docente',
    estado: false
  }
];

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Filtrar usuarios según búsqueda
  const filteredUsers = usuarios.filter(user => 
    user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar cambio de estado de usuario
  const handleToggleStatus = (id: string) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, estado: !user.estado } : user
    ));
    
    const user = usuarios.find(u => u.id === id);
    if (user) {
      toast.success(`Usuario ${user.usuario} ${!user.estado ? 'activado' : 'desactivado'} correctamente`);
    }
  };

  // Abrir diálogo para editar usuario
  const openEditDialog = (user: any) => {
    setSelectedUser({ ...user });
    setIsEditing(true);
    setOpenDialog(true);
  };

  // Abrir diálogo para crear usuario
  const openCreateDialog = () => {
    setSelectedUser({
      id: '',
      nombreCompleto: '',
      usuario: '',
      password: '',
      especialidad: '',
      rol: 'docente',
      estado: true
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  // Guardar cambios de usuario
  const handleSaveUser = () => {
    if (isEditing) {
      // Editar usuario existente
      setUsuarios(usuarios.map(user => 
        user.id === selectedUser.id ? selectedUser : user
      ));
      toast.success(`Usuario ${selectedUser.usuario} actualizado correctamente`);
    } else {
      // Crear nuevo usuario
      const newId = String(usuarios.length + 1);
      setUsuarios([...usuarios, { ...selectedUser, id: newId }]);
      toast.success(`Usuario ${selectedUser.usuario} creado correctamente`);
    }
    
    setOpenDialog(false);
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.nombreCompleto}</TableCell>
                      <TableCell>{user.usuario}</TableCell>
                      <TableCell>{user.especialidad}</TableCell>
                      <TableCell className="capitalize">{user.rol}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch
                            checked={user.estado}
                            onCheckedChange={() => handleToggleStatus(user.id)}
                          />
                          <span className="ml-2 text-xs">
                            {user.estado ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Usuario" : "Crear Usuario"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Modifica los datos del usuario seleccionado" 
                    : "Completa el formulario para crear un nuevo usuario"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                  <Input
                    id="nombreCompleto"
                    value={selectedUser?.nombreCompleto || ''}
                    onChange={(e) => setSelectedUser({...selectedUser, nombreCompleto: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="usuario">Usuario</Label>
                  <Input
                    id="usuario"
                    value={selectedUser?.usuario || ''}
                    onChange={(e) => setSelectedUser({...selectedUser, usuario: e.target.value})}
                  />
                </div>
                
                {!isEditing && (
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={selectedUser?.password || ''}
                      onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})}
                    />
                  </div>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="especialidad">Especialidad</Label>
                  <Input
                    id="especialidad"
                    value={selectedUser?.especialidad || ''}
                    onChange={(e) => setSelectedUser({...selectedUser, especialidad: e.target.value})}
                    placeholder={selectedUser?.rol === 'coordinador' ? '-' : ''}
                    disabled={selectedUser?.rol === 'coordinador'}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select
                    value={selectedUser?.rol || 'docente'}
                    onValueChange={(value) => setSelectedUser({...selectedUser, rol: value})}
                  >
                    <SelectTrigger id="rol">
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coordinador">Coordinador</SelectItem>
                      <SelectItem value="docente">Docente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="estado"
                    checked={selectedUser?.estado || false}
                    onCheckedChange={(checked) => setSelectedUser({...selectedUser, estado: checked})}
                  />
                  <Label htmlFor="estado">Usuario Activo</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveUser}>
                  {isEditing ? "Guardar Cambios" : "Crear Usuario"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
        </main>
      </div>
    </div>
  );
};

export default UsuariosPage;
