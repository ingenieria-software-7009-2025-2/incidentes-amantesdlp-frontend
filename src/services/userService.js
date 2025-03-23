import api from './api';

const userService = {
  // Obtener información del usuario actual
  getProfile: async () => {
    return api.get('/users/me');
  },
  
  // Actualizar información del usuario
  updateProfile: async (userData) => {
    return api.put('/users/me', userData);
  }
};

export default userService;