<template>
  <span
    :style="`background-image: url(${require(`~/assets/teams/${teamid}.svg`)})`"
    aria-hidden="true"
    class="w-9 h-4 bg-cover bg-center inline-block border border-primary-800 bg-white"
  />
</template>

<script>
export default {
  props: {
    teamid: String
  }
}
</script>
