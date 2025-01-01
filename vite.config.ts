import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  server: {
    host: true, // This exposes the server to your local network
    port: 5173, // Default Vite port
  }
})