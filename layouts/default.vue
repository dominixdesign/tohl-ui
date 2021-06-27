<template>
  <div class="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
    <LayoutNavOffCanvasNav
      :nav="nav"
      :active="active"
      :open="openNav"
      :handler-show="showNav"
      :handler-hide="hideNav"
    />
    <LayoutNavStaticNav :nav="nav" :active="active" />

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-primary-700 shadow">
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
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  id="user-menu-button"
                  type="button"
                  class="
                    max-w-xs
                    bg-white
                    flex
                    items-center
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-indigo-500
                  "
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              <div
                class="
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a
                  id="user-menu-item-0"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Your Profile</a
                >

                <a
                  id="user-menu-item-1"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Settings</a
                >

                <a
                  id="user-menu-item-2"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Sign out</a
                >
                <div
                  class="flex items-center px-4 py-2"
                  @click="toggeleDarkMode"
                >
                  <button
                    id="darkmode"
                    type="button"
                    class="
                      relative
                      inline-flex
                      flex-shrink-0
                      h-6
                      w-11
                      border-2 border-transparent
                      rounded-full
                      cursor-pointer
                      transition-colors
                      ease-in-out
                      duration-200
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                    "
                    :class="
                      $colorMode.preference === 'dark'
                        ? 'bg-primary-700'
                        : 'bg-gray-200'
                    "
                    role="switch"
                  >
                    <span
                      aria-hidden="true"
                      class="
                        pointer-events-none
                        inline-block
                        h-5
                        w-5
                        rounded-full
                        bg-white
                        shadow
                        transform
                        ring-0
                        transition
                        ease-in-out
                        duration-200
                      "
                      :class="
                        $colorMode.preference === 'dark'
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      "
                    ></span>
                  </button>
                  <span id="darkmode-label" class="ml-3">
                    <span class="text-sm text-gray-900">Darkmode</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="p-6">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMenuOpen: false,
      openNav: false,
      active: 'Liga',
      nav: [
        'Startseite',
        'Liga',
        'Statistiken',
        'Teams',
        'Spieler',
        'Office',
        'Lines',
        'Forum',
      ],
    }
  },
  computed: {
    logo() {
      return () =>
        import(
          /* webpackChunkName: `icon/[request]` */ `~/static/logo-white-small.svg?inline`
        )
    },
  },
  methods: {
    toggleUserNav() {
      this.userMenuOpen = !this.userMenuOpen
    },
    showNav() {
      this.openNav = true
    },
    hideNav() {
      this.openNav = false
    },
    closeUserNav() {
      this.userMenuOpen = false
    },
    toggeleDarkMode() {
      this.$colorMode.preference =
        this.$colorMode.preference === 'light' ? 'dark' : 'light'
    },
  },
}
</script>
