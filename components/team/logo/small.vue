<template>
  <component :is="teamlogo" aria-hidden="true" class="w-9 h-9" />
</template>

<script>
export default {
  props: {
    teamid: String
  },
  computed: {
    teamlogo() {
      return () =>
        import(/* webpackChunkName: `icon/[request]` */ `~/static/teams/${this.teamid}.svg?inline`)
    }
  }
}
</script>
