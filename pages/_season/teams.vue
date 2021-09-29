<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <li v-for="team in teams" :key="team.teamid">{{ team.teamsim }}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params, i18n }) {
    const season = params.season
    return { season }
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
          season: this.season
        }
      },
      update: ({ teams }) => teams,
      error() {
        this.error = true
      }
    }
  }
}
</script>
