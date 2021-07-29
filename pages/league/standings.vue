<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <div class="flex flex-col space-y-6">
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            class="
              block
              w-full
              pl-3
              pr-10
              py-2
              text-base
              border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              sm:text-sm
              rounded-md
            "
          >
            <option>My Account</option>

            <option>Company</option>

            <option selected>Team Members</option>

            <option>Billing</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
              <a
                href="#"
                class="
                  border-transparent
                  text-gray-500
                  hover:text-gray-700 hover:border-gray-300
                  whitespace-nowrap
                  py-4
                  px-1
                  border-b-2
                  font-medium
                  text-sm
                "
              >
                My Account
              </a>

              <a
                href="#"
                class="
                  border-transparent
                  text-gray-500
                  hover:text-gray-700 hover:border-gray-300
                  whitespace-nowrap
                  py-4
                  px-1
                  border-b-2
                  font-medium
                  text-sm
                "
              >
                Company
              </a>

              <a
                href="#"
                class="
                  border-indigo-500
                  text-indigo-600
                  whitespace-nowrap
                  py-4
                  px-1
                  border-b-2
                  font-medium
                  text-sm
                "
                aria-current="page"
              >
                Team Members
              </a>

              <a
                href="#"
                class="
                  border-transparent
                  text-gray-500
                  hover:text-gray-700 hover:border-gray-300
                  whitespace-nowrap
                  py-4
                  px-1
                  border-b-2
                  font-medium
                  text-sm
                "
              >
                Billing
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow" v-if="$apollo.loading">Loading...</div>
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow" v-else>
        <table class="relative min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead
            class="
              sticky
              z-50
              top-0
              bg-primary-500
              dark:bg-primary-700
              text-primary-50 text-right text-xs
              dark:text-primary-200
              uppercase
              tracking-wider
            "
          >
            <tr>
              <th colspan="2" scope="col" class="px-6 py-3 text-left">
                <h3 class="font-serif font-headline font-extralight uppercase text-xl">Liga</h3>
              </th>
              <th scope="col" class="px-6 py-3">GP</th>
              <th scope="col" class="px-6 py-3">W</th>
              <th scope="col" class="px-6 py-3">L</th>
              <th scope="col" class="px-6 py-3">T</th>
              <th scope="col" class="px-6 py-3">P</th>
              <th scope="col" class="px-6 py-3">GF</th>
              <th scope="col" class="px-6 py-3">GA</th>
              <th scope="col" class="px-6 py-3">DF</th>
              <th scope="col" class="px-6 py-3">Win%</th>
              <th scope="col" class="px-6 py-3">Streak</th>
            </tr>
          </thead>
          <tbody>
            <!-- Odd row -->
            <tr
              v-for="(row, index) in standings"
              class="text-sm text-right"
              :class="
                index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'
              "
              :key="row.team.teamsim"
            >
              <td class="py-4 pl-2 whitespace-nowrap text-gray-900 dark:text-gray-200">
                {{ index + 1 }}.
              </td>
              <td
                class="
                  px-6
                  py-4
                  whitespace-nowrap
                  text-left
                  font-medium
                  text-gray-900
                  dark:text-gray-200
                "
              >
                <div class="flex items-center">
                  <team-logo-small :teamid="row.team.teamid" /><span>{{ row.team.teamsim }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.games }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.wins }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.loss }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.ties }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.points }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.goalsfor }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.goalsagainst }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.diff }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{
                  Number(row.winp).toLocaleString(undefined, {
                    style: 'percent',
                    minimumFractionDigits: 2
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {{ row.streak }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow p-6" v-if="!$apollo.loading">
        <h3 class="font-serif font-headline font-extralight uppercase pb-4 text-xl">Legende</h3>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="(dd, dt) in legend" :key="dt">
            <span class="font-medium">{{ dt }}</span> <span>&ndash; {{ dd }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QUERY_LEAGUE_STANDINGS from '~/queries/league/standings.query.gql'

export default {
  apollo: {
    standings: {
      query: QUERY_LEAGUE_STANDINGS,
      variables() {
        return {
          filter: { season: 'TOHL11' },
          order: { column: 'points', order: 'DESC' }
        }
      },
      update: ({ teamstats }) => teamstats
    }
  },
  data() {
    return {
      legend: {
        GP: 'Games Played / Spiele',
        W: 'Wins / Siege',
        L: 'Losses / Niederlagen',
        T: 'Ties / Unentschieden',
        P: 'Points / Punkte',
        GF: 'Goals For / erzielte Tore',
        GA: 'Goals Against / bekommenen Tore',
        DIFF: 'Goal Differential / Tordifferenz',
        'WIN%': 'Win Percentage / Siegquote',
        STREAK: 'Streak / aktuelle Serie'
      }
    }
  }
}
</script>
