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
              enter-active-class=" transition ease-in-out duration-500 sm:duration-700"
              leave-active-class=" transition ease-in-out duration-500 sm:duration-700"
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
                        <component
                          :is="logo"
                          aria-hidden="true"
                          class="h-6 mr-2 fill-current float-left text-primary-800"
                        />Saison wählen
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
                    <nav>
                      <div v-for="season in seasons" :key="season" class="mt-5 first:mt-0">
                        <p
                          class="
                            text-gray-300
                            ml-2
                            w-full
                            border-b-2
                            pb-2
                            border-gray-100
                            text-md
                            uppercase
                            font-normal
                          "
                        >
                          {{ season }}
                        </p>
                        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
                        <nuxt-link
                          v-for="(title, type) in types"
                          v-if="availableSeasons.indexOf(season + type) >= 0"
                          :key="`${season}-${type}`"
                          class="
                            mx-2
                            py-2
                            px-3
                            cursor-pointer
                            block
                            text-primary-500
                            hover:bg-gray-200 hover:border-gray-300
                            border-b border-gray-200
                          "
                          :to="getLink(season + type)"
                        >
                          {{ title }}
                        </nuxt-link>
                        <!-- eslint-enable vue/no-use-v-if-with-v-for -->
                      </div>
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
import { mapState } from 'vuex'

export default {
  props: {
    close: Function,
    show: Boolean
  },
  data() {
    return {
      seasons: ['TOHL11', 'TOHL12'],
      types: { pre: 'Pre-Season', '': 'Hauptrunde', PLF: 'Playoffs' },
      showContent: false
    }
  },
  computed: {
    ...mapState({
      availableSeasons: (state) => state.navigation.availableSeasons
    }),
    logo() {
      return () =>
        import(/* webpackChunkName: `icon/[request]` */ `~/static/logo-white-small.svg?inline`)
    }
  },
  watch: {
    $route() {
      this.showContent = false
    },
    availableSeasons: {
      handler: function (newSeasons) {
        this.seasons = Array.from(new Set(newSeasons.map((s) => s.substr(0, 6))))
      },
      immediate: true
    }
  },
  methods: {
    getLink(season) {
      return this.$route.fullPath.replace(`/${this.$route.params.season}/`, `/${season}/`)
    },
    getType(season) {
      if (season.indexOf('pre') >= 0) {
        return 'Pre-Season'
      }
      if (season.indexOf('PLF') >= 0) {
        return 'Playoffs'
      }
      return 'Hauptrunde'
    }
  }
}
</script>

<style></style>
