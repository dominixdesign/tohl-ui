import svgLoader from 'vite-svg-loader'
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        { rel: 'stylesheet', href: '/fonts/overpass.css' },
        { rel: 'stylesheet', href: '/fonts/overpass-mono.css' }
      ]
    }
  },
  css: ['@/assets/index.scss'],
  buildModules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  vite: {
    plugins: [svgLoader()]
  }
})
