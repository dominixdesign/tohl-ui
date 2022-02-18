<template>
  <div class="pb-20" v-if="$store.getters['roster/currentTeam']">
    <nav class="flex w-full gap-0.5 bg-primary-500 pb-0.5">
      <nuxt-link
        to="/gm/lines/"
        class="basis-1/2 p-2 text-center"
        :class="[
          activePage === '/gm/lines/'
            ? 'bg-primary-400 dark:bg-primary-600'
            : 'bg-gray-200 dark:bg-primary-900',
          rosterError || toMuchPlayers || toLessPlayers
            ? 'font-bold text-secondary-500 underline decoration-2 underline-offset-1'
            : ''
        ]"
      >
        Kader
        <span class="text-sm" v-if="toMuchPlayers || toLessPlayers"
          >({{ overallPlayers }} / {{ overallLimit }})</span
        >
      </nuxt-link>
      <nuxt-link
        to="/gm/lines/lines"
        class="basis-1/2 p-2 text-center"
        :class="
          activePage === '/gm/lines/lines'
            ? 'bg-primary-400 dark:bg-primary-600'
            : 'bg-gray-200 dark:bg-primary-900'
        "
      >
        Aufstellung
      </nuxt-link>
    </nav>
    <nuxt-child />
    <layout-elements-fab />
  </div>
  <div v-else class="font-lg flex flex-col items-center p-10 text-center text-gray-700">
    <div class="mb-10">Das Team wird in die Kabine gerufen...</div>
    <layout-loading />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import gql from 'graphql-tag'

export default {
  middleware: ['isAuth'],
  beforeCreate() {
    this.$store.dispatch('roster/load', { team: this.$store.getters['user/team'] })
  },
  computed: {
    ...mapState({
      toMuchPlayers: (state) => state.roster.pro.length > state.roster.limits.all[0],
      toLessPlayers: (state) => state.roster.pro.length < state.roster.limits.all[0],
      overallPlayers: (state) => state.roster.pro.length,
      overallLimit: (state) => state.roster.limits.all[0]
    }),
    activePage() {
      return this.$route.path
    },
    rosterError() {
      return !['G', 'D', 'LW', 'RW', 'C'].every(
        (pos) =>
          this.$store.getters['roster/isInLimits'](pos) &&
          !this.$store.getters['roster/getDressedByPos'](pos).some((p) => p.status > 2)
      )
    }
  }
}
</script>
