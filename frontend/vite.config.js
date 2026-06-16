import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three'
          }
          if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('framer-motion')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
