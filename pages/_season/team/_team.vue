<template>
  <div class="isolate">
    <div class="relative isolate z-10 overflow-hidden shadow">
      <team-select :current-team="team" />
      <team-bg :foreground="foregroundColor" :background="backgroundColor" />
      <div
        class="
          container
          mx-auto
          flex flex-col
          place-items-center
          p-6
          sm:flex-row sm:place-items-start
        "
      >
        <div class="w-40">
          <team-logo-big :teamid="team" />
        </div>
        <div class="flex grow flex-col place-items-center gap-1 sm:place-items-start sm:pl-6">
          <h3
            class="
              flex
              items-center
              rounded-lg
              bg-gray-50 bg-opacity-80
              py-1
              px-3
              font-mono
              text-2xl
              font-bold
              text-primary-900
              dark:bg-gray-700 dark:text-white
            "
          >
            {{ team }}
          </h3>
          <ul
            class="
              team-nav
              mt-3
              flex flex-wrap
              rounded-lg
              bg-gray-50 bg-opacity-80
              p-0.5
              text-center text-sm
              font-medium
              text-primary-900
              dark:bg-gray-700 dark:text-white
            "
          >
            <li class="mr-2">
              <nuxt-link
                :to="`/${season}/team/${team}`"
                :style="`--active-bg: ${backgroundColor}; --active-fg: ${foregroundColor};`"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                >Übersicht</nuxt-link
              >
            </li>
            <li class="mr-2">
              <nuxt-link
                :to="`/${season}/team/${team}/roster`"
                :style="`--active-bg: ${backgroundColor}; --active-fg: ${foregroundColor};`"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                aria-current="page"
                >Roster</nuxt-link
              >
            </li>
            <li class="mr-2">
              <nuxt-link
                :to="`/${season}/team/${team}/vitals`"
                :style="`--active-bg: ${backgroundColor}; --active-fg: ${foregroundColor};`"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                >Vitals</nuxt-link
              >
            </li>
            <li class="mr-2">
              <nuxt-link
                :to="`/${season}/team/${team}/finances`"
                :style="`--active-bg: ${backgroundColor}; --active-fg: ${foregroundColor};`"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                >Finanzen</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  async asyncData({ params: { season, team } }) {
    return { season, team }
  },
  computed: {
    backgroundColor() {
      return this.$store.getters['teams/backgroundByTeam'](this.team)
    },
    foregroundColor() {
      return this.$store.getters['teams/foregroundByTeam'](this.team)
    }
  }
}
</script>

<style scoped>
.team-nav .nuxt-link-exact-active {
  color: var(--active-fg);
  background-color: var(--active-bg);
}
</style>
