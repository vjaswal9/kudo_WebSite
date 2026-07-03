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
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor libraries into their own chunks so
        // browsers cache them once and reuse them across pages and future
        // deploys (only the small app code changes day to day).
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          // Isolate GSAP (used only by the homepage) so it is not pulled into
          // the shared vendor chunks that every route loads. Must come before
          // the react-vendor rule, whose "/react/" test would otherwise catch
          // the "@gsap/react" path.
          if (id.includes("/gsap/") || id.includes("@gsap")) return "gsap";
          if (id.includes("react-router") || id.includes("/react-dom/") || /\/react\//.test(id) || id.includes("/scheduler/")) return "react-vendor";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@radix-ui")) return "radix";
          return "vendor";
        },
      },
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
