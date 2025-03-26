// src/services/api.js
import axios from "axios";

// Crea la instancia base de Axios
const api = axios.create({
  baseURL: "http://localhost:8080/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage
    if (token) {
      config.headers["Authorization"] = token; // Agrega el token al header SIN "Bearer"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes("/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;;