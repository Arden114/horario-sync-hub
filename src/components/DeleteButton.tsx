
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  onDelete: () => void;
  entityName: string;
  disabled?: boolean;
}

export function DeleteButton({ onDelete, entityName, disabled = false }: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm" 
          disabled={disabled}
          className="flex items-center gap-1"
        >
          <Trash className="h-4 w-4" />
          <span>Borrar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente 
            {entityName.toLowerCase() === 'aulas' || entityName.toLowerCase() === 'carreras' || entityName.toLowerCase() === 'materias' ? 
              ` las ${entityName.toLowerCase()}` : 
              entityName.toLowerCase() === 'ciclos' ? 
                ` los ${entityName.toLowerCase()}` : 
                ` la ${entityName.toLowerCase()}`} 
            seleccionada y todos los datos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-destructive">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
