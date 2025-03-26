// src/services/authService.js
import api from './api';

const authService = {
  login: async (mail, password) => {
    try {
      const response = await api.post('/users/login', { mail, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          mail: response.data.mail,
        }));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al iniciar sesión';
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data', error);
      localStorage.removeItem('user');
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;