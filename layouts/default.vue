<template>
  <div
    class="
      h-screen
      flex
      overflow-hidden
      bg-gray-50
      dark:bg-gray-900
      text-gray-900
      dark:text-gray-200
    "
  >
    <LayoutNavOffCanvasNav :open="openNav" :handler-show="showNav" :handler-hide="hideNav" />
    <LayoutNavStaticNav />

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div
        class="
          relative
          z-10
          flex-shrink-0 flex
          h-16
          mb-0
          bg-dizzle-light
          dark:bg-dizzle
          shadow
          border-b-8 border-secondary-500 border-opacity-80
        "
      >
        <LayoutBreadcrumb />
        <button
          type="button"
          class="
            px-4
            border-r border-gray-500
            text-gray-500
            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
            lg:hidden
          "
          @click="showNav"
        >
          <span class="sr-only">Open sidebar</span>
          <!-- Heroicon name: outline/menu-alt-2 -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <layout-logo class="h-6 m-auto mx-auto my-5 lg:hidden" />
          </div>
          <div class="ml-4 flex items-center lg:ml-6 transform-none lg:transform -rotate-1">
            <layout-elements-season-button class="self-center" />
            <LayoutNavProfileDropdown />
          </div>
        </div>
      </div>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <Nuxt />
      </main>
    </div>
    <portal-target name="modals" />
    <portal-target name="slide" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      openNav: false
    }
  },
  computed: {
    logo() {
      return () =>
        import(/* webpackChunkName: `icon/[request]` */ `~/static/logo-white-small.svg?inline`)
    },
    ...mapState({
      colormode: (state) => state.layout.colormode
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
        this.$store.commit(
          'navigation/setAvailableSeasons',
          [...seasons].sort((a, b) => {
            const numberA = a.substr(4, 2)
            const numberB = b.substr(4, 2)
            if (numberA !== numberB) {
              if (numberA > numberB) return 1
              if (numberA < numberB) return -1
              return 0
            } else {
              if (a.includes('pre')) return -1
              if (b.includes('pre')) return 1
              if (a.length === 6) return -1
              if (b.length === 6) return 1
              if (a.includes('PLF')) return -1
              if (b.includes('PLF')) return 1
              return 0
            }
          })
        )
      }
    })
  },
  methods: {
    showNav() {
      this.openNav = true
    },
    hideNav() {
      this.openNav = false
    }
  }
}
</script>
