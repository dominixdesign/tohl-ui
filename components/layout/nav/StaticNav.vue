<template>
  <nav class="hidden lg:py-2 lg:flex lg:flex-row lg:space-x-2 relative !pb-10" aria-label="Global">
    <layout-nav-entry
      v-for="(entry, index) in nav"
      :key="entry.path"
      :entry="entry"
      :opensub="opensub"
      :index="index"
      :routeAction="routeAction"
      :handler="{ openSubmenu, closeSubmenu }"
    />
    <layout-nav-sub :opensub="opensub" :entries="entries" :routeAction="routeAction" />
  </nav>
</template>

<script>
import { template } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'StaticNav',
  props: {
    routeAction: { type: Function }
  },
  data() {
    return {
      opensub: null,
      entries: []
    }
  },
  computed: {
    ...mapGetters({
      season: 'navigation/season'
    }),
    ...mapState({
      nav: (state) => state.navigation.mainNav,
      active: (state) => state.route.path
    })
  },
  watch: {
    opensub: {
      immediate: true,
      handler(opensub) {
        if (opensub && this.nav[opensub]) {
          this.entries = this.nav[opensub].children
        }
      }
    },
    active: {
      immediate: true,
      handler(newActive) {
        let openMenu = null
        this.nav?.forEach((n, index) =>
          n.children?.forEach((c) => {
            if (this.isActiveElement(c.path, newActive)) {
              openMenu = index
            }
          })
        )
        this.opensub = openMenu
      }
    }
  },
  methods: {
    isActiveElement(path, active) {
      const id = path.split('/').pop()
      if (id === '') {
        return active === path
      }
      return active.split('/').includes(id)
    },
    openSubmenu(key) {
      this.opensub = key
    },
    closeSubmenu() {
      this.opensub = null
    },
    getPath(path) {
      const compiled = template(path)
      return compiled({ season: this.season })
    }
  }
}
</script>
