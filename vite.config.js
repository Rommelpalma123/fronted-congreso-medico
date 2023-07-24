import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import macrosPlugin from 'babel-plugin-macros';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
