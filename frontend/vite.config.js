import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
  // build: {
  //   outDir: '../backend/static',
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: 'src/main.jsx',
  //       admin: 'src/admin.jsx'
  //     },
  //     output: {
  //       entryFileNames: '[name].js',
  //       chunkFileNames: '[name].js',
  //       assetFileNames: '[name].[ext]'
  //     }
  //   }
  // }
})
