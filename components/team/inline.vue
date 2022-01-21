<template>
  <span>
    <team-logo-inline :teamid="team.teamid" />
    <nuxt-link :to="`/clubs/${team.teamsim}`" class="ml-2 font-mono font-extralight uppercase">{{
      team.teamsim
    }}</nuxt-link>
  </span>
</template>

<script>
export default {
  props: {
    team: Object
  }
}
</script>
