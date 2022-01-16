<template>
  <span>
    <span v-if="totalTeams" class="w-7 h-4 inline-block relative">
      <team-logo-inline
        v-for="(tt, tt_index) of totalTeams"
        :key="`${team.teamid}-${player.lname}-${index}-${tt.teamid}`"
        :styles="getClipPath(totalTeams.length, tt_index)"
        :teamid="tt.teamid"
        class="absolute left-0 top-1"
      />
    </span>
    <team-logo-inline v-else :teamid="team.teamid" />
    <player-linked-name :player="player" />
  </span>
</template>

<script>
export default {
  props: {
    player: Object,
    team: Object,
    totalTeams: {
      type: Array,
      defaul: []
    }
  },
  methods: {
    getClipPath(max_tt, tt_index) {
      let first = (100 / max_tt) * (max_tt - (tt_index + 1))
      first = tt_index === 0 ? first + 5 : first
      const second = (100 / max_tt) * tt_index
      return `clip-path: inset(0% ${first === 100 ? 0 : first}% 0% ${
        second === 100 ? 0 : second
      }%);`
    }
  }
}
</script>
