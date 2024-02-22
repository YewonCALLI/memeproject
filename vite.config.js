import { resolve } from "path";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        drawing: resolve(__dirname, "src/drawing.html"),
        world: resolve(__dirname, "src/world.html"),
      },
    },
  },
  plugins: [topLevelAwait()],
});
