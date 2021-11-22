<template>
  <nav class="hidden lg:py-2 lg:flex lg:flex-row lg:space-x-8" aria-label="Global">
    <layout-nav-entry
      v-for="(entry, index) in nav"
      :key="entry.path"
      :entry="entry"
      :opensub="opensub"
      :index="index"
      :routeAction="routeAction"
      :handler="{ openSubmenu, closeSubmenu }"
    />
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavInner',
  props: {
    routeAction: { type: Function }
  },
  data() {
    return {
      opensub: null
    }
  },
  computed: {
    ...mapState({
      nav: (state) => state.navigation.mainNav,
      active: (state) => state.route.path
    })
  },
  methods: {
    openSubmenu(key) {
      this.opensub = key
    },
    closeSubmenu() {
      this.opensub = null
    }
  }
}
</script>
