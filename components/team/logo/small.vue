<template>
  <component :is="teamlogo" aria-hidden="true" class="w-8 h-8 transform scale-110" />
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
