import api from './api';

const authService = {
  // Iniciar sesión
  login: async (mail, password) => {
    try {
      const response = await api.post('/users/login', { mail, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        mail: response.data.mail,
      })); // Guardar el usuario en localStorage
    }
    return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al iniciar sesión';
    }
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
    console.log('Logged out');
    console.log('Token:', localStorage.getItem('token'));
    console.log('User:', localStorage.getItem('user'));
  },
  
  // Obtener el usuario actual
  getCurrentUser: () => {
      try {
        const user = localStorage.getItem('user');
        if(!user || user === 'undefined') {
          return null;
        }else{
          return JSON.parse(user);
        }
      }catch(error){
        console.error('Error parsing user data', error);
        localStorage.removeItem('user'); //Limpia datos corruptos
        return null;
      }
    },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;