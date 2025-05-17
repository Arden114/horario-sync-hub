
import React from 'react';
import { StatCard } from './StatCard';
import { Users, School, Calendar, Clock, BookOpen } from 'lucide-react';

export function CoordinadorDashboard() {
  // Datos de muestra para el dashboard
  const stats = [
    { 
      title: 'Usuarios', 
      value: '24', 
      description: '8 docentes activos', 
      icon: <Users className="h-5 w-5" />,
      to: '/usuarios'
    },
    { 
      title: 'Instituciones', 
      value: '3', 
      description: '12 aulas disponibles', 
      icon: <School className="h-5 w-5" />,
      to: '/instituciones'
    },
    { 
      title: 'Horarios', 
      value: '18', 
      description: 'Período 2024-B', 
      icon: <Calendar className="h-5 w-5" />,
      to: '/horarios'
    },
    { 
      title: 'Disponibilidades', 
      value: '85%', 
      description: 'Docentes con disponibilidad', 
      icon: <Clock className="h-5 w-5" />,
      to: '/disponibilidades'
    },
    { 
      title: 'Materias', 
      value: '42', 
      description: 'En 8 carreras', 
      icon: <BookOpen className="h-5 w-5" />,
      to: '/instituciones'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Coordinador</h2>
        <p className="text-muted-foreground">
          Bienvenido al sistema de gestión de horarios académicos
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Período Académico</h3>
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
            <div className="flex items-center justify-between">
              <span className="text-sm">Estado:</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                Activo
              </span>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Actividad Reciente</h3>
          <div className="mt-4 space-y-3">
            {[
              { user: 'Admin', action: 'Publicó horarios de Ingeniería', time: '12:30 PM' },
              { user: 'Juan Pérez', action: 'Actualizó disponibilidad', time: '10:15 AM' },
              { user: 'Admin', action: 'Agregó nueva aula: Lab 103', time: 'Ayer' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
