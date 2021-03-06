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
        class="h-5 w-5 shrink-0"
        :class="submenuOpen ? 'rotate-90' : 'rotate-90 scale-105'"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
    </button>
    <div class="space-y-1" :id="`sub-menu-1${entry.title}`" v-if="submenuOpen">
      <NuxtLink
        v-for="sub in entry.children"
        :key="sub.title"
        :to="getPath(sub.path)"
        @click.native="triggerRoute"
        class="
          group
          flex
          w-full
          items-center
          bg-white bg-opacity-5
          py-2
          pl-10
          pr-2
          text-sm
          font-medium
          opacity-80
        "
        :class="
          isActiveSubElement(sub.path)
            ? 'bg-secondary-800 bg-opacity-50 text-white'
            : 'text-gray-200'
        "
      >
        {{ sub.title }}
      </NuxtLink>
    </div>
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
    },
    isActiveSubElement(path) {
      return this.active.includes(this.getPath(path))
    }
  }
}
</script>

<style scoped>
.nav-entry {
  @apply mb-2 inline-flex w-full items-center justify-center place-self-center border-0 border-transparent bg-black bg-opacity-5 p-2 font-medium uppercase text-gray-100;
}
.nav-entry.active {
  @apply border-l-8 border-r-8 border-secondary-700;
}
</style>
