// src/pages/Profile.js
import { useState, useEffect } from 'react';
import userService from '../services/userService';
import authService from '../services/authService';

function Profile() {
  const [userData, setUserData] = useState({ name: '', mail: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await userService.getProfile();
        setUserData({
          name: response.data.name || '',     // Si el backend no envía "name"
          mail: response.data.mcli || '',    // Mapea "mcli" -> "mail"
        });
      } catch (err) {
        setError('Error al cargar los datos del perfil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // <-- Este es el ÚNICO useEffect

  // ... (resto del componente sin cambios)
}

export default Profile;