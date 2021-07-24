<template>
  <nav class="flex-1 px-2 space-y-1">
    <layout-nav-entry v-for="entry in nav" :key="entry.path" :entry="entry" />
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavInner',
  props: {
    routeAction: { type: Function }
  },
  computed: {
    ...mapState({
      nav: (state) => state.navigation.mainNav,
      active: (state) => state.route.path
    })
  },
  methods: {
    triggerRoute() {
      if (typeof this.routeAction === 'function') {
        this.routeAction()
      }
    }
  }
}
</script>
