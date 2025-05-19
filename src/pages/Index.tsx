
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Navigate } from 'react-router-dom';
import { CoordinadorDashboard } from '@/components/dashboard/CoordinadorDashboard';
import { DocenteDashboard } from '@/components/dashboard/DocenteDashboard';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {user?.rol === 'coordinador' ? <CoordinadorDashboard /> : <DocenteDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Index;
