<template>
  <div class="flex items-center">
    <div class="flex-grow w-24">
      <div class="flex items-center justify-end">
        <div class="hidden sm:block">{{ game.home.teamsim }}</div>
        <team-logo-small class="mx-3" :teamid="game.home.teamid" />
      </div>
    </div>
    <div>
      <div class="flex relative">
        <div
          class="flex flex-col items-center justify-center w-11 h-14"
          :class="
            game.winner && game.winner.teamid === game.home.teamid
              ? 'dark:bg-gray-600 bg-gray-300 text-primary-500 dark:text-primary-200'
              : 'dark:bg-gray-500 bg-gray-200 dark:text-white text-black'
          "
        >
          <div class="uppercase text-xs">{{ game.home.teamid }}</div>
          <div class="text-2xl font-bold">{{ game.goalshome }}</div>
        </div>
        <div
          v-if="game.overtimes > 0"
          class="
            absolute
            text-black
            bg-gray-100
            border border-primary-700
            rounded-full
            text-xxs text-center
            w-5
            h-5
            left-1/2
            transform
            -translate-x-1/2
            bottom-1
          "
        >
          OT{{ game.overtimes > 1 ? game.overtimes : '' }}
        </div>
        <div
          class="flex flex-col items-center justify-center w-11 h-14"
          :class="
            game.winner && game.winner.teamid === game.away.teamid
              ? 'dark:bg-gray-600 bg-gray-300 text-primary-500 dark:text-primary-200'
              : 'dark:bg-gray-500 bg-gray-200 dark:text-white text-black'
          "
        >
          <div class="uppercase text-xs">{{ game.away.teamid }}</div>
          <div class="text-2xl font-bold">{{ game.goalsaway }}</div>
        </div>
      </div>
    </div>
    <div class="flex-grow w-24">
      <div class="flex items-center justify-start">
        <team-logo-small class="mx-3" :teamid="game.away.teamid" />
        <div class="hidden sm:block">{{ game.away.teamsim }}</div>
      </div>
    </div>
    <nuxt-link :to="boxscoreLink" class="flex p-2 content-center" v-if="isGameOver">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fill-rule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clip-rule="evenodd"
        />
      </svg>
      <div>Boxscore</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    game: Object
  },
  computed: {
    boxscoreLink() {
      return `/${this.game.season}/game/${this.game.id}`
    },
    isGameOver() {
      return this.game.goalshome > 0 || this.game.goalsaway > 0
    }
  }
}
</script>
