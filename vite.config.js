import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port: 3000,
    cors: true,
    https: false,
    proxy: {
      '/youda': {
          target: 'http://192.168.199.141:1111/youda',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/youda/, '')
      }
    },
  }
})
