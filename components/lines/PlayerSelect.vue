<template>
  <div class="lines overflow-x-auto">
    <div
      class="
        bg-primary-500
        p-3
        text-lg
        font-thin
        uppercase
        text-primary-50
        dark:bg-primary-700 dark:text-primary-200
      "
    >
      {{ line }} - {{ $t(`lines.${line}-${block}`) }} - {{ pos.toUpperCase() }}
      <button
        class="float-right -mt-1 block rounded-md bg-secondary-600 py-1 px-3 text-white"
        @click="hidePlayerSelect"
      >
        Zurück
      </button>
    </div>
    <table cellspacing="0">
      <thead>
        <tr>
          <th>Pos.</th>
          <th>Spieler</th>
          <th></th>
          <th>IT</th>
          <th>SP</th>
          <th>ST</th>
          <th>EN</th>
          <th>DU</th>
          <th>DI</th>
          <th>SK</th>
          <th>PA</th>
          <th>PC</th>
          <th>DF</th>
          <th>SC</th>
          <th>EX</th>
          <th>LD</th>
          <th>OV</th>
        </tr>
      </thead>
      <tbody>
        <PlayerRow
          v-for="player in players.filter(
            (p) => p.pos.substring(0, 1).toLowerCase() === pos.substring(0, 1).toLowerCase()
          )"
          :key="player.fname + player.lname"
          :player="player"
          :onSelect="selectPlayer"
        />
        <tr>
          <td colspan="15"><hr /></td>
        </tr>
        <PlayerRow
          v-for="player in players.filter(
            (p) => p.pos.substring(0, 1).toLowerCase() !== pos.substring(0, 1).toLowerCase()
          )"
          :key="player.fname + player.lname"
          :player="player"
          :onSelect="selectPlayer"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerRow from './PlayerRow'

export default {
  name: 'Lines',
  components: {
    PlayerRow
  },
  props: {
    block: String,
    line: String,
    pos: String,
    close: Function
  },
  computed: {
    ...mapGetters({
      players: 'roster/getPro',
      playerSelectData: 'layout/getPlayerSelectData'
    })
  },
  methods: {
    hidePlayerSelect() {
      this.close()
    },
    selectPlayer(player) {
      if (player.status > 2) {
        return
      }
      this.$store.dispatch('lines/setPlayerOfLine', {
        line: `${this.line}-${this.block}-${this.pos}`,
        player
      })
      this.close()
    }
  }
}
</script>

<style scoped>
th {
  font-family: 'Economica', sans-serif;
  padding: 8px 4px 8px 4px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  font-weight: bold;
  position: static;
}
</style>
