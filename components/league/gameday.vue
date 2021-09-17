<template>
  <table class="relative min-w-full divide-y divide-gray-200 dark:divide-gray-600">
    <thead
      class="
        sticky
        z-9
        top-0
        bg-primary-500
        dark:bg-primary-700
        text-primary-50 text-right text-xs
        dark:text-primary-200
        uppercase
        tracking-wider
      "
    >
      <tr class="text-base">
        <th colspan="2" scope="col" class="px-6 py-3 text-left">
          <h3 class="font-serif font-headline font-extralight uppercase text-xl">
            {{ title }}
          </h3>
        </th>
        <th scope="col" class="px-2 xl:px-4 py-3">GP</th>
        <th scope="col" class="px-2 xl:px-4 py-3">W</th>
        <th scope="col" class="px-2 xl:px-4 py-3">L</th>
        <th scope="col" class="px-2 xl:px-4 py-3">T</th>
        <th scope="col" class="px-2 xl:px-4 py-3">P</th>
        <th scope="col" class="px-2 xl:px-4 py-3">GF</th>
        <th scope="col" class="px-2 xl:px-4 py-3">GA</th>
        <th scope="col" class="px-2 xl:px-4 py-3">DF</th>
        <th scope="col" class="px-2 xl:px-4 py-3">Win%</th>
        <th scope="col" class="px-2 xl:px-4 py-3">Streak</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="error">
        <td colspan="12" class="text-secondary-500 text-center font-medium py-4">
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
        <td class="px-2 xl:px-4 py-1">
          <div
            class="bg-gray-200 dark:bg-primary-700 w-8 h-6 animate-pulse float-right rounded-sm"
          />
        </td>
        <td class="px-2 xl:px-4 py-1">
          <div class="bg-gray-200 dark:bg-primary-700 w-40 h-6 animate-pulse rounded-sm" />
        </td>
        <td v-for="c in 10" :key="`standins-${n}-${c}`" class="px-2 xl:px-4 py-1">
          <div
            class="bg-gray-200 dark:bg-primary-700 w-8 h-6 animate-pulse float-right rounded-sm"
          />
        </td>
      </tr>
      <tr
        v-for="(row, index) in standings"
        class="text-sm text-right"
        :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
        :key="row.team.teamsim"
      >
        <td class="py-4 pl-2 whitespace-nowrap text-gray-900 dark:text-gray-200">
          {{ index + 1 }}.
        </td>
        <td
          class="
            px-3
            md:px-6
            py-1
            whitespace-nowrap
            text-left
            font-medium
            text-gray-900
            dark:text-gray-200
          "
        >
          <team-small :team="row.team" />
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.games }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.wins }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.loss }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.ties }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.points }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.goalsfor }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.goalsagainst }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.diff }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{
            Number(row.winp).toLocaleString(undefined, {
              style: 'percent',
              minimumFractionDigits: 2
            })
          }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
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
