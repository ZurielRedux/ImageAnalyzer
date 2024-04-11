import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// const isProduction = (process.env.NODE_ENV = "production");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000/",
        // azure func url
        // target: "https://image-analyzer-func-app.azurewebsites.net/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
