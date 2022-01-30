<template>
  <div class="px-2">
    <team-logo-small class="hidden md:block" v-if="team && team.teamid" :teamid="team.teamid" />
    <team-logo-inline class="block md:hidden" v-if="team && team.teamid" :teamid="team.teamid" />
    <div class="h-9 w-9" v-else />
  </div>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: false
    }
  }
}
</script>
