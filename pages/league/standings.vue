<template>
  <div class="flex flex-col">
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead class="bg-gray-50 dark:bg-gray-700 text-right">
                <tr>
                  <th />
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    GP
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    W
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    L
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    T
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    P
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    GF
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    GA
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    DF
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Win%
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Streak
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Odd row -->
                <tr
                  v-for="(row, index) in standings"
                  class="text-sm text-right"
                  :class="
                    index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                  "
                  :key="row.team.teamsim"
                >
                  <td class="py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
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
                    {{ row.team.teamsim }}
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
  }
}
</script>
