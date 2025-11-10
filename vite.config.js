import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_APP_URL,
          changeOrigin: true,
          secure: false,
        },
        '^/sanctum/csrf-cookie': {
          target: env.VITE_APP_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Sesuaikan path base untuk deploy
    base: '/build/',

    plugins: [
      laravel({
        input: ['resources/js/app.jsx'],
        refresh: true,
      }),
      react(),
    ],

    build: {
      outDir: '../public_html/build', // tempat hasil build
      emptyOutDir: true,
      manifest: true,
    },
  };
});
