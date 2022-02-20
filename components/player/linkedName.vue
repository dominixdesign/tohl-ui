<template functional>
  <nuxt-link
    v-if="props.player"
    :to="`/player/${props.player.id}`"
    class="underline decoration-primary-500"
  >
    <span class="hidden md:inline">{{ props.player.display_fname }} </span>
    <span class="inline md:hidden">{{ props.player.display_fname[0] }}. </span>
    <span class="font-bold">{{ props.player.display_lname }}</span>
  </nuxt-link>
</template>
