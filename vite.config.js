import { resolve } from "path";

export default {
  base: "/bootstrap5/",
  root: resolve(__dirname, "src"),

  build: {
    outDir: "../dist",
  },

  server: {
    port: 8080,
  },

  // Optional: Silence Sass deprecation warnings
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
};
