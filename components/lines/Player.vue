<template>
  <li>
    <span class="playerdisplay">
      <span class="position">{{ pos.toUpperCase() }}</span>
      <lines-roster-player-status class="h-5 w-5" :status="player.status" v-if="player.fname" />
      <span class="playername" v-if="player.fname">
        <b>{{ player.display_lname }}</b
        >, {{ player.display_fname }}
        <span class="playerinfo"
          >({{ player.po }}, OV{{ player.ov
          }}<span v-if="player.cd <= 99">, CD {{ player.cd }}</span
          >)</span
        >
      </span>
    </span>
    <button @click.stop="showPlayerSelect" class="button down">ändern</button>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Player',
  props: {
    block: String,
    pos: String
  },
  computed: {
    ...mapGetters({
      getPlayer: 'lines/getPlayer'
    }),
    player() {
      return this.getPlayer(this.$store.getters['lines/getSelected'], this.block, this.pos)
    }
  },
  methods: {
    showPlayerSelect() {
      this.$store.commit('layout/selectPlayer', {
        line: this.$store.getters['lines/getSelected'],
        block: this.block,
        pos: this.pos
      })
    }
  }
}
</script>
