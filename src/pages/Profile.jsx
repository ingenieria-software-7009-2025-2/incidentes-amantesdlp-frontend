import { useState, useEffect } from 'react';
import userService from '../services/userService';
import authService from '../services/authService';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    mail: '',
  });
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
        console.log("Datos recibidos del backend:", response.data); // Para depuración
        setUserData({
          name: response.data.name || '',     // Si no hay nombre, muestra cadena vacía
          mail: response.data.mail || '',    // Muestra el valor exacto del backend (puede ser "9")
        });
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setError('Error al cargar los datos del perfil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await userService.updateProfile(userData);
      setSuccess('Perfil actualizado con éxito');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Mi Perfil</h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{success}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${
                  !isEditing ? 'bg-gray-100' : ''
                }`}
              />
            </div>

            <div>
              <label htmlFor="mail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="mail"
                name="mail"
                type="text"
                value={userData.mail}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                {userData.mail ? "El mail no se puede modificar" : "No hay correo registrado"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Editar Perfil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;