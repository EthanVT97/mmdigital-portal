import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    host: true,
    strictPort: false, // Allow fallback to next available port
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  optimizeDeps: {
    force: true
  },
  clearScreen: false
});
