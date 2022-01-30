<template>
  <div class="px-2 text-lg font-bold text-gray-400">
    {{ ('00' + minutes).slice(-2) }}:{{ ('00' + seconds).slice(-2) }}
  </div>
</template>

<script>
export default {
  props: {
    minutes: String | Number,
    seconds: String | Number
  }
}
</script>

<style></style>
