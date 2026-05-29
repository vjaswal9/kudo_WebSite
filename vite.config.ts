import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Prerendering options for vite-react-ssg.
  // dirStyle 'flat' emits /about.html (served by GitHub Pages at /about),
  // which matches the existing trailing-slash-free canonical URLs.
  ssgOptions: {
    dirStyle: "flat",
    formatting: "minify",
  },
  // react-helmet-async ships CommonJS; bundling it for the prerender pass
  // avoids the "HelmetProvider is not exported" ESM error.
  ssr: {
    noExternal: ["react-helmet-async"],
  },
}));
