<template>
  <div class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-full">
    <header class="bg-dizzle-light dark:bg-dizzle shadow">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-primary-500 lg:px-8">
        <div class="relative h-16 flex justify-between">
          <div class="relative z-10 px-2 flex lg:px-0">
            <div class="flex-shrink-0 flex items-center">
              <layout-logo class="h-8" />
            </div>
          </div>
          <div
            class="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0"
          >
            <div class="w-full sm:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
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
                    bg-white bg-opacity-20
                    border border-gray-800
                    rounded-md
                    py-2
                    pl-10
                    pr-3
                    text-sm
                    placeholder-gray-500
                    focus:outline-none
                    focus:text-gray-900
                    focus:placeholder-gray-400
                    focus:ring-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>

          <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            <layout-elements-season-button class="self-center" />
            <LayoutNavProfileDropdown />
          </div>
        </div>
        <LayoutNavStaticNav />
      </div>
    </header>
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main class="pb-10 isolate">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 z-1">
        <Nuxt />
      </div>
      <nuxt-img class="opacity-20 fixed bottom-0 -z-1" src="/trophy.png" sizes="sm:320px" />
    </main>
    <LayoutNavOffCanvasNav />
    <footer
      class="fixed bottom-1 left-0 right-0 mx-auto w-14 z-40 lg:hidden"
      :class="openNav ? 'menu_activated' : ''"
    >
      <!-- Mobile menu button -->
      <!-- https://codepen.io/vineethtrv/pen/VYRzaV -->
      <button class="menu__toggle" @click="() => (openNav ? hideNav() : showNav())">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </button>
    </footer>
    <portal-target name="modals" />
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

.menu__toggle::before {
  @apply bg-primary-500 shadow;
  content: '';
  width: 1em;
  height: 1em;
  font-size: 150px;
  border-radius: 50%;
  position: absolute;
  bottom: -0.65em;
  left: calc(50% - 0.5em);
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
  top: 15px;
}
.menu_activated .menu__toggle .bar:nth-of-type(2) {
  transform: rotate(45deg);
  transform-origin: 185% -5% 0;
}

body.mobilemenu-open {
  overflow: hidden;
}
</style>
