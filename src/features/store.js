/**
 * Redux Store Configuration
 * 
 * This file configures the central Redux store for the application.
 * The store manages all global state using Redux Toolkit's configureStore.
 * 
 * Features:
 * - Automatic Redux DevTools integration (in development)
 * - Built-in thunk middleware for async actions
 * - Immutability and serializability checks (in development)
 * 
 * How to add new slices:
 * 1. Import the reducer from your slice file
 * 2. Add it to the reducer object below
 * 
 * Example:
 * import productsReducer from './features/products/productsSlice'
 * 
 * reducer: {
 *   products: productsReducer
 * }
 */

import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice'

/**
 * Main Redux store instance
 * 
 * This store is provided to the entire application via the Provider
 * in main.jsx, making all state accessible to any component.
 */
export const store = configureStore({
  reducer: {
    // Add all feature reducers here
    products: productsReducer,
    // Future slices can be added here:
    // auth: authReducer,
    // users: usersReducer,
    // etc.
  },
  // Middleware and DevTools are automatically configured by Redux Toolkit
})

/**
 * Type exports for TypeScript (if needed in future)
 * export type RootState = ReturnType<typeof store.getState>
 * export type AppDispatch = typeof store.dispatch
 */
