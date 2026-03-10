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

import axios from 'axios'

/**
 * Base API URL
 * In production, use environment variables:
 * const BASE_URL = import.meta.env.VITE_API_BASE_URL
 */
const BASE_URL = 'https://fakestoreapi.com'

/**
 * Create Axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

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
    const token = localStorage.getItem('authToken')
    
    // Add token to headers if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url)
    }

    return config
  },
  (error) => {
    // Handle request error
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

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
      console.log('API Response:', response.status, response.config.url)
    }

    // Return response data directly
    return response
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.error('Unauthorized access - logging out')
          localStorage.removeItem('authToken')
          // window.location.href = '/login'
          break
        
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        
        case 404:
          // Not found
          console.error('Resource not found')
          break
        
        case 500:
          // Server error
          console.error('Server error')
          break
        
        default:
          console.error('API Error:', status, data)
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received')
    } else {
      // Error in request configuration
      console.error('Request configuration error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default apiClient
