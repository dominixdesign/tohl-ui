<template>
  <nav class="flex-1 px-2 space-y-1">
    <!-- Current: "bg-indigo-800 text-white", Default: "" -->
    <NuxtLink
      v-for="entry in nav"
      :key="entry.path"
      :to="entry.path"
      @click.native="triggerRoute"
      class="group flex items-center px-2 py-2 text-sm font-medium rounded-sm"
      :class="
        active === entry.path
          ? 'bg-secondary-800 text-white'
          : 'text-gray-800 dark:text-gray-200 hover:text-gray-200 hover:bg-secondary-600 transform hover:translate-x-1 transition-transform'
      "
    >
      {{ entry.title }}
    </NuxtLink>
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
      console.log('trigger', this.routeAction)
      if (typeof this.routeAction === 'function') {
        this.routeAction()
      }
    }
  }
}
</script>
