<template>
  <div>
    <div class="linesTitle">{{ label() }}</div>
    <lines-player-group v-for="(group, key) in line" :key="key" :group="group" :block="block" />
  </div>
</template>

<script>
import PlayerGroup from './PlayerGroup'

export default {
  name: 'PlayerLine',
  components: {
    PlayerGroup
  },
  props: {
    line: Array,
    block: String
  },
  methods: {
    label() {
      return 'label'
      // return this.$store.getters['labels/get'](this.$store.getters['lines/getSelected']+'-'+this.block)
    }
  }
}
</script>

<style scoped></style>
