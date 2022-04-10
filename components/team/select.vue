<template>
  <div class="">
    <div class="hidden divide-x md:flex">
      <nuxt-link
        v-for="team in teams"
        :key="team.teamid"
        :to="getLink(team.teamid)"
        class="flex-auto pb-2 pt-3 text-center text-sm uppercase"
        :class="currentTeam === team.teamid ? '' : 'bg-gray-100 dark:bg-gray-800'"
        :style="currentTeam === team.teamid ? `color: ${foregroundColor};` : ''"
      >
        {{ team.teamid }}
      </nuxt-link>
    </div>
    <div class="block bg-gray-100 dark:bg-gray-800 md:hidden">
      <label for="tabs" class="sr-only">Team auswählen</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="teamSelect"
        name="teamSelect"
        v-model="teamSelect"
        class="
          block
          w-full
          border-gray-300
          bg-gray-100
          focus:border-primary-500 focus:ring-primary-500
          dark:bg-gray-800
        "
      >
        <option v-for="team in teams" :key="team.teamid" :value="team.teamid">
          {{ team.teamsim }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    currentTeam: String
  },
  data() {
    return {
      dropdown: false,
      teamSelect: this.currentTeam
    }
  },
  watch: {
    teamSelect(newTeam) {
      this.$router.push(this.getLink(newTeam))
    }
  },
  apollo: {
    teams: {
      query: gql`
        query getTeams($season: String!) {
          teams(filter: { season: $season }) {
            teamid
            teamsim
            season
            conference
            division
          }
        }
      `,
      variables() {
        return {
          season: this.$store.getters['navigation/season']
        }
      },
      update: ({ teams }) => teams,
      error() {
        this.error = true
      }
    }
  },
  computed: {
    backgroundColor() {
      return this.$store.getters['teams/backgroundByTeam'](this.currentTeam)
    },
    foregroundColor() {
      return this.$store.getters['teams/foregroundByTeam'](this.currentTeam)
    }
  },
  methods: {
    hide() {
      this.dropdown = false
    },
    getLink(team) {
      const re = new RegExp(`\/${this.currentTeam}(\/)*`, 'gi')
      return this.$route.fullPath.replace(re, `/${team}/`)
    }
  }
}
</script>
