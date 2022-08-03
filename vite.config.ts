import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true,
      port : 3500,
      proxy: {
          '/search/': {
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
            secure: false,
          },
          '/auth': {
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
            secure: false,
          },
          '/user': {
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
            secure: false,
          },
          '/check': {
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
            secure: false,
          },
      }
      
  },


})