<template>
  <div class="lines">
    <PlayerLine v-for="(line, key) in lines" :key="key" :line="line" :block="key" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerLine from './PlayerLine'

export default {
  name: 'Lines',
  components: {
    PlayerLine
  },
  computed: {
    ...mapGetters({
      lines: 'lines/getSelectedStructure'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
