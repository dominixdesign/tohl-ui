<template>
  <h2 class="my-3">
    <span class="font-extrabold text-3xl uppercase tracking-tighter"><slot /></span>
    <layout-season-select v-if="showSeasonSelect" />
  </h2>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  showSeasonSelect: Boolean
})
const { showSeasonSelect } = toRefs(props)
</script>
