import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  build: { outDir: 'dist', sourcemap: true },
  server: {
    port: 3000,
    host: true
  }
});