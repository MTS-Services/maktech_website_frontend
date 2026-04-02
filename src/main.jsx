/**
 * Main Application Entry Point
 *
 * This file is the entry point for the React application.
 * It renders the root App component into the DOM and sets up:
 * - React StrictMode for highlighting potential problems
 * - Redux Provider for global state management
 * - React Router for navigation
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';
import { store } from './features/store.js';

// Create root element and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* Redux Provider makes the store available to all components */}
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
