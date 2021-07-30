<template>
  <portal to="slide">
    <transition @after-enter="showContent = true">
      <div
        v-if="show"
        class="fixed inset-0 overflow-hidden z-50"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="absolute inset-0 overflow-hidden">
          <transition
            enter-active-class="transition-opacity ease-in-out duration-500"
            leave-active-class="transition-opacity ease-in-out duration-500"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="showContent"
              class="absolute inset-0 bg-primary-800 bg-opacity-75"
              @click="showContent = false"
              aria-hidden="true"
            ></div>
          </transition>

          <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <transition
              enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
              leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
              enter-class="translate-x-full"
              enter-to-class="translate-x-0"
              leave-class="translate-x-0"
              leave-to-class="translate-x-full"
              @after-leave="close"
            >
              <div v-if="showContent" class="w-screen max-w-md">
                <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                        Saison wählen
                      </h2>
                      <div class="ml-3 h-7 flex items-center">
                        <button
                          @click="showContent = false"
                          class="
                            bg-white
                            rounded-md
                            text-gray-400
                            hover:text-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-indigo-500
                          "
                        >
                          <span class="sr-only">Saisonauswahl Schließen</span>
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 relative flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <nav class="space-y-1">
                      <nuxt-link
                        v-for="season in seasons"
                        class="py-1 px-2 cursor-pointer"
                        :key="season"
                        :to="getLink(season)"
                      >
                        {{ season }}
                      </nuxt-link>
                    </nav>
                    <!-- /End replace -->
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  props: {
    close: Function,
    show: Boolean
  },
  data() {
    return {
      seasons: ['TOHL11', 'TOHL12'],
      showContent: false
    }
  },
  methods: {
    getLink(season) {
      return this.$route.fullPath.replace(`/${this.$route.params.season}/`, `/${season}/`)
    }
  }
}
</script>

<style></style>
