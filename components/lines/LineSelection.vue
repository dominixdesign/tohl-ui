<template>
  <ul class="mb-2 flex gap-0.5 bg-primary-500 pb-0.5">
    <li
      v-for="line in lines"
      :key="'line-' + line"
      class="basis-1/5 p-2 text-center"
      :class="selected === line ? 'bg-primary-200' : 'bg-gray-300 dark:bg-gray-700'"
      @click="() => select(line)"
    >
      {{ line }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LineSelection',
  computed: {
    ...mapGetters({
      lines: 'lines/getFirstLevel',
      selected: 'lines/getSelected'
    })
  },
  methods: {
    select(line) {
      this.$store.commit('lines/select', line)
    }
  }
}
</script>
