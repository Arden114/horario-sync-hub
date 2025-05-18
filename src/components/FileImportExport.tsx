
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Upload,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

interface FileImportExportProps {
  onImport: (data: any[]) => void;
  onExport: () => any[];
  entityName: string;
}

export function FileImportExport({ onImport, onExport, entityName }: FileImportExportProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
      toast.error('Por favor seleccione un archivo CSV o Excel.');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        // Para un caso real, aquí se procesaría el archivo según su tipo
        // Para la demo, simplemente simulamos datos
        const mockData = [
          { id: 'imported1', nombre: 'Importado 1', tipo: 'Importado' },
          { id: 'imported2', nombre: 'Importado 2', tipo: 'Importado' }
        ];
        
        onImport(mockData);
        toast.success(`${entityName} importados correctamente`);
      } catch (error) {
        toast.error(`Error al importar ${entityName.toLowerCase()}: ${error}`);
      }
    };

    reader.onerror = () => {
      toast.error('Error al leer el archivo');
    };

    // Para CSV leemos como texto, para Excel como ArrayBuffer
    if (fileExtension === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
    
    // Limpiamos el input para permitir seleccionar el mismo archivo nuevamente
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleExport = () => {
    try {
      const data = onExport();
      
      // En una aplicación real, aquí convertiríamos los datos a CSV/Excel
      // Para la demo, solo mostramos un mensaje de éxito
      
      // Simulamos la descarga de un archivo
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = `${entityName.toLowerCase()}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast.success(`${entityName} exportados correctamente`);
    } catch (error) {
      toast.error(`Error al exportar ${entityName.toLowerCase()}: ${error}`);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.xlsx"
        className="hidden"
      />
      
      <Button 
        variant="outline" 
        onClick={handleImportClick}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Importar
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleExport}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Exportar
      </Button>
    </div>
  );
}
