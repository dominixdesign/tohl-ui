<template>
  <div :id="`gameday-${gameday}`" class="xl:shadow mt-4">
    <div
      class="
        p-3
        text-lg
        font-bold
        bg-primary-500
        dark:bg-primary-700
        text-primary-50
        dark:text-primary-200
      "
    >
      {{ title || `${gameday}. Spieltag` }}
    </div>
    <league-schedule-game-big
      v-for="(game, index) in games"
      :key="game.game"
      :game="game"
      :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
    />
  </div>
</template>

<script>
export default {
  props: {
    gameday: Number,
    title: String,
    games: []
  }
}
</script>
