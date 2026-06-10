import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (
            id.includes("react/") ||
            id.includes("react-dom/") ||
            id.includes("react-router-dom")
          ) {
            return "react-vendor";
          }

          if (id.includes("@tanstack/react-query")) {
            return "query-vendor";
          }

          if (id.includes("@radix-ui")) {
            return "radix-vendor";
          }

          if (
            id.includes("recharts") ||
            id.includes("d3-") ||
            id.includes("victory")
          ) {
            return "charts-vendor";
          }

          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("zod")
          ) {
            return "forms-vendor";
          }

          if (
            id.includes("lucide-react") ||
            id.includes("sonner") ||
            id.includes("clsx") ||
            id.includes("tailwind-merge") ||
            id.includes("class-variance-authority")
          ) {
            return "ui-utils-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});