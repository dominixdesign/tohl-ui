<template>
  <div class="inline-flex font-medium text-3xl uppercase tracking-tighter pl-3">
    <span>{{ `TOHL${$route.params.season}` }}</span>
    <button @click="openSlide = true">
      <SwitchHorizontalIcon class="w-5 h-5 self-center ml-1" />
    </button>
    <layout-season-slide :isOpen="openSlide" :close-nav="() => (openSlide = false)" />
  </div>
</template>

<script setup>
import { SwitchHorizontalIcon } from '@heroicons/vue/outline'
const openSlide = ref(false)
const route = useRoute()
</script>
