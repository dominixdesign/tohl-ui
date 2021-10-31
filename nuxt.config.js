export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tohl-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/auth.js',
    'plugins/clickOutsideDirective.js',
    'plugins/routeToStore.js',
    'plugins/virtualScroller.js',
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/svg'
  ],

  image: {
    provider: 'static'
  },

  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || 'https://api.my-tohl.org/data/graphql'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
    'nuxt-vuex-router-sync',
    'nuxt-i18n'
  ],

  i18n: {
    locales: [{ code: 'de', iso: 'de-DE', file: 'de.js' }],
    defaultLocale: 'de',
    langDir: '~/texts/',
    vueI18n: {
      fallbackLocale: 'de'
    }
  },

  loadingIndicator: {
    name: '~/loading-indicator.html',
    color1: '#0061AF',
    color2: '#B92727',
    background: '#111827'
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  colorMode: {
    classSuffix: ''
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  buildDir: 'dist',
  build: {
    publicPath: '/nuxt/'
  },

  router: {
    scrollBehavior(to) {
      if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop + window.innerHeight,
          behavior: 'smooth'
        })
      }
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
