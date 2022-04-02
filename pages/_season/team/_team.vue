<template>
  <div>
    <div class="relative isolate overflow-hidden shadow">
      <team-bg :foreground="foregroundColor" :background="backgroundColor" />
      <div class="container mx-auto flex flex-col p-6 sm:flex-row">
        <div class="w-full sm:w-40">
          <team-logo-big :teamid="team" />
        </div>
        <div class="flex grow flex-col place-items-center gap-1 sm:place-items-start sm:pl-6">
          <team-switch :current-team="team" />
          <ul
            class="
              mt-3
              flex flex-wrap
              rounded-lg
              bg-gray-50 bg-opacity-40
              p-0.5
              text-center text-sm
              font-medium
              text-gray-500
              dark:text-gray-400
            "
          >
            <li class="mr-2">
              <a
                href="#"
                class="active inline-block rounded-lg bg-blue-600 py-3 px-4 text-white"
                aria-current="page"
                >Tab 1</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                >Tab 2</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                >Tab 3</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="
                  inline-block
                  rounded-lg
                  py-3
                  px-4
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                >Tab 4</a
              >
            </li>
            <li>
              <a class="inline-block cursor-not-allowed py-3 px-4 text-gray-400 dark:text-gray-500"
                >Tab 5</a
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

<style></style>
