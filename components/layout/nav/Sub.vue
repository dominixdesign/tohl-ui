<template>
  <transition
    enter-active-class="transition-opacity ease-linear duration-300"
    leave-active-class="transition-opacity ease-linear duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="space-x-2 absolute left-0 bottom-0 flex z-40"
      v-if="submenuOpen"
      :key="`submenu-${opensub}`"
    >
      <NuxtLink
        v-for="sub in entries"
        :key="sub.title"
        :to="getPath(sub.path)"
        @click.native="triggerRoute"
        class="
          group
          pt-2
          pb-2
          px-2
          text-sm
          font-medium
          whitespace-nowrap
          border-0
          hover:text-white hover:bg-secondary-700
        "
        :class="
          isActiveSubElement(sub.path)
            ? 'border-secondary-700 pb-0 border-b-8'
            : 'border-transparent text-gray-600 dark:text-gray-400 '
        "
      >
        {{ sub.title.replace(' ', '&nbsp;') }}
      </NuxtLink>
    </div>
  </transition>
</template>

<script>
import { template } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'NavEntry',
  props: {
    opensub: Number,
    entries: Array,
    routeAction: Function
  },
  computed: {
    ...mapGetters({
      season: 'navigation/season'
    }),
    ...mapState({
      active: (state) => state.route.path
    }),
    submenuOpen() {
      return this.entries.length > 0
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
