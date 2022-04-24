<template>
  <div class="isolate mx-auto max-w-screen-2xl py-2 sm:p-6 xl:px-12">
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col sm:flex-row" v-if="currentSalaries">
        <div class="m-4 flex items-center sm:w-1/2">
          <div class="w-1/3 md:w-1/4 lg:w-1/5">
            <team-salary-cap
              :chartdata="{
                labels: ['Gehälter', 'Ausgaben', 'Cap Space'],
                datasets: [
                  {
                    backgroundColor: [
                      getColor('secondary', 500),
                      getColor('secondary', 700),
                      getColor('primary', 700)
                    ],
                    data: [currentSalaries, expenses, 10000000 - currentSalaries - expenses]
                  }
                ]
              }"
              :options="{
                responsive: true,
                legend: {
                  display: false
                }
              }"
            />
          </div>
          <div class="pl-4 md:text-lg">
            <span class="mr-1 inline-block h-4 w-4 border border-white bg-secondary-500"></span
            >Gehälter: ${{ currentSalaries.toLocaleString() }}<br />
            <span class="mr-1 inline-block h-4 w-4 border border-white bg-secondary-700"></span
            >Ausgaben: ${{ expenses.toLocaleString() }}<br />
            <span class="mr-1 inline-block h-4 w-4 border border-white bg-primary-700"></span
            >Cap-Space: ${{ (10000000 - expenses - currentSalaries).toLocaleString() }}
          </div>
        </div>
        <div class="m-4 flex items-center sm:w-1/2">
          <div class="w-1/3 md:w-1/4 lg:w-1/5">
            <team-salary-cap
              :chartdata="{
                labels: ['Defense', 'Goalies', 'Forwards'],
                datasets: [
                  {
                    backgroundColor: [
                      getColor('primary', 300),
                      getColor('primary', 500),
                      getColor('primary', 700)
                    ],
                    data: [salariesGoalies, salariesDefense, salariesForwards]
                  }
                ]
              }"
              :options="{
                responsive: true,
                legend: {
                  display: false
                }
              }"
            />
          </div>
          <div class="pl-4 md:text-lg">
            <span class="mr-1 inline-block h-4 w-4 border border-white bg-primary-300"></span
            >Goalies: ${{ salariesGoalies.toLocaleString() }}<br />
            <span class="mr-1 inline-block h-4 w-4 border border-white bg-primary-500"></span
            >Defense: ${{ salariesDefense.toLocaleString() }}<br />
            <span class="mr-1 inline-block h-4 w-4 border border-white bg-primary-700"></span
            >Forwards: ${{ salariesForwards.toLocaleString() }}
          </div>
        </div>
      </div>
      <div class="overflow-y-auto">
        <table
          class="
            relative
            min-w-full
            divide-y divide-gray-200
            text-right
            font-mono
            dark:divide-gray-600
          "
        >
          <thead
            class="
              sticky
              top-0
              z-9
              bg-primary-500
              text-right text-base
              uppercase
              tracking-wider
              text-primary-50
              dark:bg-primary-700 dark:text-primary-200
            "
          >
            <tr class="text-base">
              <th
                v-for="col in cols"
                scope="col"
                class="whitespace-nowrap px-1 py-3"
                :key="'headline-' + col"
                :class="col === 'name' ? 'text-left' : ''"
              >
                {{ col.includes('salary') ? seasons[col.substr(6, 1) || 0] : $t(`column.${col}`) }}
                <span
                  class="inline-block h-1 w-1 border-4 border-transparent"
                  :class="col === 'salary' ? 'border-t-primary-100' : ''"
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="error">
              <td colspan="12" class="py-4 text-center font-medium text-secondary-500">
                Spieler können nicht geladen werden.
              </td>
            </tr>
            <!-- eslint-disable vue/no-use-v-if-with-v-for -->
            <tr
              v-if="$apollo.loading"
              v-for="n in 6"
              :key="`roster-${n}`"
              :class="
                n % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'
              "
            >
              <!-- eslint-enable -->
              <td class="p-1">
                <div
                  class="
                    float-right
                    h-6
                    w-8
                    animate-pulse
                    rounded-sm
                    bg-gray-200
                    dark:bg-primary-700
                  "
                />
              </td>
              <td class="p-1">
                <div class="h-6 w-40 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700" />
              </td>
              <td v-for="c in 19" :key="`playerlist-${n}-${c}`" class="px-2 py-1">
                <div
                  class="
                    float-right
                    h-6
                    w-6
                    animate-pulse
                    rounded-sm
                    bg-gray-200
                    dark:bg-primary-700
                  "
                />
              </td>
            </tr>
            <tr
              v-for="(row, index) in filtertedRoster"
              :class="
                index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'
              "
              class="player-row"
              :key="row.fname + row.lname"
            >
              <td
                v-for="col in cols"
                class="whitespace-nowrap p-1 text-gray-600 dark:text-gray-400"
                :class="[
                  col === 'salary'
                    ? 'bg-gray-100 hover:bg-gray-100 dark:bg-secondary-900 dark:hover:bg-primary-700'
                    : '',
                  col === 'name' ? 'text-left' : ''
                ]"
                :key="row.fname + row.lname + col"
              >
                <span v-if="col === 'name'">
                  <player-linked-name :player="row" />
                </span>
                <span v-else-if="col === 'salary'">
                  ${{ row.seasondata.salary.toLocaleString() }}
                </span>
                <span
                  v-else-if="
                    col.substr(0, 6) === 'salary' &&
                    row.seasondata.contract > parseInt(col.substr(6, 1))
                  "
                >
                  ${{ row.seasondata.salary.toLocaleString() }}
                </span>
                <span
                  v-else-if="
                    col.substr(0, 6) === 'salary' &&
                    row.seasondata.contract === parseInt(col.substr(6, 1))
                  "
                >
                  <span
                    v-if="row.seasondata.age + parseInt(col.substr(6, 1)) > 30"
                    class="
                      inline-flex
                      items-center
                      rounded
                      bg-secondary-600
                      px-2
                      py-0.5
                      text-xs
                      font-medium
                      text-gray-200
                    "
                  >
                    UFA
                  </span>
                </span>
                <span v-else>{{ row.seasondata[col] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { theme } from '~/tailwind.config.js'
import gql from 'graphql-tag'
import { get } from 'lodash-es'

export default {
  async asyncData({ params: { season, team, roster } }) {
    return { season, team, roster: roster || 'all' }
  },
  data() {
    return {
      error: false,
      cols: ['name', 'pos', 'ov', 'age', 'contract', 'salary', 'salary1', 'salary2', 'salary3'],
      filtertedRoster: [],
      expenses: 700000,
      currentSalaries: 0,
      salariesGoalies: 0,
      salariesDefense: 0,
      salariesForwards: 0
    }
  },
  apollo: {
    roster: {
      query: gql`
        query getRoster($team: String!, $season: ID!) {
          roster(teamsim: $team, season: $season) {
            id
            fname
            lname
            display_fname
            display_lname
            seasondata(season: $season) {
              age
              salary
              contract
              pos
              ov
            }
          }
        }
      `,
      variables() {
        return {
          team: this.team,
          season: this.season
        }
      },
      update: ({ roster }) => roster,
      error() {
        this.error = true
      }
    }
  },
  computed: {
    seasons() {
      const seasonNumber = parseInt(this.season.substr(4, 2))
      return [
        `TOHL${seasonNumber}`,
        `TOHL${seasonNumber + 1}`,
        `TOHL${seasonNumber + 2}`,
        `TOHL${seasonNumber + 3}`,
        `TOHL${seasonNumber + 4}`
      ]
    }
  },
  watch: {
    roster(newRoster) {
      this.updateRoster()
    }
  },
  methods: {
    getColor(name, shade) {
      return theme.extend.colors[name][shade]
    },
    updateRoster() {
      let sorting = 'seasondata.salary'
      const filtertedRoster = [...this.roster]
      this.filtertedRoster = filtertedRoster.sort((a, b) => {
        if (get(a, sorting) > get(b, sorting)) return 1
        if (get(a, sorting) < get(b, sorting)) return -1
        return 0
      })
      this.salariesGoalies = this.filtertedRoster.reduce((pv, player) => {
        if (player.seasondata.pos === 'G') {
          return pv + player.seasondata.salary
        }
        return pv
      }, 0)
      this.salariesDefense = this.filtertedRoster.reduce((pv, player) => {
        if (player.seasondata.pos === 'D') {
          return pv + player.seasondata.salary
        }
        return pv
      }, 0)
      this.salariesForwards = this.filtertedRoster.reduce((pv, player) => {
        if (
          player.seasondata.pos === 'LW' ||
          player.seasondata.pos === 'RW' ||
          player.seasondata.pos === 'C'
        ) {
          return pv + player.seasondata.salary
        }
        return pv
      }, 0)
      this.currentSalaries = this.filtertedRoster.reduce(
        (pv, player) => pv + player.seasondata.salary,
        0
      )
      this.filtertedRoster.reverse()
    }
  }
}
</script>

<style scoped>
.player-row:hover td {
  @apply bg-gray-100;
}
.dark .player-row:hover td {
  @apply bg-primary-700;
}
</style>
