<template>
  <img :src="require(`~/assets/teams/${teamid}.svg`)" aria-hidden="true" class="w-9 h-9" />
</template>

<script>
export default {
  props: {
    teamid: String
  }
}
</script>
