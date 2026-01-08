import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap-icons/font/bootstrap-icons.css']
  }
});
