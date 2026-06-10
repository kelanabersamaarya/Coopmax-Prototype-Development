import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { dyadComponentTagger } from "dyad-component-tagger";

function manualChunks(id: string) {
  if (!id.includes("node_modules")) return undefined;

  const normalizedId = id.replace(/\\/g, "/");

  if (
    normalizedId.includes("/react/") ||
    normalizedId.includes("/react-dom/") ||
    normalizedId.includes("/react-router-dom/") ||
    normalizedId.includes("/scheduler/")
  ) {
    return "vendor-react";
  }

  if (normalizedId.includes("/@tanstack/react-query/")) {
    return "vendor-query";
  }

  if (normalizedId.includes("/@radix-ui/")) {
    return "vendor-radix";
  }

  if (
    normalizedId.includes("/recharts/") ||
    normalizedId.includes("/d3-") ||
    normalizedId.includes("/victory-vendor/")
  ) {
    return "vendor-charts";
  }

  if (
    normalizedId.includes("/react-hook-form/") ||
    normalizedId.includes("/@hookform/") ||
    normalizedId.includes("/zod/")
  ) {
    return "vendor-forms";
  }

  if (
    normalizedId.includes("/date-fns/") ||
    normalizedId.includes("/lucide-react/") ||
    normalizedId.includes("/sonner/")
  ) {
    return "vendor-ui-utils";
  }

  return "vendor";
}

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
}));