<template>
  <div>
    <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
    <button
      v-if="entry.children"
      @click="submenuOpen ? handler.closeSubmenu() : handler.openSubmenu(index)"
      type="button"
      class="nav-entry"
      :class="isActiveElement ? 'active' : ''"
      :aria-controls="`sub-menu-1${entry.title}`"
      :aria-expanded="submenuOpen"
    >
      {{ entry.title }}
      <svg
        class="flex-shrink-0 h-5 w-5"
        :class="submenuOpen ? 'rotate-90' : 'rotate-90 scale-105'"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
    </button>
    <NuxtLink
      v-if="!entry.children"
      :to="getPath(entry.path)"
      @click.native="triggerRoute"
      class="nav-entry"
      :class="isActiveElement ? 'active' : ''"
    >
      {{ entry.title }}
    </NuxtLink>
  </div>
</template>

<script>
import { template } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'NavEntry',
  props: {
    entry: Object,
    opensub: Number,
    index: Number,
    routeAction: Function,
    handler: Object
  },
  computed: {
    ...mapGetters({
      season: 'navigation/season'
    }),
    ...mapState({
      active: (state) => state.route.path
    }),
    submenuOpen() {
      return this.index === this.opensub
    },
    isActiveElement() {
      const id = this.entry.path.split('/').pop()
      if (id === '') {
        return this.active === this.entry.path
      }
      return this.active.split('/').includes(id)
    }
  },
  methods: {
    triggerRoute() {
      if (typeof this.routeAction === 'function') {
        this.routeAction()
      }
    },
    getPath(path) {
      const compiled = template(path)
      return compiled({ season: this.season })
    }
  }
}
</script>

<style scoped>
.nav-entry {
  @apply py-2 uppercase px-3 inline-flex items-center text-sm font-medium border-0 border-transparent text-primary-500 dark:text-primary-300;
}
.nav-entry:hover {
  @apply text-white bg-secondary-700;
}
.nav-entry.active {
  @apply border-secondary-700 pb-0 border-b-8;
}
</style>
