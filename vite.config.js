import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(env.REACT_APP_BACKEND_URL || 'http://localhost:5000'),
      'process.env.REACT_APP_PORT': JSON.stringify(env.REACT_APP_PORT || '5000'),
      'process.env.REACT_APP_CAPTCHA_SITE_KEY': JSON.stringify(env.REACT_APP_CAPTCHA_SITE_KEY || ''),
      'process.env': JSON.stringify(env),
    },
    build: {
      outDir: 'build',
      sourcemap: false,
    },
    server: {
      port: 3000,
      open: false,
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
  };
});
