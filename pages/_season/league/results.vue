<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="game in games"
        :key="game.game"
        class="col-span-1 flex flex-col text-center bg-white dark:bg-gray-600 rounded-lg shadow"
      >
        <div class="flex-1 flex flex-col p-6 pb-1">
          <div class="flex justify-center items-center flex-row">
            <team-logo-middle :teamid="game.home.teamid" />
            <div class="font-bold text-4xl p-2 text-primary-700 dark:text-white">
              {{ game.goalshome }}:{{ game.goalsaway }}
              <div v-if="game.overtimes > 0" class="text-sm">
                OT{{ game.overtimes > 1 ? game.overtimes : '' }}
              </div>
            </div>
            <team-logo-middle :teamid="game.away.teamid" />
          </div>
        </div>
        <div>
          <div class="flex">
            <div class="w-0 flex-1 flex">
              <nuxt-link
                :to="`/${game.season}/game/${game.game}`"
                class="
                  relative
                  -mr-px
                  w-0
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  py-4
                  text-sm text-gray-700
                  dark:text-white
                  font-medium
                  rounded-bl-lg
                  hover:text-primary-500
                  dark:hover:text-primary-200
                "
              >
                <svg
                  class="w-5 h-5 text-primary-500 dark:text-primary-200 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Spielbericht</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </li>
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
