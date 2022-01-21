<template>
  <span
    :style="`background-image: url(${require(`~/assets/teams/${teamid}.svg`)});${styles}`"
    aria-hidden="true"
    class="w-7 h-4 bg-cover bg-center inline-block align-middle border border-primary-800 bg-white"
  />
</template>

<script>
export default {
  props: {
    teamid: String,
    styles: String
  }
}
</script>
