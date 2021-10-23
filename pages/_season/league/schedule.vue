<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl" v-if="games && games.games">
    <league-gameday
      :key="gameday"
      :gameday="currentGameday"
      :games="gamedayGames[currentGameday]"
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
    },
    currentGameday() {
      const filteredGames = this.games.games.filter((g) => g.goalshome !== null)
      console.log(filteredGames)
      return Math.max.apply(
        Math,
        filteredGames.map((g) => g.gameday)
      )
    }
  },
  apollo: {
    games: {
      query: gql`
        query getGamedays($season: String!) {
          games(season: $season) {
            id: game
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
