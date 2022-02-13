<template>
  <div class="lines-playerGroup" :class="'lines-player-' + count">
    <ul>
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
    count: function() {
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
