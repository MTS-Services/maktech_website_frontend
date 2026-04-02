import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    target: 'es2017',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/lenis')
          ) {
            return 'vendor-animation';
          }
          if (
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/@remix-run')
          ) {
            return 'vendor-router';
          }
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'vendor-react';
          }
          if (
            id.includes('node_modules/@reduxjs') ||
            id.includes('node_modules/react-redux') ||
            id.includes('node_modules/immer') ||
            id.includes('node_modules/redux')
          ) {
            return 'vendor-redux';
          }
          if (
            id.includes('node_modules/recharts') ||
            id.includes('node_modules/d3-') ||
            id.includes('node_modules/victory-')
          ) {
            return 'vendor-charts';
          }
          if (
            id.includes('node_modules/react-icons') ||
            id.includes('node_modules/react-toastify')
          ) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
});
