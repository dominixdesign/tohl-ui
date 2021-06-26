<template>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <transition @after-enter="showNavBar = true">
    <div
      v-if="open"
      class="fixed inset-0 flex z-40 md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <!--
          Off-canvas menu overlay, show/hide based on off-canvas menu state.

          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        leave-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNavBar"
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          @click="showNavBar = false"
        ></div>
      </transition>

      <!--
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: ""
            From: ""
            To: ""
          Leaving: ""
            From: ""
            To: ""
        -->
      <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        leave-active-class="transition ease-in-out duration-300 transform"
        enter-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-class="translate-x-0"
        leave-to-class="-translate-x-full"
        @after-leave="handlerHide"
      >
        <div
          v-if="showNavBar"
          class="
            relative
            flex-1 flex flex-col
            max-w-xs
            w-full
            pt-5
            pb-4
            bg-header bg-no-repeat bg-cover bg-center
            shadow
            border-r border-gray-700
          "
        >
          <!--
            Close button, show/hide based on off-canvas menu state.

            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              class="
                ml-1
                flex
                items-center
                justify-center
                h-10
                w-10
                rounded-full
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
              "
              @click="showNavBar = false"
            >
              <span class="sr-only">Close sidebar</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6 text-white"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="flex-shrink-0 flex items-center px-4">
            <layout-logo class="h-12 m-auto my-6" />
          </div>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <a
                v-for="entry in nav"
                :key="entry"
                href="#"
                class="
                  text-white
                  group
                  flex
                  items-center
                  px-2
                  py-2
                  text-base
                  font-medium
                  rounded-md
                "
                :class="
                  active === entry
                    ? 'bg-secondary-800 text-white'
                    : 'text-gray-200 hover:bg-secondary-600 transform hover:translate-x-1 transition-transform'
                "
              >
                {{ entry }}
              </a>
            </nav>
          </div>
        </div>
      </transition>

      <div v-if="showNavBar" class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OffCanvasNav',
  props: {
    nav: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: () => '',
    },
    open: {
      type: Boolean,
      default: () => false,
    },
    handlerShow: {
      type: Function,
      default: () => false,
    },
    handlerHide: {
      type: Function,
      default: () => false,
    },
  },
  data() {
    return {
      showNav: this.open,
      showNavBar: false,
    }
  },
}
</script>
