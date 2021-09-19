<template>
  <div :id="`gameday-${gameday}`">
    <div class="my-3 text-lg font-bold">{{ gameday }}. Spieltag</div>
    <league-schedule-game-big v-for="game in games" :key="game.game" :game="game" />
  </div>
</template>

<script>
export default {
  props: {
    gameday: Number,
    games: []
  }
}
</script>
