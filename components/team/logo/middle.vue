<template>
  <img
    :src="require(`~/assets/teams/${teamid}.svg`)"
    aria-hidden="true"
    class="w-20 h-20 p-2 rounded-full bg-white border border-gray-100 shadow"
  />
</template>

<script>
export default {
  props: {
    teamid: { type: String }
  }
}
</script>
