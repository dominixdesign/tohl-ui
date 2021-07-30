<template>
  <div>
    <button
      @click="showSlide = true"
      class="
        border-gray-300 border
        dark:border-gray-500
        rounded
        py-1
        px-4
        bg-gradient-to-t
        from-gray-200
        text-gray-800
        dark:from-gray-700 dark:text-gray-400
        font-thin
      "
    >
      Saison: <span class="font-bold text-black dark:text-white">{{ season }}</span>
    </button>
    <layout-slide-season :show="showSlide" :close="closeSlide" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showSlide: false
    }
  },
  computed: {
    ...mapState({
      season: (state) => state.navigation.season
    })
  },
  methods: {
    closeSlide() {
      this.showSlide = false
    }
  }
}
</script>

<style></style>
