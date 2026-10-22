import axios from 'axios';

// Get base URL from environment, strip any accidental quotes, spaces, or trailing slashes
const rawBase = (import.meta.env.VITE_API_BASE_URL || '').trim();
const BASE_URL = rawBase.replace(/^["']+|["']+$/g, '').replace(/\/+$/, '');

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Only redirect to /login if the user is currently accessing an admin route
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
