// src/pages/Dashboard.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    console.log('Usuario actual:', currentUser); //Verifica si el usuario está autenticado
    if (currentUser) {
      setUser(currentUser);
    } else{
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold text-gray-800">Mi Aplicación</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Bienvenido, {user.name}</span>
              <button
                onClick={() => navigate('/profile')}
                className="ml-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Mi Perfil
              </button>
              <button
                onClick={handleLogout}
                className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Panel Principal</h2>
            <p className="text-gray-600">¡Has iniciado sesión exitosamente!</p>
            {/* Aquí puedes agregar el contenido principal del dashboard */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;