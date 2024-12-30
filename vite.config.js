import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Ensure the React plugin is included
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of manually splitting large libraries
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit (in KB) if you want to suppress the warning
  },
});
