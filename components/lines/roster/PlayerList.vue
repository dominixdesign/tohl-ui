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
        class="my-2 flex content-center items-center gap-1 border py-3 px-1"
        :class="
          dressedError(player.status)
            ? 'border-secondary-600 bg-secondary-100'
            : 'border-gray-300 bg-gray-100'
        "
      >
        <span class="grow leading-3">
          <lines-roster-player-status class="float-left h-5 w-5" :status="player.status" />
          <span class="mx-1 pt-1">
            <b>{{ player.display_lname }}</b
            >, <wbr />{{ player.display_fname }}</span
          >
          <span v-if="player.seasondata.cd <= 99 && player.seasondata.cd > 0" class="text-sm"
            >(CD {{ player.seasondata.cd }})</span
          >
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
export default {
  name: 'PlayerList',
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
