<template>
  <div
    class="
      flex
      min-h-full
      flex-col
      bg-dizzle-light bg-fixed
      text-gray-900
      dark:bg-dizzle dark:text-gray-200
    "
  >
    <header
      class="
        fixed
        z-40
        w-full
        bg-gray-50
        shadow
        backdrop-blur-lg backdrop-filter
        dark:bg-gray-900 dark:bg-opacity-60
      "
    >
      <div
        class="container mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-primary-500 lg:px-8"
      >
        <div class="relative flex h-16 justify-between">
          <div class="relative z-10 flex px-2 lg:px-0">
            <div class="flex shrink-0 items-center">
              <layout-logo class="h-8" />
            </div>
          </div>
          <div
            class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"
          >
            <div class="w-full sm:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <!-- Heroicon name: solid/search -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  class="
                    block
                    w-full
                    rounded-md
                    border border-gray-800
                    bg-white bg-opacity-20
                    py-2
                    pl-10
                    pr-3
                    text-sm
                    placeholder-gray-500
                    focus:border-indigo-500
                    focus:text-gray-900
                    focus:placeholder-gray-400
                    focus:outline-none
                    focus:ring-1
                    focus:ring-indigo-500
                    sm:text-sm
                  "
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>

          <div class="relative z-10 ml-4 flex items-center">
            <layout-elements-season-button class="hidden self-center md:block" />
            <LayoutNavProfileDropdown />
          </div>
        </div>
        <LayoutNavStaticNav />
      </div>
    </header>
    <header class="h-16 shadow-sm lg:h-36" />
    <main class="isolate flex grow items-stretch justify-center">
      <div
        style="width: clamp(24rem, 100vw, 80rem)"
        class="
          z-1
          mx-auto
          max-w-7xl
          bg-gray-100
          pb-32
          shadow-pageLight
          dark:bg-gray-800 dark:shadow-pageDark
          sm:px-2
          lg:px-0 lg:pb-2
        "
      >
        <Nuxt />
      </div>
    </main>
    <LayoutNavOffCanvasNav />
    <footer
      class="fixed bottom-0 left-0 right-0 z-40 mx-auto w-screen lg:hidden"
      :class="openNav ? 'menu_activated' : ''"
    >
      <!-- Mobile menu button -->
      <!-- https://codepen.io/vineethtrv/pen/VYRzaV -->
      <button class="menu__toggle" @click="() => (openNav ? hideNav() : showNav())">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </button>
      <div class="footer__bar flex" :class="openNav ? 'footer__bar__open' : 'footer__bar__closed'">
        <div class="p-1 text-secondary-500" @click="() => $router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="float-left h-7 w-7"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <polyline points="15 6 9 12 15 18"></polyline>
          </svg>
          <span class="-ml-1 text-xl font-bold">Zurück</span>
        </div>
        <portal-target name="floating" />
      </div>
    </footer>
    <portal-target name="modals" class="isolate z-50" />
    <portal-target name="slide" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import seasonSorter from '~/lib/seasonSorter'

export default {
  computed: {
    logo() {
      return () =>
        import(/* webpackChunkName: `icon/[request]` */ `~/static/logo-white-small.svg?inline`)
    },
    ...mapState({
      colormode: (state) => state.layout.colormode,
      openNav: (state) => state.layout.navOpen
    })
  },
  head() {
    return {
      titleTemplate: '%s - TOHL'
    }
  },
  watch: {
    colormode(newMode) {
      this.$colorMode.preference = newMode
    }
  },
  mounted() {
    this.$apollo.addSmartQuery('availableSeasons', {
      query: gql`
        query availableSeasons {
          seasons
        }
      `,
      update: ({ seasons }) => {
        this.$store.commit('navigation/setAvailableSeasons', [...seasons].sort(seasonSorter))
      }
    })
    document.addEventListener('scroll', function (e) {
      const not_fixed = document.getElementById('menu__not-fixed')

      if (window.scrollY > 100) {
        not_fixed.classList.remove('block')
        not_fixed.classList.add('!hidden')
      } else {
        not_fixed.classList.add('block')
        not_fixed.classList.remove('!hidden')
      }
    })
  },
  methods: {
    showNav() {
      this.$store.commit('layout/openNav')
    },
    hideNav() {
      this.$store.commit('layout/closeNav')
    }
  }
}
</script>

<style>
body,
html,
#__nuxt,
#__layout {
  @apply h-full;
}
body {
  overflow-y: scroll;
}

.menu__toggle::before {
  @apply border-2 border-secondary-500 bg-primary-200;
  content: '';
  width: 1em;
  height: 1em;
  font-size: 150px;
  border-radius: 50%;
  position: absolute;
  bottom: -0.6em;
  left: calc(50% - 0.5em);
  box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.5);
  z-index: -1;
  will-change: width, height;
  transition: transform 0.25s cubic-bezier(0.04, -0.1, 0.29, 0.98),
    width 0.25s cubic-bezier(0.04, -0.1, 0.29, 0.98),
    height 0.25s cubic-bezier(0.04, -0.1, 0.29, 0.98);
}

.menu_activated .menu__toggle::before {
  width: 100vmax;
  height: 100vmax;
  transform: translate3d(-50vh, -50vh, 0) scale(5);
  transition-duration: 1s;
}

.menu__toggle {
  @apply rounded-full transition-all duration-300;
  box-sizing: border-box;
  height: 50px;
  width: 50px;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  cursor: pointer;
}
.menu__toggle .bar {
  @apply rounded-none transition-all duration-300;
  box-sizing: border-box;
  transform: rotate(-135deg);
  height: 25px;
  width: 25px;
  background: none;
  border-bottom: 5px solid #fff;
  border-right: 5px solid #fff;
  position: absolute;
  display: block;
  margin: 10px auto;
  top: 10px;
  right: 0;
  left: 0;
}
.menu_activated .menu__toggle .bar {
  top: 5px;
}
.menu_activated .menu__toggle .bar:nth-of-type(2) {
  transform: rotate(45deg);
  transform-origin: 185% -5% 0;
}

.footer__bar {
  @apply relative w-full border-t-2 border-secondary-500 bg-white;
  height: 40px;
  transition: transform 0.25s cubic-bezier(0.04, -0.1, 0.29, 0.98),
    width 0.25s cubic-bezier(0.04, -0.1, 0.29, 0.98),
    height 0.25s cubic-bezier(0.04, -0.1, 0.29, 0.98);
}
.footer__bar::before {
  @apply absolute w-full border-t-2 border-secondary-500 bg-white;
  content: '';
  z-index: -1;
  box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.5);
  height: 40px;
}
.footer__bar__open {
  height: 0;
}

body.mobilemenu-open {
  overflow: hidden;
}
</style>
