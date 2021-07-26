<template>
  <component :is="teamlogo" aria-hidden="true" class="w-10 h-6" />
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
