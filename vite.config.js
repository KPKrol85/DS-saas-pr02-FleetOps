import { resolve } from "node:path";
import { defineConfig } from "vite";

/**
 * FleetOps is a multi-page static site: every public route is a real HTML
 * document, and the demo application is hash-routed inside `index.html`.
 * Each maintained document below is a Vite/Rollup build entry so the produced
 * `dist/` mirrors the deployed URL structure exactly.
 */
const htmlEntries = [
  "index.html",
  "404.html",
  "product/index.html",
  "features/index.html",
  "pricing/index.html",
  "about/index.html",
  "contact/index.html",
  "security/index.html",
  "careers/index.html",
  "privacy/index.html",
  "terms/index.html",
  "cookies/index.html",
];

const toEntryName = (entry) => entry.replace(/\/index\.html$/, "").replace(/\.html$/, "");

const input = Object.fromEntries(
  htmlEntries.map((entry) => [toEntryName(entry), resolve(__dirname, entry)])
);

export default defineConfig({
  // FleetOps is deployed at the domain root; asset URLs stay root-relative.
  base: "/",
  // Multi-page app: no SPA history fallback, each document is served directly.
  appType: "mpa",
  // Production-static files (assets, service worker, hosting config, SEO files)
  // are copied verbatim and keep their exact production URLs.
  // `assets/img-src/` stays outside this directory: it is an image source input,
  // not production output.
  publicDir: "public",
  server: {
    host: "127.0.0.1",
    port: 8181,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8182,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: { input },
  },
});
