<template>
  <div id="roster">
    <PositionSelect />
    <div class="warning" v-if="limitsTop">Zu viele Spielern auf dieser Position</div>
    <div class="warning" v-if="limitsLess">Zu wenig Spielern auf dieser Position</div>
    <PlayerList v-for="t in ['pro', 'scratch', 'farm']" :key="t" :team="t" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PositionSelect from './PositionSelect'
import PlayerList from './PlayerList'

export default {
  middleware: ['isAuth'],
  name: 'RosterIndex',
  components: {
    PositionSelect,
    PlayerList
  },
  computed: {
    ...mapGetters({
      selected: 'roster/getSelected'
    }),
    limitsTop() {
      return !this.$store.getters['roster/isInLimitsTop'](this.selected)
    },
    limitsLess() {
      return !this.$store.getters['roster/isInLimitsLess'](this.selected)
    }
  }
}
</script>

<style scoped>
.warning {
  border: 1px solid rgb(245, 158, 11);
  background: rgb(253, 230, 138);
  padding: 4px 8px;
}
</style>
