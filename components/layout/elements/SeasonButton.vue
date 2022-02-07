<template>
  <div>
    <button
      @click="showSlide = true"
      class="
        flex
        items-center
        px-3
        py-1
        text-sm
        font-thin
        drop-shadow-sm
        hover:border-secondary-700 hover:bg-secondary-600 hover:drop-shadow-md
        md:rounded-full md:border md:border-secondary-600 md:bg-secondary-500 md:text-white
      "
    >
      <span class="hidden sm:block">Saison: </span>
      <span class="mx-1 font-medium">{{ season }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </button>
    <layout-slide-season :show="showSlide" :close="closeSlide" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showSlide: false
    }
  },
  computed: {
    ...mapGetters({
      season: 'navigation/season'
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
