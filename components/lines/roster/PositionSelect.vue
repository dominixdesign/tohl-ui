<template>
  <ul class="mb-2 flex gap-0.5 bg-primary-500 pb-0.5">
    <li
      v-for="pos in positions"
      :key="'pos-' + pos"
      class="basis-1/5 p-2 text-center"
      :class="[
        selected === pos ? 'bg-primary-200' : 'bg-gray-300',
        hasError(pos)
          ? 'font-bold text-secondary-500 underline decoration-2 underline-offset-1'
          : ''
      ]"
      @click="() => select(pos)"
    >
      {{ pos }}
      <span class="text-xs"
        >({{ $store.getters['roster/getByTeamAndPos']('pro', pos).length }})</span
      >
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PositionSelection',
  data() {
    return {
      positions: ['G', 'D', 'LW', 'RW', 'C']
    }
  },
  computed: {
    ...mapGetters({
      selected: 'roster/getSelected'
    })
  },
  methods: {
    select(line) {
      this.$store.commit('roster/selectPos', line)
    },
    hasError(pos) {
      return (
        !this.$store.getters['roster/isInLimits'](pos) ||
        this.$store.getters['roster/getDressedByPos'](pos).some((p) => p.status > 2)
      )
    }
  }
}
</script>
