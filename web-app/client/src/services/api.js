// src/services/api.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const api = axios.create({ baseURL: '/api' });

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = useAuth();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const { status } = error.response;
    
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newAccessToken = await refreshToken(refreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh error (logout user)
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;