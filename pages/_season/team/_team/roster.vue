<template>
  <div>Roster {{ team }} {{ season }}</div>
</template>

<script>
export default {
  async asyncData({ params: { season, team } }) {
    return { season, team }
  }
}
</script>

<style></style>
