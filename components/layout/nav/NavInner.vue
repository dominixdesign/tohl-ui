<template>
  <nav class="flex-1 px-2 space-y-1">
    <layout-nav-entry
      v-for="(entry, index) in nav"
      :key="entry.path"
      :entry="entry"
      :opensub="opensub"
      :index="index"
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
