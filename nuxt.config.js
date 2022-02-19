export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TOHL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },

  googleFonts: {
    download: true,
    families: {
      'Ubuntu+Mono': [400, 700],
      Yantramanav: [100, 300, 400, 500, 700, 900]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/auth.js',
    'plugins/clickOutsideDirective.js',
    'plugins/routeToStore.js',
    'plugins/hex.js',
    'plugins/browserBack.js',
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts',
    //'@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@nuxt/postcss8',
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
      //},
      //defaultOptions: {
      //  $query: {
      //    fetchPolicy: 'no-cache'
      //  }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: '/icon.png'
    },
    manifest: {
      name: 'TOHL',
      short_name: 'TOHL',
      description: 'Einfach installieren.',
      lang: 'de',
      background_color: '#111827'
    }
  },
  colorMode: {
    classSuffix: ''
  },
  watchers: {
    webpack: {
      ignored: [/android/, /coverage/, /dist/, /ios/, /mocks/, /node_modules/, /test/, /.git/]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  buildDir: 'dist',
  build: {
    publicPath: '/nuxt/',
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
