import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",

  root: resolve(__dirname, "src"),

  publicDir: resolve(__dirname, "public"),

  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },

  server: {
    port: 8080,
  },

  // Temporarily silence Bootstrap Sass deprecation warnings
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "mixed-decls",
          "color-functions",
          "global-builtin",
        ],
      },
    },
  },
});
