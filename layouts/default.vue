<template>
  <div
    class="
      h-screen
      flex
      overflow-hidden
      bg-gray-100
      dark:bg-gray-900
      text-gray-900
      dark:text-gray-200
    "
  >
    <LayoutNavOffCanvasNav
      :nav="nav"
      :active="active"
      :open="openNav"
      :handler-show="showNav"
      :handler-hide="hideNav"
    />
    <LayoutNavStaticNav :nav="nav" :active="active" />

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div
        class="
          relative
          z-10
          flex-shrink-0 flex
          h-16
          mb-10
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
            focus:outline-none
            focus:ring-2
            focus:ring-inset
            focus:ring-indigo-500
            md:hidden
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
            <layout-logo class="h-6 m-auto mx-auto my-5 md:hidden" />
          </div>
          <div
            class="
              ml-4
              flex
              items-center
              md:ml-6
              transform-none
              md:transform
              -rotate-1
            "
          >
            <LayoutNavProfileDropdown />
          </div>
        </div>
      </div>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="p-6">
          <Nuxt />
        </div>
      </main>
    </div>
    <portal-target name="modals" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      openNav: false,
      active: 'Liga'
    }
  },
  computed: {
    logo() {
      return () =>
        import(
          /* webpackChunkName: `icon/[request]` */ `~/static/logo-white-small.svg?inline`
        )
    },
    ...mapState({
      colormode: (state) => state.layout.colormode,
      nav: (state) => state.navigation.mainNav
    })
  },
  watch: {
    colormode(newMode) {
      this.$colorMode.preference = newMode
    }
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
