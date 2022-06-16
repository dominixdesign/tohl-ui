<template>
  <nuxt-link
    v-once
    v-if="player"
    :to="`/player/${player.id}`"
    class="underline decoration-primary-500"
  >
    <span class="hidden md:inline">{{ player.display_fname }}&nbsp;</span>
    <span class="inline md:hidden">{{ player.display_fname[0] }}.&nbsp;</span>
    <span class="font-bold">{{ player.display_lname }}</span>
  </nuxt-link>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  player: Object
})
</script>
