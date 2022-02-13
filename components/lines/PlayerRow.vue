<template>
  <tr>
    <td>{{ player.po }}</td>
    <td class="name">
      <PlayerStatus :status="player.status" />
      <b>{{ player.lname }}</b
      >, {{ player.fname }}
    </td>
    <td>
      <button class="button" :disabled="player.status > 2" @click="() => onSelect(player)">
        <font-awesome-icon icon="angle-right" />
      </button>
    </td>
    <td>{{ player.it }}</td>
    <td>{{ player.sp }}</td>
    <td>{{ player.st }}</td>
    <td>{{ player.en }}</td>
    <td>{{ player.du }}</td>
    <td>{{ player.di }}</td>
    <td>{{ player.sk }}</td>
    <td>{{ player.pa }}</td>
    <td>{{ player.pc }}</td>
    <td>{{ player.df }}</td>
    <td>{{ player.sc }}</td>
    <td>{{ player.ex }}</td>
    <td>{{ player.ld }}</td>
    <td>{{ player.ov }}</td>
  </tr>
</template>

<script>
import PlayerStatus from './roster/PlayerStatus'

export default {
  name: 'PlayerRow',
  components: {
    PlayerStatus
  },
  props: {
    player: Object,
    onSelect: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to tdis component only -->
<style scoped>
td {
  padding: 8px 2px 8px 2px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
tr:hover {
  background: #eee;
}
.button {
  color: #444;
  cursor: pointer;
  padding: 6px 10px;
  font-size: 12px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}
.button:disabled {
  color: #aaa;
  cursor: default;
}
</style>
