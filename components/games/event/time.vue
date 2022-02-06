<template>
  <div class="px-2 text-lg font-bold text-gray-400">{{ min }}:{{ ('00' + seconds).slice(-2) }}</div>
</template>

<script>
export default {
  props: {
    minutes: String | Number,
    seconds: String | Number
  },
  computed: {
    min() {
      if (this.minutes.toString().length === 1) {
        return `0${this.minutes.toString()}`
      }
      return this.minutes.toString()
    }
  }
}
</script>

<style></style>
