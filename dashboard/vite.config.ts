import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
  },
});
