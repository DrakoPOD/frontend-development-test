/// <reference types="vitest"/>
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": process.cwd() + "/src" },
  },
  base: `${process.env.BASE_PATH || ""}/`,
  test: {
    environment: "happy-dom",
    // browser: {
    //   enabled: true,
    //   name: "chrome", // browser name is required
    // },
  },
});
