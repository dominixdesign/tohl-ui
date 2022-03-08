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
      class="fixed top-0 z-50 w-screen"
      style="height: calc(100vh - 3.5rem)"
      role="dialog"
      aria-modal="true"
    >
      <div v-if="showNavBar" class="relative flex w-full flex-1 flex-col pt-5 pb-4">
        <div class="z-10 flex shrink-0 items-center px-4">
          <layout-logo class="m-auto my-6 h-16" :inverse="true" />
        </div>
        <div
          ref="navInner"
          @scroll="scrollNav"
          class="relative z-0 mt-5 h-0 flex-1 overflow-x-auto"
          style="height: calc(100vh - 250px); max-height: calc(100vh - 250px)"
        >
          <div class="shadow-top" />
          <layout-nav-off-canvas-nav-entry
            v-for="(entry, index) in nav"
            :key="entry.path"
            :entry="entry"
            :opensub="opensub"
            :index="index"
            :routeAction="handlerHide"
            :handler="{ openSubmenu, closeSubmenu }"
          />
          <div class="shadow-bottom" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'OffCanvasNav',
  computed: {
    ...mapGetters({
      nav:  'navigation/nav'
    }),
    ...mapState({
      openNav: (state) => state.layout.navOpen
    })
  },
  data() {
    return {
      showNavBar: false,
      opensub: null
    }
  },
  mounted() {},
  watch: {
    showNavBar(nextShowNavbar) {
      if (nextShowNavbar) {
        this.$nextTick(() => {
          console.log(
            this.$refs.navInner?.scrollHeight,
            this.$refs.navInner?.clientHeight,
            this.$refs.navInner?.scrollHeight > this.$refs.navInner?.clientHeight
          )
          this.$refs.navInner?.classList.remove('show-bottom-shadow')
          if (this.$refs.navInner?.scrollHeight > this.$refs.navInner?.clientHeight) {
            this.$refs.navInner?.classList.add('show-bottom-shadow')
          }
        })
      }
    },
    openNav(newNavState) {
      const bodyElement = document.querySelector('body')
      bodyElement.classList.remove('mobilemenu-open')
      if (newNavState) {
        bodyElement.classList.add('mobilemenu-open')
      }
    },
    opensub: {
      handler: function (newOpenSub) {
        this.$nextTick(() => {
          this.$refs.navInner?.classList.remove('show-bottom-shadow')
          if (this.$refs.navInner?.scrollHeight > this.$refs.navInner?.clientHeight) {
            this.$refs.navInner?.classList.add('show-bottom-shadow')
          }
        })
      }
    }
  },
  methods: {
    scrollNav(e) {
      this.$refs.navInner?.classList.remove('show-top-shadow')
      this.$refs.navInner?.classList.add('show-bottom-shadow')
      if (e.target.scrollTop) {
        this.$refs.navInner?.classList.add('show-top-shadow')
      }
      if (e.target.scrollTop + e.target.clientHeight + 10 >= e.target.scrollHeight) {
        this.$refs.navInner?.classList.remove('show-bottom-shadow')
      }
    },
    hideNavBar() {
      this.showNavBar = false
    },
    handlerShow() {
      this.$store.commit('layout/openNav')
    },
    handlerHide() {
      this.$store.commit('layout/closeNav')
    },
    openSubmenu(key) {
      this.opensub = key
    },
    closeSubmenu() {
      this.opensub = null
    }
  }
}
</script>

<style scoped>
.shadow-bottom {
  display: none;
  position: sticky;
  bottom: -20px;
  height: 20px;
  width: 100%;
  background: transparent;
  box-shadow: -3px -5px 6px 0px rgb(0 0 0 / 30%);
  border-radius: 100%;
}
.show-bottom-shadow .shadow-bottom {
  display: block;
}
.shadow-top {
  z-index: 1;
  display: none;
  position: sticky;
  top: -20px;
  height: 20px;
  width: 100%;
  background: transparent;
  box-shadow: 3px 5px 6px 0px rgb(0 0 0 / 30%);
  border-radius: 100%;
}
.show-top-shadow .shadow-top {
  display: block;
}
</style>
