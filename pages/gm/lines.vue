<template>
  <div class="pb-20">
    <nav class="flex w-full gap-0.5 bg-primary-500 pb-0.5">
      <nuxt-link
        to="/gm/lines/roster"
        class="basis-1/2 p-2 text-center"
        :class="
          activePage === '/gm/lines/roster'
            ? 'bg-primary-400 dark:bg-primary-600'
            : 'bg-gray-200 dark:bg-primary-900'
        "
      >
        Kader
      </nuxt-link>
      <nuxt-link
        to="/gm/lines/lines"
        class="basis-1/2 p-2 text-center"
        :class="
          activePage === '/gm/lines/lines'
            ? 'bg-primary-400 dark:bg-primary-600'
            : 'bg-gray-200 dark:bg-primary-900'
        "
      >
        Aufstellung
      </nuxt-link>
    </nav>
    <nuxt-child />
    <layout-elements-fab />
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  middleware: ['isAuth'],
  computed: {
    activePage() {
      return this.$route.path
    }
  }
}
</script>
