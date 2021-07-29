<template>
  <div>
    <button @click="showSlide = true">Saison</button>
    <layout-slide-season v-if="showSlide" :close="closeSlide" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSlide: false
    }
  },
  methods: {
    closeSlide() {
      this.showSlide = false
    }
  }
}
</script>

<style></style>
