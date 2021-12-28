<template>
  <div class="flex items-center">
    <team-logo-small :teamid="team.teamid" />
    <nuxt-link :to="`/clubs/${team.teamsim}`" class="ml-2 font-mono font-extralight uppercase">{{
      team.teamsim
    }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    team: Object
  }
}
</script>
