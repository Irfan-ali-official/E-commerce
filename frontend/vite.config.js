import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  optimizeDeps: {
    include: ["jwt-decode"],
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // The backend URL (port 3000)
        changeOrigin: true,
      },
    },
  },
});
