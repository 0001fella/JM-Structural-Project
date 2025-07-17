import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // or whatever you want
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your Express backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
