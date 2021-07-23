<template>
  <transition @after-enter="showNavBar = true">
    <div
      v-if="open"
      class="fixed inset-0 flex z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
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
          class="fixed inset-0 bg-gray-600 dark:bg-primary-800 bg-opacity-75"
          aria-hidden="true"
          @click="hideNavBar"
        ></div>
      </transition>

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
            bg-dizzle-light
            dark:bg-dizzle
            shadow
            border-r border-gray-700
          "
        >
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
              <span class="sr-only">Navigation schließen</span>
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

          <div class="z-10 flex-shrink-0 flex items-center px-4">
            <layout-logo class="h-16 m-auto my-6" />
          </div>
          <div class="z-10 mt-5 flex-1 h-0 overflow-y-auto">
            <layout-nav-inner :routeAction="hideNavBar" />
          </div>
          <nuxt-img
            class="opacity-20 fixed bottom-0 z-0"
            src="/trophy.png"
            sizes="sm:320px"
          />
        </div>
      </transition>

      <div v-if="showNavBar" class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OffCanvasNav',
  props: {
    open: {
      type: Boolean,
      default: () => false
    },
    handlerShow: {
      type: Function,
      default: () => false
    },
    handlerHide: {
      type: Function,
      default: () => false
    }
  },
  data() {
    return {
      showNavBar: false
    }
  },
  methods: {
    hideNavBar() {
      this.showNavBar = false
    }
  }
}
</script>
