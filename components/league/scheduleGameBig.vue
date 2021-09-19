<template>
  <div class="flex items-center bg-gray-100 dark:bg-primary-900 mb-2 hover:shadow-schedule">
    <div class="flex-grow w-24">
      <div class="flex items-center justify-end">
        <div>{{ game.home.teamsim }}</div>
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
          OT{{ overtimes > 1 ? overtimes : '' }}
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
        <div>{{ game.away.teamsim }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object
  }
}
</script>
