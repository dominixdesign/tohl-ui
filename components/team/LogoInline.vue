<template>
  <span class="inline-block border border-primary-800 h-4 w-7 rounded-full p-0 overflow-hidden">
    <img class="block object-cover bg-white" :src="`/teams/${teamid}.svg`" alt="" />
  </span>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  teamid: String
})
const { teamid } = toRefs(props)
</script>
