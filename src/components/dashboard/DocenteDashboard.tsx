
import React from 'react';
import { StatCard } from './StatCard';
import { Calendar, Clock, User } from 'lucide-react';

export function DocenteDashboard() {
  // Datos de muestra para el dashboard de docente
  const stats = [
    { 
      title: 'Mi Disponibilidad', 
      value: '24h', 
      description: 'Horas semanales disponibles', 
      icon: <Clock className="h-5 w-5" />,
      to: '/disponibilidades'
    },
    { 
      title: 'Mi Horario', 
      value: '18h', 
      description: 'Horas asignadas esta semana', 
      icon: <Calendar className="h-5 w-5" />,
      to: '/horarios'
    },
    { 
      title: 'Mi Perfil', 
      value: 'Docente', 
      description: 'Ver datos personales', 
      icon: <User className="h-5 w-5" />,
      to: '/perfil'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Docente</h2>
        <p className="text-muted-foreground">
          Bienvenido al sistema de gestión de horarios académicos
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Período Académico Actual</h3>
          <div className="mt-4 grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Nombre:</span>
              <span className="font-medium">2024-B</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Fecha inicio:</span>
              <span className="font-medium">01/06/2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Fecha fin:</span>
              <span className="font-medium">30/09/2024</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Próximas Clases</h3>
          <div className="mt-4 space-y-3">
            {[
              { class: 'Matemáticas Avanzadas', location: 'Aula 201', time: 'Lunes, 10:00 - 12:00' },
              { class: 'Cálculo', location: 'Aula 305', time: 'Martes, 15:00 - 17:00' },
              { class: 'Estadística', location: 'Lab 102', time: 'Miércoles, 08:00 - 10:00' },
            ].map((classItem, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div>
                  <p className="font-medium">{classItem.class}</p>
                  <p className="text-sm text-muted-foreground">{classItem.location}</p>
                </div>
                <span className="text-xs text-muted-foreground">{classItem.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
