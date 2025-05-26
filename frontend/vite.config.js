import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:2247',
        changeOrigin: true
      }
    },
    fs: {
      strict: false, // Allow serving files outside of the project root
      allow: ['src', 'public'] // Allow access to the parent directory
    }
  },
  build: {
    outDir: '../backend/client',
    emptyOutDir: true,
  }
})
