// vite.config.js
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
    },
  },

  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
});
