// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://volanteseconomicos.vercel.app',
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
