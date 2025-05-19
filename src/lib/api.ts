
/**
 * API Utilities for the La Pontificia Horarios System
 * Handles connections to the Django REST Framework backend with JWT authentication
 */

// Base URL for API requests - adjust as needed for your environment
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Handles API errors consistently
 */
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      statusText: response.statusText,
      data: errorData
    };
  }
  return response;
};

/**
 * Refresh access token using the stored refresh token
 */
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) return null;
  
  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    const data = await response.json();
    
    if (data.access) {
      localStorage.setItem('accessToken', data.access);
      return data.access;
    }
    
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

/**
 * Fetch wrapper that automatically adds authentication token and handles token refresh
 */
export const fetchWithAuth = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  // Get the stored access token
  let accessToken = localStorage.getItem('accessToken');
  
  // Initialize headers
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  
  // Create the request with auth header
  const request = new Request(
    url.startsWith('http') ? url : `${API_BASE_URL}${url}`,
    {
      ...options,
      headers
    }
  );
  
  // Attempt the fetch
  let response = await fetch(request);
  
  // If unauthorized, try to refresh the token
  if (response.status === 401 && accessToken) {
    const newToken = await refreshAccessToken();
    
    if (newToken) {
      // Update Authorization header with new token
      headers.set('Authorization', `Bearer ${newToken}`);
      
      // Retry the request with new token
      response = await fetch(
        url.startsWith('http') ? url : `${API_BASE_URL}${url}`,
        {
          ...options,
          headers
        }
      );
    } else {
      // If token refresh fails, clear tokens and show error
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Throw error to be handled by the calling function
      throw new Error('Session expired. Please login again.');
    }
  }
  
  return handleApiError(response);
};

/**
 * API functions for authentication
 */
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    return handleApiError(response).then(res => res.json());
  },
  
  getProfile: async () => {
    const response = await fetchWithAuth('/perfil/');
    return response.json();
  }
};

/**
 * API functions for usuarios (users)
 */
export const usuariosApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/usuarios/');
    return response.json();
  },
  
  create: async (userData: any) => {
    const response = await fetchWithAuth('/usuarios/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response.json();
  },
  
  update: async (id: string, userData: any) => {
    const response = await fetchWithAuth(`/usuarios/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/usuarios/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};

/**
 * API functions for instituciones (institutions)
 */
export const institucionesApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/instituciones/');
    return response.json();
  },
  
  create: async (institucionData: any) => {
    const response = await fetchWithAuth('/instituciones/', {
      method: 'POST',
      body: JSON.stringify(institucionData),
    });
    return response.json();
  },
  
  update: async (id: string, institucionData: any) => {
    const response = await fetchWithAuth(`/instituciones/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(institucionData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/instituciones/${id}/`, {
      method: 'DELETE',
    });
    return response;
  },
  
  importarAulas: async (formData: FormData) => {
    const response = await fetchWithAuth('/instituciones/importar-aulas/', {
      method: 'POST',
      headers: {
        // Don't set Content-Type here, it will be set automatically for FormData
      },
      body: formData,
    });
    return response.json();
  },
  
  exportarAulas: async () => {
    const response = await fetchWithAuth('/instituciones/exportar-aulas/', {
      method: 'GET',
    });
    return response.blob();
  }
};

/**
 * API functions for carreras (careers)
 */
export const carrerasApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/carreras/');
    return response.json();
  },
  
  create: async (carreraData: any) => {
    const response = await fetchWithAuth('/carreras/', {
      method: 'POST',
      body: JSON.stringify(carreraData),
    });
    return response.json();
  },
  
  update: async (id: string, carreraData: any) => {
    const response = await fetchWithAuth(`/carreras/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(carreraData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/carreras/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};

/**
 * API functions for ciclos (cycles/terms)
 */
export const ciclosApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/ciclos/');
    return response.json();
  },
  
  create: async (cicloData: any) => {
    const response = await fetchWithAuth('/ciclos/', {
      method: 'POST',
      body: JSON.stringify(cicloData),
    });
    return response.json();
  },
  
  update: async (id: string, cicloData: any) => {
    const response = await fetchWithAuth(`/ciclos/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(cicloData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/ciclos/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};

/**
 * API functions for materias (subjects)
 */
export const materiasApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/materias/');
    return response.json();
  },
  
  create: async (materiaData: any) => {
    const response = await fetchWithAuth('/materias/', {
      method: 'POST',
      body: JSON.stringify(materiaData),
    });
    return response.json();
  },
  
  update: async (id: string, materiaData: any) => {
    const response = await fetchWithAuth(`/materias/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(materiaData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/materias/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};

/**
 * API functions for aulas (classrooms)
 */
export const aulasApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/aulas/');
    return response.json();
  },
  
  create: async (aulaData: any) => {
    const response = await fetchWithAuth('/aulas/', {
      method: 'POST',
      body: JSON.stringify(aulaData),
    });
    return response.json();
  },
  
  update: async (id: string, aulaData: any) => {
    const response = await fetchWithAuth(`/aulas/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(aulaData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/aulas/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};

/**
 * API functions for disponibilidades (availabilities)
 */
export const disponibilidadesApi = {
  getAll: async (docenteId?: string) => {
    const url = docenteId ? `/disponibilidades/?docente_id=${docenteId}` : '/disponibilidades/';
    const response = await fetchWithAuth(url);
    return response.json();
  },
  
  create: async (disponibilidadData: any) => {
    const response = await fetchWithAuth('/disponibilidades/', {
      method: 'POST',
      body: JSON.stringify(disponibilidadData),
    });
    return response.json();
  },
  
  update: async (id: string, disponibilidadData: any) => {
    const response = await fetchWithAuth(`/disponibilidades/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(disponibilidadData),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/disponibilidades/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};

/**
 * API functions for horarios (schedules)
 */
export const horariosApi = {
  getAll: async () => {
    const response = await fetchWithAuth('/horarios/');
    return response.json();
  },
  
  generar: async (params: any) => {
    const response = await fetchWithAuth('/horarios/generar/', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetchWithAuth(`/horarios/${id}/`, {
      method: 'DELETE',
    });
    return response;
  }
};
