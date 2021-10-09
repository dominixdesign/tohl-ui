<template>
  <div>
    <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
    <button
      v-if="entry.children"
      @click="submenuOpen ? handler.closeSubmenu() : handler.openSubmenu(index)"
      type="button"
      class="group w-full flex items-center pr-2 py-2 text-sm font-medium"
      :class="
        isActiveElement
          ? 'bg-secondary-800 text-white'
          : 'text-gray-800 dark:text-gray-200 hover:text-gray-200 hover:bg-secondary-600 transform hover:translate-x-1 transition-transform'
      "
      :aria-controls="`sub-menu-1${entry.title}`"
      :aria-expanded="submenuOpen"
    >
      <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
      <svg
        class="
          text-gray-300
          mr-2
          flex-shrink-0
          h-5
          w-5
          transform
          group-hover:text-gray-400
          transition
          ease-in-out
          duration-150
        "
        :class="submenuOpen ? 'text-gray-400 rotate-90' : 'text-gray-300'"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
      {{ entry.title }}
    </button>
    <!-- Expandable link section, show/hide based on state. -->
    <div class="space-y-1" :id="`sub-menu-1${entry.title}`" v-if="submenuOpen">
      <NuxtLink
        v-for="sub in entry.children"
        :key="sub.title"
        :to="getPath(sub.path)"
        @click.native="triggerRoute"
        class="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium opacity-80"
        :class="
          isActiveSubElement(sub.path)
            ? 'bg-secondary-800 text-white'
            : 'text-gray-800 dark:text-gray-200 hover:text-gray-200 hover:bg-secondary-600 transform hover:translate-x-1 transition-transform'
        "
      >
        {{ sub.title }}
      </NuxtLink>
    </div>
    <NuxtLink
      v-if="!entry.children"
      :to="getPath(entry.path)"
      @click.native="triggerRoute"
      class="group flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-sm"
      :class="
        isActiveElement
          ? 'bg-secondary-800 text-white'
          : 'text-gray-800 dark:text-gray-200 hover:text-gray-200 hover:bg-secondary-600 transform hover:translate-x-1 transition-transform'
      "
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
    isActiveSubElement(path) {
      return this.active.includes(this.getPath(path))
    },
    getPath(path) {
      const compiled = template(path)
      return compiled({ season: this.season })
    }
  }
}
</script>
