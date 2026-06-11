import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://sophietheprogrammer.github.io",
  base: "/coolPersonalWebsite",
  vite: {
    plugins: [tailwindcss()],
  },
});
