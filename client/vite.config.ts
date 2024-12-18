import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the build output directory is set to 'dist'
    assetsDir: 'assets', // Optional: specify where to store static assets like images
  },
  server: {
    proxy: {
      // Proxy API requests to the target server
      '/api': {
        target: 'http://localhost:5173',  // The server you want to proxy requests to
        changeOrigin: true,               // Optionally change the origin of the host header
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path (if needed)
      },
    },
  },
});