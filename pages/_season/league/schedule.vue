<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl" v-if="games && games.games">
    <league-gameday
      v-for="gameday in gamedays"
      :key="gameday"
      :gameday="gameday"
      :games="gamedayGames[gameday]"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { groupBy, parseInt } from 'lodash-es'

export default {
  async asyncData({ params, i18n }) {
    const season = params.season
    return { season }
  },
  computed: {
    gamedayGames() {
      return groupBy(this.games.games, (g) => g.gameday)
    },
    gamedays() {
      return Object.keys(this.gamedayGames)
        .map(parseInt)
        .sort((a, b) => a - b)
    }
  },
  apollo: {
    games: {
      query: gql`
        query getLastGameday($season: String!) {
          games(season: $season) {
            home {
              teamsim
              teamid
            }
            away {
              teamsim
              teamid
            }
            winner {
              teamid
            }
            goalshome
            goalsaway
            overtimes
            game
            gameday
            season
          }
        }
      `,
      variables() {
        return {
          season: this.season
        }
      },
      update: (games) => games,
      error() {
        this.error = true
      }
    }
  }
}
</script>
