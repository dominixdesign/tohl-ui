<template>
  <div>
    <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
    <button
      v-if="entry.children"
      @click="submenuOpen ? handler.closeSubmenu() : handler.openSubmenu(index)"
      type="button"
      class="rounded-md py-2 px-3 uppercase inline-flex items-center text-sm font-medium"
      :class="
        isActiveElement
          ? 'bg-secondary-800 text-white'
          : 'text-primary-500 dark:text-primary-300 hover:text-primary-800 hover:bg-gray-100'
      "
      :aria-controls="`sub-menu-1${entry.title}`"
      :aria-expanded="submenuOpen"
    >
      {{ entry.title }}
      <svg
        class="mr-2 flex-shrink-0 h-5 w-5 transform transition ease-in-out duration-150"
        :class="submenuOpen ? 'rotate-90' : 'rotate-90 scale-105'"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
    </button>
    <!-- Expandable link section, show/hide based on state. -->
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
        :id="`sub-menu-1${entry.title}`"
        v-if="submenuOpen"
      >
        <NuxtLink
          v-for="sub in entry.children"
          :key="sub.title"
          :to="getPath(sub.path)"
          @click.native="triggerRoute"
          class="group p-2 text-sm font-medium whitespace-nowrap"
          :class="
            isActiveSubElement(sub.path)
              ? 'bg-secondary-800 text-gray-200'
              : 'text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-secondary-600'
          "
        >
          {{ sub.title.replace(' ', '&nbsp;') }}
        </NuxtLink>
      </div>
    </transition>
    <NuxtLink
      v-if="!entry.children"
      :to="getPath(entry.path)"
      @click.native="triggerRoute"
      class="rounded-md py-2 uppercase px-3 inline-flex items-center text-sm font-medium"
      :class="
        isActiveElement
          ? 'bg-secondary-800 text-white'
          : 'text-primary-500 dark:text-primary-300 hover:text-primary-800 hover:bg-gray-100'
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
