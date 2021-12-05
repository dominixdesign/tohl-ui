<template>
  <div class="py-2 sm:p-6 xl:px-12 mx-auto max-w-screen-2xl" v-if="games && games.games">
    <div v-if="isPlayoff">
      <div class="my-3 text-xl font-bold" v-if="currentRound === 1">Conference Viertelfinale</div>
      <div class="my-3 text-xl font-bold" v-else-if="currentRound === 2">Conference Halbfinale</div>
      <div class="my-3 text-xl font-bold" v-else-if="currentRound === 3">Conference Finale</div>
      <div class="my-3 text-xl font-bold" v-else-if="currentRound === 4">TOHL Finale</div>
      <layout-elements-pagination
        :max="parseInt(maxGameday.toString()[0])"
        :current="currentRound"
        :basePath="`/${season}/league/schedule/`"
        nextTitle="Nächste Runde"
        previousTitle="Vorgerige Runde"
        :entryTitles="{
          1: 'Conference Viertelfinale',
          2: 'Conference Halbfinale',
          3: 'Conference Finale',
          4: 'TOHL Finale'
        }"
      />
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <league-gameday
        v-if="gamedayGames[currentRound * 100 + 1]"
        v-for="index in 7"
        :gameday="currentRound * 100 + index"
        :title="`Spiel #${index}`"
        :games="gamedayGames[currentRound * 100 + index]"
        :key="currentRound * 100 + index"
      />
      <!-- eslint-enable vue/no-use-v-if-with-v-for -->
    </div>
    <div v-else>
      <league-gameday :gameday="currentGameday" :games="gamedayGames[currentGameday]" />
      <layout-elements-pagination
        :max="maxGameday"
        :current="currentGameday"
        :basePath="`/${season}/league/schedule/`"
        nextTitle="Nächster Spieltag"
        previousTitle="Vorgeriger Spieltag"
      />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { groupBy, parseInt } from 'lodash-es'

export default {
  async asyncData({ params, i18n }) {
    const season = params.season
    const gameday = params.gameday
    const isPlayoff = !!season.includes('PLF')
    console.log({ season, gameday, isPlayoff })
    return { season, gameday, isPlayoff }
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
    maxGameday() {
      return Math.max.apply(
        Math,
        this.games.games.map((g) => g.gameday)
      )
    },
    currentGameday() {
      if (this.gameday) {
        return parseInt(this.gameday)
      }
      const filteredGames = this.games.games.filter((g) => g.goalshome !== null)
      if (filteredGames.length === 0) {
        return this.games.games[0].gameday
      }
      return Math.max.apply(
        Math,
        filteredGames.map((g) => g.gameday)
      )
    },
    currentRound() {
      if (this.isPlayoff) {
        return parseInt(this.currentGameday.toString()[0])
      }
      return false
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
