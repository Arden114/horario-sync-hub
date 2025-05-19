
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./pages/LoginPage";
import PerfilPage from "./pages/PerfilPage";
import UsuariosPage from "./pages/UsuariosPage";
import InstitucionesPage from "./pages/InstitucionesPage";
import DisponibilidadesPage from "./pages/DisponibilidadesPage";
import HorariosPage from "./pages/HorariosPage";
import { useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRoles?: Array<'coordinador' | 'docente'>; 
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) {
    // You might want to add a loading spinner here
    return <div>Cargando...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute element={<Index />} />} />
      <Route path="/perfil" element={<ProtectedRoute element={<PerfilPage />} />} />
      <Route path="/usuarios" element={<ProtectedRoute element={<UsuariosPage />} allowedRoles={['coordinador']} />} />
      <Route path="/instituciones" element={<ProtectedRoute element={<InstitucionesPage />} allowedRoles={['coordinador']} />} />
      <Route path="/disponibilidades" element={<ProtectedRoute element={<DisponibilidadesPage />} />} />
      <Route path="/horarios" element={<ProtectedRoute element={<HorariosPage />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
