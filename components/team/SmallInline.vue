<template>
  <span
    class="inline-block px-3 py-0.5 rounded-full text-xs font-medium uppercase w-12 text-center"
    :style="`background: ${team.background}; color: ${team.foreground};`"
  >
    {{ team.teamid }}
  </span>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  team: Object
})
const { team } = toRefs(props)
</script>
