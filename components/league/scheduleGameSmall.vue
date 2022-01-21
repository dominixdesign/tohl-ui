<template>
  <div class="flex items-center bg-gray-100 dark:bg-primary-900 mb-1 hover:shadow-schedule">
    <div class="grow w-24">
      <div class="flex items-center justify-end mr-3">
        <div>{{ game.home.teamsim }}</div>
      </div>
    </div>
    <div>
      <div class="flex">
        <div
          class="flex flex-col items-center justify-center w-8 h-10"
          :class="
            game.winner && game.winner.teamid === game.home.teamid
              ? 'dark:bg-gray-600 bg-gray-300 text-primary-500 dark:text-primary-200'
              : 'dark:bg-gray-500 bg-gray-200 dark:text-white text-black'
          "
        >
          <div class="text-2xl font-bold">{{ game.goalshome }}</div>
        </div>
        <div
          class="flex flex-col items-center justify-center w-8 h-10"
          :class="
            game.winner && game.winner.teamid === game.away.teamid
              ? 'dark:bg-gray-600 bg-gray-300 text-primary-500 dark:text-primary-200'
              : 'dark:bg-gray-500 bg-gray-200 dark:text-white text-black'
          "
        >
          <div class="text-2xl font-bold">{{ game.goalsaway }}</div>
        </div>
      </div>
    </div>
    <div class="grow w-24">
      <div class="flex items-center justify-start ml-3">
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
