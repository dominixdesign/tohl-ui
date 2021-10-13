<template>
  <span v-if="!!teamData">{{ teamData.full_name || teamData.teamsim }}</span>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    teamid: String
  },
  computed: {
    teamData() {
      return this.$store.getters['teams/name'](
        this.teamid,
        this.$store.getters['navigation/season']
      )
    }
  },
  apollo: {
    team: {
      query: gql`
        query getTeam($teamid: ID!, $season: ID!) {
          team(teamid: $teamid, season: $season) {
            teamid
            teamsim
            season
            conference
            division
            full_name
          }
        }
      `,
      variables() {
        return {
          teamid: this.teamid,
          season: this.$store.getters['navigation/season']
        }
      },
      update({ team }) {
        this.$store.commit('teams/teamName', {
          teamObj: team,
          season: this.$store.getters['navigation/season']
        })
        return team
      },
      skip() {
        return !!this.teamData
      },
      error() {
        this.error = true
      }
    }
  }
}
</script>
