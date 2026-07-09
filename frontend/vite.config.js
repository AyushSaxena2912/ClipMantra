import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
    ],
  },
  server: {
    port: 5180,
    strictPort: true,
    host: true,
    allowedHosts: true,
    cors: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },
});
