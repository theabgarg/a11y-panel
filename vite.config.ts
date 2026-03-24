import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, include: ["src/lib"] })],
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "A11yPanel",
      fileName: (format) =>
        format !== "umd" ? `a11y-panel.${format}.js` : `a11y-panel.umd.cjs`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
  },
});
