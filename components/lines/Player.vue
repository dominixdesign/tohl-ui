<template>
  <li
    @click.stop="showPlayerSelect = true"
    class="
      col-span-2
      flex flex-col
      rounded-xl
      border-t-4 border-red-500
      bg-gray-100
      p-2
      shadow-lg
      dark:bg-primary-800
    "
    :class="[
      pos.toUpperCase() === 'D1' ? 'col-start-2' : '',
      player.status >= 3 ? 'border-red-700 bg-red-100' : '',
      player.status === 2 ? 'border-yellow-600' : '',
      player.status === 1 ? 'border-green-800' : ''
    ]"
  >
    <div v-if="player.seasondata" class="flex flex-col">
      <div class="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
        {{ player.display_lname.replace(' ', '&nbsp;') }}
      </div>
      <div class="overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
        {{ player.display_fname }}
      </div>
    </div>
    <div v-if="player.seasondata" class="flex flex-row flex-wrap">
      <div>{{ player.seasondata.ov }}</div>
      <div>&nbsp;-&nbsp;{{ player.pos }}</div>
      <div v-if="player.seasondata.cd <= 99 && player.seasondata.cd > 0">
        &nbsp;-&nbsp;CD{{ player.seasondata.cd }}
      </div>
    </div>
    <div class="grid_6" v-if="showPlayerSelect">
      <layout-modals-modal :show="showPlayerSelect" @close="close">
        <lines-player-select
          :line="$store.getters['lines/getSelected']"
          :block="block"
          :pos="pos"
          :close="close"
        />
      </layout-modals-modal>
    </div>
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
  data() {
    return {
      showPlayerSelect: false
    }
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
    close() {
      this.showPlayerSelect = false
    }
  }
}
</script>
