import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
    }),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
});
