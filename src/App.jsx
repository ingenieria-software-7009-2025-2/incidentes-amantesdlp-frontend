// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import authService from './services/authService';
import userService from './services/userService';

const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (authService.isAuthenticated()) {
        try {
          await userService.getProfile();
        } catch (error) {
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
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