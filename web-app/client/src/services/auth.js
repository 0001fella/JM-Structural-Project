// src/services/auth.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Handle API response with unified structure
 */
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const defaultMsg = response.status >= 500
      ? 'Server error. Please try again later.'
      : 'Something went wrong.';

    throw new Error(
      data.message ||
      (response.status === 401 && 'Invalid credentials') ||
      (response.status === 400 && 'Invalid request data') ||
      (response.status === 409 && 'Email already exists') ||
      defaultMsg
    );
  }

  // Ensure required fields exist
  if (!data?.user || !data?.token) {
    throw new Error('Invalid response from server. Missing user or token.');
  }

  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role || 'user',
    token: data.token,
  };
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} Authenticated user object
 */
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error('Login error:', err);
    throw new Error(err.message || 'Login failed. Try again.');
  }
};

/**
 * Register user
 * @param {Object} userData - { name, email, password, ... }
 * @returns {Promise<Object>} Registered user object
 */
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error('Registration error:', err);
    throw new Error(err.message || 'Registration failed. Try again.');
  }
};

/**
 * Logout the user and clear local storage
 */
export const logoutUser = () => {
  localStorage.removeItem('user');
  // Optionally clear other secure items (tokens, prefs)
};
