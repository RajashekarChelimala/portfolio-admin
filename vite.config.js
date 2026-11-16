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
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('jodit')) return 'vendor-jodit';
              if (id.includes('@mui') || id.includes('@emotion')) return 'vendor-mui';
              if (id.includes('react-loader-spinner')) return 'vendor-loader';
              if (id.includes('react-icons') || id.includes('@fortawesome')) return 'vendor-icons';
              if (id.includes('reactstrap') || id.includes('bootstrap')) return 'vendor-bootstrap';
              if (id.includes('tsparticles') || id.includes('react-tsparticles')) return 'vendor-particles';
            }
          },
        },
      },
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
