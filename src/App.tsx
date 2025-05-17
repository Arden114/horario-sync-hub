
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PerfilPage from "./pages/PerfilPage";
import UsuariosPage from "./pages/UsuariosPage";
import InstitucionesPage from "./pages/InstitucionesPage";
import DisponibilidadesPage from "./pages/DisponibilidadesPage";
import HorariosPage from "./pages/HorariosPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/instituciones" element={<InstitucionesPage />} />
              <Route path="/disponibilidades" element={<DisponibilidadesPage />} />
              <Route path="/horarios" element={<HorariosPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
