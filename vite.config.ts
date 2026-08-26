import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    tailwindcss(),
    react(),
    nitro({ preset: "vercel" }),
  ],
  resolve: {
    // Use Vite's native tsconfig paths resolution instead of plugin
    tsconfigPaths: true,
    alias: {
      "@": "/src",
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: "::",
    port: 8080,
    // Optimize dev server settings for Nitro compatibility
    middlewareMode: false,
    watch: {
      // Ignore nitro build output to prevent rebuild loops
      ignored: ["**/.output/**", "**/dist/**"],
    },
  },
  build: {
    // Optimal build output settings
    sourcemap: false,
  },
});
