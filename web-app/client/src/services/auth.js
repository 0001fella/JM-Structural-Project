// src/services/auth.js
import API from './api';

export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await API.post('/auth/refresh-token', { refreshToken });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    throw error.response?.data || { message: 'Token refresh failed' };
  }
};
