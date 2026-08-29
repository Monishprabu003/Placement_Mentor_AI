import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/predict': 'http://localhost:5001',
      '/analyze-image': 'http://localhost:5001',
      '/analyze-video': 'http://localhost:5001',
      '/calculate-final-score': 'http://localhost:5001',
      '/outputs': 'http://localhost:5001',
      '/api': 'http://localhost:5001',
    },
  },
});
