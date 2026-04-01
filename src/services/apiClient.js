/**
 * Axios API Client Configuration
 *
 * This file sets up a centralized Axios instance with:
 * - Base URL configuration
 * - Default headers
 * - Request interceptors (for auth tokens, etc.)
 * - Response interceptors (for error handling)
 *
 * Usage:
 * Import this instead of axios directly for consistent configuration
 *
 * Example:
 * import apiClient from '@/services/apiClient'
 * apiClient.get('/endpoint')
 */

import axios from 'axios';

/**
 * Base API URL — set VITE_API_BASE_URL in your .env file.
 * Never hard-code a third-party or production endpoint here.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Create Axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 *
 * Intercepts all outgoing requests to add:
 * - Authentication tokens
 * - Custom headers
 * - Request logging (in development)
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage (if exists)
    const token = localStorage.getItem('authToken');

    // Add token to headers if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('Request Error:', error);
    }
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 *
 * Intercepts all incoming responses to handle:
 * - Success responses
 * - Error responses
 * - Token expiration
 * - Network errors
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', response.status, response.config.url);
    }

    // Return response data directly
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (import.meta.env.DEV) {
        console.error('API Error:', status, error.response.data);
      }

      if (status === 401) {
        // Session expired — clear local token and force re-login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    } else if (import.meta.env.DEV) {
      console.error('Network / config error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
