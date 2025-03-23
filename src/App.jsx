import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import authService from './services/authService';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Verificar autenticación al cargar la aplicación
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas (requieren autenticación) */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
        {/* Redirigir la ruta raíz a login o dashboard según autenticación */}
        <Route path="/" element={
          authService.isAuthenticated() 
            ? <Navigate to="/dashboard" /> 
            : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;