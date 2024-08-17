import { defineConfig, preprocessCSS } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/translate': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/translate/, '/translate')
      },
      '/api/health': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/health/, '/health')
      },
      '/api/search': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search/, '/search')
      },
      '/api': {
        target: 'https://platform.fatsecret.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/oauth': {
        target: 'https://oauth.fatsecret.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth/, '')
      }
    }
  }
});
