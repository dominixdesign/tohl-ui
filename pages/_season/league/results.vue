<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <games-result-card v-for="game in games" :key="game.game" :game="game" />
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
    games: {
      query: gql`
        query getLastGameday($season: String!) {
          lastGameday(season: $season) {
            home {
              teamsim
              teamid
            }
            away {
              teamsim
              teamid
            }
            goalshome
            goalsaway
            overtimes
            game
            gameday
            season
            stars: lineup(where: [["star", "!=", "null"]]) {
              team {
                teamid
              }
              star
              player {
                fname
                lname
              }
            }
            scorer: lineup(where: [["goals", ">", "0"]]) {
              team {
                teamid
              }
              goals
              player {
                fname
                lname
              }
            }
          }
        }
      `,
      variables() {
        return {
          season: this.season
        }
      },
      update: (lastGameday) => lastGameday.lastGameday,
      error() {
        this.error = true
      }
    }
  }
}
</script>
