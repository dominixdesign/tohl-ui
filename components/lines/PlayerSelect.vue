<template>
  <div class="lines">
    <button @click="hidePlayerSelect">Zurück</button>
    <div class="linesTitle">
      {{ playerSelectData.line }} - {{ label() }} - {{ playerSelectData.pos }}
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
            p =>
              p.po.substring(0, 1).toLowerCase() ===
              playerSelectData.pos.substring(0, 1).toLowerCase()
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
            p =>
              p.po.substring(0, 1).toLowerCase() !==
              playerSelectData.pos.substring(0, 1).toLowerCase()
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
  computed: {
    ...mapGetters({
      players: 'roster/getPro',
      playerSelectData: 'layout/getPlayerSelectData'
    })
  },
  methods: {
    label() {
      return this.$store.getters['labels/get'](
        this.playerSelectData.line + '-' + this.playerSelectData.block
      )
    },
    hidePlayerSelect() {
      this.$store.commit('layout/selectPlayer', {})
    },
    selectPlayer(player) {
      this.$store.dispatch('lines/setPlayerOfLine', {
        line: this.playerSelectData.toString,
        player
      })
      this.hidePlayerSelect()
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
