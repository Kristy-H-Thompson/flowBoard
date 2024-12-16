import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the build output directory is set to 'dist'
    assetsDir: 'assets', // Optional: specify where to store static assets like images
  },
});