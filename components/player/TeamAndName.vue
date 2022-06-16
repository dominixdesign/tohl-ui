<template>
  <span>
    <span v-if="totalTeams" class="relative inline-block h-4 w-7">
      <team-small-inline
        v-for="(tt, tt_index) of totalTeams"
        :key="`${team.teamid}-${player.lname}-${index}-${tt.teamid}`"
        :styles="getClipPath(totalTeams.length, tt_index)"
        :teamid="tt.teamid"
        class="absolute left-0 top-1"
      />
    </span>
    <team-small-inline v-else :team="team" class="mr-3" />
    <player-linked-name :player="player" />
  </span>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  player: Object,
  team: Object,
  totalTeams: {
    type: Array,
    default: []
  }
})

const getClipPath = (max_tt, tt_index) => {
  let first = (100 / max_tt) * (max_tt - (tt_index + 1))
  first = tt_index === 0 ? first + 5 : first
  const second = (100 / max_tt) * tt_index
  return `clip-path: inset(0% ${first === 100 ? 0 : first}% 0% ${second === 100 ? 0 : second}%);`
}
</script>
