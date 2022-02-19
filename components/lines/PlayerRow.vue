<template>
  <tr>
    <td>{{ player.pos }}</td>
    <td class="whitespace-nowrap" @click="() => onSelect(player)">
      <PlayerStatus class="float-left h-4 w-4" :status="player.status" />
      <b>{{ player.display_lname }}</b
      >, {{ player.display_fname }}
    </td>
    <td>
      <button class="button" :disabled="player.status > 2" @click="() => onSelect(player)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 15l-6 -6l-6 6h12" transform="rotate(90 12 12)"></path>
        </svg>
      </button>
    </td>
    <td>{{ player.seasondata.it }}</td>
    <td>{{ player.seasondata.sp }}</td>
    <td>{{ player.seasondata.st }}</td>
    <td>{{ player.seasondata.en }}</td>
    <td>{{ player.seasondata.du }}</td>
    <td>{{ player.seasondata.di }}</td>
    <td>{{ player.seasondata.sk }}</td>
    <td>{{ player.seasondata.pa }}</td>
    <td>{{ player.seasondata.pc }}</td>
    <td>{{ player.seasondata.df }}</td>
    <td>{{ player.seasondata.sc }}</td>
    <td>{{ player.seasondata.ex }}</td>
    <td>{{ player.seasondata.ld }}</td>
    <td>{{ player.seasondata.ov }}</td>
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
