<template>
  <nuxt-link :to="`/player/${player.id}`">
    {{ player.display_fname }}
    <span class="font-bold">
      {{ player.display_lname }}
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    player: Object
  }
}
</script>
