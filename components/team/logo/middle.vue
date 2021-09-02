<template>
  <component
    :is="teamlogo"
    aria-hidden="true"
    class="w-20 h-20 p-2 rounded-full bg-white border border-gray-100 shadow"
  />
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
