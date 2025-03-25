import api from './api';

const authService = {
  // Iniciar sesión
  login: async (mail, password) => {
    const response = await api.post('/users/login', { mail, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Guardar el usuario en localStorage
    }
    return response.data;
  },
  
  // Registrar un nuevo usuario
  register: async (userData) => {
    const response = await api.post('/users/create', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Obtener el usuario actual
  getCurrentUser: () => {
      // const user = localStorage.getItem('user');
      // if (user) {
      //   try {
      //     return JSON.parse(user);
      //   } catch (error) {
      //     console.error('Error al analizar el usuario:', error);
      //     return null;
      //   }
      // }
      // return null;
      return JSON.parse(localStorage.getItem('user'));
    },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;