<template>
  <!-- Profile dropdown -->
  <div class="ml-3 relative" v-click-outside="hide">
    <div>
      <button
        @click="profileOpen ? hide() : show()"
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

    <transition
      enter-active-class="transition ease-out duration-100"
      leave-active-class="transition ease-in duration-75"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="profileOpen"
        class="
          origin-top-right
          absolute
          right-0
          mt-2
          w-48
          rounded-md
          divide-y divide-gray-200
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
        <div class="py-1" role="none" v-if="isLoggedIn">
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
        <div class="py-1" role="none">
          <div
            class="flex items-center px-4 py-2 cursor-pointer"
            @click="colormode === 'dark' ? disableDarkmode() : enableDarkmode()"
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
                transition-colors
                ease-in-out
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
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
                  transform
                  ring-0
                  transition
                  ease-in-out
                  duration-200
                "
                :class="
                  colormode === 'dark' ? 'translate-x-5' : 'translate-x-0'
                "
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
    isLoggedIn() {
      return this.$authService.isLoggedIn()
    },
    ...mapState({
      profileOpen: (state) => state.layout.profileOpen,
      colormode: (state) => state.layout.colormode
    })
  },
  methods: {
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
