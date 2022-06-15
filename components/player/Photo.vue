<template>
  <div class="relative">
    <img
      class="h-36 w-28 object-cover max-w-none"
      :src="`https://my-tohl.org/img/player/${playerid}.jpg`"
      alt=""
    />
    <span class="absolute inset-0 shadow-inner border border-gray-100" aria-hidden="true" />
    <span
      class="absolute bottom-0 right-0 transform block border-2 border-white rounded-full translate-x-2 translate-y-2"
    >
      <img class="block h-10 w-10 rounded-full p-1 bg-white" :src="`/teams/${teamid}.svg`" alt="" />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  teamid: String,
  playerid: String
})
</script>
