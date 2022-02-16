<template>
  <div class="lines">
    <lines-line-selection />
    <lines-player-line v-for="(line, key) in lines" :key="key" :line="line" :block="key" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

export default {
  beforeCreate() {
    this.$store.dispatch('roster/load', { team: this.$store.getters['user/team'] })
  },
  computed: {
    ...mapGetters({
      lines: 'lines/getSelectedStructure'
    })
  }
}
</script>
