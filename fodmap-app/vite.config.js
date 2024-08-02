import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/translate': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/translate/, '/translate')
      },
      '/api/search': {
        target: 'http://localhost:3000',
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
