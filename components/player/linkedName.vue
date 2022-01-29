<template>
  <nuxt-link :to="`/player/${player.id}`" class="underline decoration-primary-500">
    <span>{{ player.display_fname }} </span>
    <span class="font-bold">{{ player.display_lname }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    player: Object
  }
}
</script>
