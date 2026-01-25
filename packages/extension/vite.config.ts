import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'global': 'globalThis',
    'process.env': '{}',
    'process.browser': 'true',
  },
  resolve: {
    alias: {
      buffer: 'buffer/',
      process: 'process/browser',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      events: 'events',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'crypto-browserify', 'stream-browserify', 'events', 'ed25519-hd-key', 'create-hmac'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    },
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html'),
        background: resolve(__dirname, 'src/scripts/background.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'popup' ? 'popup.js' : `${chunkInfo.name}.js`;
        },
      },
    },
  },
  publicDir: 'public',
  plugins: [
    react(),
    {
      name: 'move-popup-html',
      closeBundle() {
        // Move popup.html from dist/src/ to dist/ if it exists there
        const srcPath = join(__dirname, 'dist', 'src', 'popup.html');
        const destPath = join(__dirname, 'dist', 'popup.html');
        if (existsSync(srcPath)) {
          copyFileSync(srcPath, destPath);
        }
      },
    },
  ],
})
