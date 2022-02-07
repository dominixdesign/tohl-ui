<template>
  <table class="relative w-full min-w-full divide-y divide-gray-200 dark:divide-gray-600">
    <thead
      class="
        sticky
        top-0
        z-9
        bg-primary-500
        text-right text-xs
        uppercase
        tracking-wider
        text-primary-50
        dark:bg-primary-700 dark:text-primary-200
      "
    >
      <tr class="font-serif text-sm font-extralight uppercase md:text-xl">
        <th colspan="2" scope="col" class="px-6 py-3 text-left">
          <h3 class="">
            {{ title }}
          </h3>
        </th>
        <th scope="col" class="px-0.5 py-3 md:px-2">GP</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">W</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">L</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">T</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">P</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">GF</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">GA</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">DF</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">Win%</th>
        <th scope="col" class="px-0.5 py-3 md:px-2">Strk</th>
      </tr>
    </thead>
    <tbody class="font-mono">
      <tr v-if="error">
        <td colspan="12" class="py-4 text-center font-medium text-secondary-500">
          Tabelle kann nicht geladen werden.
        </td>
      </tr>
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <tr
        v-if="$apollo.loading"
        v-for="n in 6"
        :key="`standing-${n}`"
        :class="n % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
      >
        <!-- eslint-enable -->
        <td class="px-2 py-1">
          <div
            class="float-right h-6 w-8 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
          />
        </td>
        <td class="px-2 py-1">
          <div class="h-6 w-40 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700" />
        </td>
        <td v-for="c in 10" :key="`standins-${n}-${c}`" class="px-2 py-1">
          <div
            class="float-right h-6 w-8 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
          />
        </td>
      </tr>
      <tr
        v-for="(row, index) in standings"
        class="text-right text-sm"
        :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
        :key="row.team.teamsim"
      >
        <td class="whitespace-nowrap py-2 pl-2 text-gray-900 dark:text-gray-200">
          {{ index + 1 }}.
        </td>
        <td
          class="
            hidden
            whitespace-nowrap
            px-3
            py-1
            text-left
            font-medium
            text-gray-900
            dark:text-gray-200
            sm:table-cell
          "
        >
          <team-small :team="row.team" />
        </td>
        <td
          class="
            table-cell
            whitespace-nowrap
            px-3
            py-1
            text-left
            font-medium
            uppercase
            text-gray-900
            dark:text-gray-200
            sm:hidden
          "
        >
          {{ row.team.teamid }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.games }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.wins }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.loss }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.ties }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.points }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.goalsfor }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.goalsagainst }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.diff }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{
            Number(row.winp).toLocaleString(undefined, {
              style: 'percent',
              minimumFractionDigits: 2
            })
          }}
        </td>
        <td class="whitespace-nowrap px-2 py-1 text-gray-600 dark:text-gray-400">
          {{ row.streak }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import QUERY_LEAGUE_STANDINGS from '~/queries/league/standings.query.gql'

export default {
  props: {
    season: String,
    title: String,
    filter: Object
  },
  data() {
    return {
      error: false
    }
  },
  apollo: {
    standings: {
      query: QUERY_LEAGUE_STANDINGS,
      variables() {
        return {
          filter: { season: this.season, ...this.filter },
          order: { column: 'points', order: 'DESC' }
        }
      },
      update: ({ teamstats }) => teamstats,
      error() {
        this.error = true
      }
    }
  }
}
</script>
