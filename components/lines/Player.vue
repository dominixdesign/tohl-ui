<template>
  <li>
    <span class="playerdisplay">
      <span class="position">{{ pos.toUpperCase() }}</span>
      <PlayerStatus :status="player.status" v-if="player.fname" />
      <span class="playername" v-if="player.fname">
        <b>{{ player.lname }}</b
        >, {{ player.fname }}
        <span class="playerinfo"
          >({{ player.po }}, OV{{ player.ov
          }}<span v-if="player.cd <= 99">, CD {{ player.cd }}</span
          >)</span
        >
      </span>
    </span>
    <button @click.stop="showPlayerSelect" class="button down">
      <font-awesome-icon icon="people-arrows" /> ändern
    </button>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerStatus from './roster/PlayerStatus'

export default {
  name: 'Player',
  props: {
    block: String,
    pos: String
  },
  components: {
    PlayerStatus
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

<style scoped>
ul li {
  list-style: none;
  padding: 0;
  background-color: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  margin: 5px 0;
  padding: 5px;
  display: grid;
  grid-template-columns: auto 125px;
  column-gap: 5px;
}
ul li.undressable {
  background-color: rgba(185, 39, 39, 0.1);
  border: 1px solid rgba(185, 39, 39, 0.3);
}
ul li span.playername {
  margin: 0 4px;
  font-size: 24px;
  padding-top: 3px;
}
ul li span.playername .playerinfo {
  font-size: 14px;
}
ul li span.position {
  display: block;
  margin: 6px 2px 0;
  font-size: 20px;
  color: #ccc;
}
.playerdisplay {
  display: grid;
  grid-template-columns: 35px 20px auto;
}
.playerdisplay svg {
  margin: 16px 0 0 6px;
}
.button {
  color: #444;
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}
.button:disabled {
  color: #aaa;
  cursor: default;
}
</style>
