import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const base = process.env.PUBLIC_BASE ?? "/coolPersonalWebsite";

export default defineConfig({
  site: "https://sophietheprogrammer.github.io",
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
