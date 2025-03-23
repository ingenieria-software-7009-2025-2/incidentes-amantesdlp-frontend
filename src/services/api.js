import axios from 'axios';

// Crear una instancia de axios con una URL base
const api = axios.create({
  baseURL: 'http://localhost:8080/v1', // URL del backend
  timeout: 5000, // Tiempo máximo de espera (5 segundos)
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar el token de autenticación en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores en las respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el error es 401 (No autorizado), podríamos redirigir al login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;