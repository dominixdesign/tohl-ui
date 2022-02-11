<template>
  <!-- Profile dropdown -->
  <div class="relative ml-3" v-click-outside="hide">
    <div>
      <button
        @click="profileOpen ? hide() : show()"
        id="user-menu-button"
        type="button"
        class="
          flex
          max-w-xs
          items-center
          rounded-full
          bg-white
          text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        "
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span class="sr-only">Open user menu</span>
        <team-logo-small v-if="loggedinTeam" :teamid="loggedinTeam" class="h-8 w-8 rounded-full" />

        <svg
          v-else
          class="h-8 w-8 rounded-full border border-primary-500 fill-current pt-1 text-primary-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <glyph glyph-name="user-suited" unicode="&#xed04;" horiz-adv-x="1000" />
          <path
            d="M500.3 477.7c-129.5-0.19999999999998863-231.7-103.59999999999997-231.3-234.2 0.39999999999997726-123.2 107.30000000000001-229 230.5-228 128.20000000000005 1 231.10000000000002 104.3 231.29999999999995 232.3 0.3000000000000682 125.69999999999999-104.29999999999995 230-230.49999999999994 229.89999999999998z m-266.8 506.50000000000006c-70.19999999999999 0-140.4-0.40000000000009095-210.5 0.2999999999999545-17.2 0.20000000000004547-23.6-3.7999999999999545-23-23 5-144.70000000000005 53.6-272.1 149.6-380.70000000000005 30.700000000000017-34.799999999999955 67.20000000000002-63.19999999999993 106.20000000000002-88.19999999999993 21.599999999999966-13.900000000000034 26.899999999999977 2.8999999999999773 32.69999999999999 17.299999999999955 25.399999999999977 62.5 50.30000000000001 125.20000000000005 75.5 187.80000000000007 33.80000000000001 84 67.69999999999999 167.89999999999998 101.60000000000002 251.89999999999998 12.599999999999966 31.299999999999955 10.799999999999955 34.299999999999955-24.200000000000045 34.39999999999998-69.29999999999995 0.2999999999999545-138.59999999999997 0.10000000000002274-207.89999999999998 0.10000000000002274v0.10000000000002274z m528.9-0.3000000000000682c-70.19999999999993 0-140.39999999999998 0.10000000000002274-210.60000000000002 0-26.399999999999977-0.10000000000002274-29.399999999999977-4.199999999999932-19.799999999999955-28.299999999999955 59.799999999999955-149.10000000000002 119.70000000000005-298.20000000000005 179.70000000000005-447.20000000000005 10.299999999999955-25.5 15.599999999999909-26.599999999999966 39.39999999999998-10.899999999999977 139.10000000000002 92 213.10000000000002 224.70000000000005 241.69999999999993 386 4.600000000000023 26.299999999999955 4.2000000000000455 52.799999999999955 6.900000000000091 79.10000000000002 1.8999999999999773 18.199999999999932-5.5 21.600000000000023-21.600000000000023 21.5-71.89999999999998-0.6000000000000227-143.80000000000007-0.3000000000000682-215.70000000000005-0.20000000000004547z m-262.29999999999995-60.299999999999955c-22.200000000000045-54.39999999999998-41.80000000000001-102.20000000000005-61.200000000000045-150.10000000000002-19.5-48.299999999999955-38.299999999999955-96.79999999999995-58.39999999999998-144.79999999999995-6.399999999999977-15.200000000000045-7.100000000000023-24.800000000000068 8.899999999999977-35.60000000000002 32.60000000000002-21.800000000000068 63.60000000000002-46.200000000000045 94.5-70.39999999999998 11.100000000000023-8.700000000000045 18.700000000000045-10 30.700000000000045-0.5 32.19999999999993 25.299999999999955 65.69999999999993 49.09999999999991 98.89999999999998 73.19999999999993 8.899999999999977 6.399999999999977 14.5 11.800000000000068 9.100000000000023 24.800000000000068-40.30000000000007 98.59999999999991-79.89999999999998 197.5999999999999-122.5 303.4z"
          />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      leave-active-class="transition ease-in duration-75"
      enter-class=" opacity-0 scale-95"
      enter-to-class=" opacity-100 scale-100"
      leave-class=" opacity-100 scale-100"
      leave-to-class=" opacity-0 scale-95"
    >
      <div
        v-if="profileOpen"
        class="
          absolute
          right-0
          mt-2
          w-48
          origin-top-right
          divide-y divide-gray-200
          rounded-md
          bg-white
          py-1
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none" v-if="isLoggedIn">
          <!-- Active: "bg-gray-100", Not Active: "" -->
          <a
            id="user-menu-item-0"
            href="#"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            >{{ loggedinTeam }}</a
          >
          <NuxtLink
            to="/gm/lines"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            >Lines</NuxtLink
          >
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
            @click="logout"
            >Sign out</a
          >
        </div>
        <div class="py-1" role="none" v-else>
          <a
            id="user-menu-item-2"
            href="#"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            @click="showLoginModal"
            >Login</a
          >
        </div>
        <div class="py-1 md:hidden" role="none">
          <layout-elements-season-button />
        </div>
        <div class="py-1" role="none">
          <div
            class="flex cursor-pointer items-center px-4 py-2"
            @click="colormode === 'dark' ? disableDarkmode() : enableDarkmode()"
          >
            <button
              id="darkmode"
              type="button"
              class="
                relative
                inline-flex
                h-6
                w-11
                shrink-0
                rounded-full
                border-2 border-transparent
                transition-colors
                duration-200
                ease-in-out
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              "
              :class="colormode === 'dark' ? 'bg-primary-700' : 'bg-gray-200'"
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
                  ring-0
                  transition
                  duration-200
                  ease-in-out
                "
                :class="colormode === 'dark' ? 'translate-x-5' : 'translate-x-0'"
              ></span>
            </button>
            <span id="darkmode-label" class="ml-3">
              <span class="text-sm text-gray-900">Darkmode</span>
            </span>
          </div>
        </div>
      </div>
    </transition>
    <layout-modals-login :show="loginModal" @close="loginModal = false" />
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'ProfileDropdown',
  data() {
    return {
      loginModal: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    ...mapState({
      profileOpen: (state) => state.layout.profileOpen,
      colormode: (state) => state.layout.colormode,
      loggedinTeam: (state) => state.user.team
    })
  },
  methods: {
    logout() {
      this.$authService.logout()
    },
    showLoginModal() {
      this.hide()
      this.loginModal = true
    },
    ...mapMutations({
      show: 'layout/openProfile',
      hide: 'layout/closeProfile',
      enableDarkmode: 'layout/enableDarkmode',
      disableDarkmode: 'layout/disableDarkmode'
    })
  }
}
</script>
