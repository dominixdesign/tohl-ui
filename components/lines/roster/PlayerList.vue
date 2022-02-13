<template>
  <div>
    <div
      class="
        bg-primary-500
        p-3
        text-lg
        font-bold
        text-primary-50
        dark:bg-primary-700 dark:text-primary-200
      "
    >
      {{ team }}
    </div>
    <ul>
      <li
        v-for="player in roster"
        :key="player.lname"
        class="my-2 flex content-center items-center gap-1 border p-3"
        :class="
          dressedError(player.status)
            ? 'border-secondary-600 bg-secondary-100'
            : 'border-gray-300 bg-gray-100'
        "
      >
        <span class="grow">
          <PlayerStatus :status="player.status" />
          <span class="mx-2 pt-1 text-lg"
            ><b>{{ player.display_lname }}</b
            >, {{ player.display_fname }}</span
          >
          <span v-if="player.cd <= 99">(CD {{ player.cd }})</span>
        </span>
        <button
          @click.stop="() => movePlayer(player, 'scratch')"
          class="button down"
          v-if="team === 'pro'"
        >
          <lines-roster-icon-down /> scratch
        </button>
        <button
          @click.stop="() => movePlayer(player, 'farm')"
          :disabled="!isDressable(player.status)"
          class="button down"
          v-if="team === 'pro'"
        >
          <lines-roster-icon-double-down /> to farm
        </button>
        <button
          @click.stop="() => movePlayer(player, 'pro')"
          :disabled="!isDressable(player.status)"
          class="button up"
          v-if="team === 'scratch'"
        >
          <lines-roster-icon-up /> dress
        </button>
        <button
          @click.stop="() => movePlayer(player, 'farm')"
          :disabled="!isDressable(player.status)"
          class="button down"
          v-if="team === 'scratch'"
        >
          <lines-roster-icon-down /> to farm
        </button>
        <button
          @click.stop="() => movePlayer(player, 'scratch')"
          class="button up"
          v-if="team === 'farm'"
        >
          <lines-roster-icon-up /> scratch
        </button>
        <button
          @click.stop="() => movePlayer(player, 'pro')"
          :disabled="!isDressable(player.status)"
          class="button up"
          v-if="team === 'farm'"
        >
          <lines-roster-icon-double-up /> dress
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import PlayerStatus from './PlayerStatus'

export default {
  name: 'PlayerList',
  components: {
    PlayerStatus
  },
  props: {
    team: String
  },
  computed: {
    roster() {
      return this.$store.getters['roster/getByTeamAndPos'](this.team, [
        this.$store.getters['roster/getSelected']
      ])
    }
  },
  methods: {
    movePlayer(player, toTeam) {
      this.$store.dispatch('roster/movePlayer', {
        player,
        fromTeam: this.team,
        toTeam
      })
    },
    isDressable(status) {
      return status <= 2
    },
    dressedError(status) {
      return (this.team === 'pro' || this.team === 'farm') && status > 2
    }
  }
}
</script>

<style scoped>
button.button {
  @apply flex w-24 flex-none items-center overflow-hidden bg-gray-200 p-2 text-sm uppercase;
}
</style>
