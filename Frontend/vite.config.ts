import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const defaultConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    const isDev = mode === "development";

    return {
      ...defaultConfig,
      server: {
        proxy: {
          "/api": {
            target: isDev
              ? "http://127.0.0.1:7071"
              : "https://image-analyzer-func-app.azurewebsites.net",
            changeOrigin: isDev,
            secure: !isDev,
          },
        },
      },
    };
  } else {
    return defaultConfig;
  }
});
