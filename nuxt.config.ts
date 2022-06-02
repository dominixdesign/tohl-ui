import svgLoader from "vite-svg-loader";
import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }],
    },
  },
  buildModules: ["@nuxtjs/tailwindcss"],
  vite: {
    plugins: [svgLoader()],
  },
});
