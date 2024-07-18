import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import Sitemap from "vite-plugin-sitemap";
// import csp from "vite-plugin-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap(),
    viteCompression({
      algorithm: "brotliCompress",
    }),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
    // visualizer({
    //   filename: "./dist/stats.html",
    //   open: true,
    // }),
    // csp({
    //   policies: {
    //     "default-src": ["'self'"],
    //     "script-src": ["'report-sample'", "'self'"],
    //     "style-src": ["'report-sample'", "'self'"],
    //     "object-src": ["'none'"],
    //     "base-uri": ["'self'"],
    //     "connect-src": ["'self'", "https://magda-art.click"],
    //     "font-src": ["'self'"],
    //     "frame-src": ["'self'"],
    //     "img-src": [
    //       "'self'",
    //       "https://robert-sciu-magda-art-bucket.s3.eu-central-1.amazonaws.com",
    //     ],
    //     "manifest-src": ["'self'"],
    //     "media-src": ["'self'"],
    //     "report-uri": [
    //       "https://6697fff2b594446855d88658.endpoint.csper.io/?v=0",
    //     ],
    //     "worker-src": ["'none'"],
    //   },
    // }),
    // createHtmlPlugin({
    //   inject: {
    //     injectData: {
    //       moduleScript: "/vite-module-script.js",
    //       legacyScript: "/vite-legacy-script.js",
    //     },
    //   },
    // }),
  ],
  build: {
    target: "esnext", // Set the target to the latest ES version
    minify: "terser", // Use 'terser' for more control over minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true, // Remove debugger statements
      },
    },
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 500, // Adjust chunk size warning limit
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
