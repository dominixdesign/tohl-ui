<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl" v-if="games && games.games">
    <div
      v-for="game in games.games"
      :key="game.game"
      class="flex items-center bg-gray-100 dark:bg-primary-900 mb-2 hover:shadow-schedule"
    >
      <div class="flex-grow w-24">
        <div class="flex items-center justify-end">
          <div>{{ game.home.teamsim }}</div>
          <team-logo-small class="mx-3" :teamid="game.home.teamid" />
        </div>
      </div>
      <div>
        <div class="flex">
          <div
            class="flex flex-col items-center justify-center w-11 h-14"
            :class="
              game.winner && game.winner.teamid === game.home.teamid
                ? 'dark:bg-gray-600 bg-gray-300 text-primary-500 dark:text-primary-200'
                : 'dark:bg-gray-500 bg-gray-200 dark:text-white text-black'
            "
          >
            <div class="uppercase text-xs">{{ game.home.teamid }}</div>
            <div class="text-2xl font-bold">{{ game.goalshome }}</div>
          </div>
          <div
            class="flex flex-col items-center justify-center w-11 h-14"
            :class="
              game.winner && game.winner.teamid === game.away.teamid
                ? 'dark:bg-gray-600 bg-gray-300 text-primary-500 dark:text-primary-200'
                : 'dark:bg-gray-500 bg-gray-200 dark:text-white text-black'
            "
          >
            <div class="uppercase text-xs">{{ game.away.teamid }}</div>
            <div class="text-2xl font-bold">{{ game.goalsaway }}</div>
          </div>
        </div>
      </div>
      <div class="flex-grow w-24">
        <div class="flex items-center justify-start">
          <team-logo-small class="mx-3" :teamid="game.away.teamid" />
          <div>{{ game.away.teamsim }}</div>
        </div>
      </div>
    </div>
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
