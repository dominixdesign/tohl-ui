<template>
  <div class="p-2 last:pt-0" :class="'lines-player-' + count">
    <ul class="grid grid-cols-6 gap-2">
      <Player v-for="(player, n) in group" :key="n" :block="block" :pos="player" />
    </ul>
  </div>
</template>

<script>
import Player from './Player'

export default {
  name: 'PlayerGroup',
  props: {
    group: Array,
    block: String
  },
  components: {
    Player
  },
  computed: {
    count: function () {
      return Object.keys(this.group).length
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
