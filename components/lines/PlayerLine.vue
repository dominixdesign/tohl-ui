<template>
  <div>
    <div
      class="
        bg-primary-500
        p-3
        text-lg
        font-thin
        uppercase
        text-primary-50
        dark:bg-primary-700 dark:text-primary-200
      "
    >
      {{ $t(`lines.${$store.getters['lines/getSelected']}-${block}`) }}
    </div>
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
  }
}
</script>

<style scoped></style>
