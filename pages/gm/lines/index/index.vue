<template>
  <div id="roster">
    <lines-roster-position-select />
    <div class="warning" v-if="limitsTop">Zu viele Spielern auf dieser Position</div>
    <div class="warning" v-if="limitsLess">Zu wenig Spielern auf dieser Position</div>
    <div class="warning" v-if="toMuchPlayers">
      Zu viele Spieler im Kader: {{ overallPlayers }} von {{ overallLimit }}
    </div>
    <div class="warning" v-if="toLessPlayers">
      Zu wenig Spieler im Kader: {{ overallPlayers }} von {{ overallLimit }}
    </div>
    <lines-roster-player-list v-for="t in ['pro', 'scratch', 'farm']" :key="t" :team="t" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import gql from 'graphql-tag'

export default {
  computed: {
    ...mapGetters({
      selected: 'roster/getSelected'
    }),
    ...mapState({
      toMuchPlayers: (state) => state.roster.pro.length > state.roster.limits.all[0],
      toLessPlayers: (state) => state.roster.pro.length < state.roster.limits.all[0],
      overallPlayers: (state) => state.roster.pro.length,
      overallLimit: (state) => state.roster.limits.all[0]
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
