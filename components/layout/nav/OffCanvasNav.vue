<template>
  <transition
    @after-enter="showNavBar = true"
    enter-active-class="transition-opacity ease-linear duration-300"
    leave-active-class="transition-opacity ease-linear duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="openNav"
      class="absolute top-0 w-screen z-50"
      style="height: calc(100vh - 3.5rem)"
      role="dialog"
      aria-modal="true"
    >
      <div v-if="showNavBar" class="relative flex-1 flex flex-col w-full pt-5 pb-4">
        <div class="z-10 flex-shrink-0 flex items-center px-4">
          <layout-logo class="h-16 m-auto my-6" />
        </div>
        <div class="z-10 mt-5 flex-1 h-0 overflow-y-auto">
          <layout-nav-inner :routeAction="handlerHide" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OffCanvasNav',
  computed: {
    ...mapState({
      openNav: (state) => state.layout.navOpen
    })
  },
  data() {
    return {
      showNavBar: false
    }
  },
  methods: {
    hideNavBar() {
      this.showNavBar = false
    },
    handlerShow() {
      this.$store.commit('layout/openNav')
    },
    handlerHide() {
      this.$store.commit('layout/closeNav')
    }
  }
}
</script>
