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
        <th scope="col" class="px-2 xl:px-4 py-3">#</th>
        <th scope="col" class="px-2 xl:px-4 py-3"></th>
        <th scope="col" class="px-2 xl:px-4 py-3">PO</th>
        <th scope="col" class="px-2 xl:px-4 py-3">CD</th>
        <th scope="col" class="px-2 xl:px-4 py-3">IJ</th>
        <th scope="col" class="px-2 xl:px-4 py-3">IT</th>
        <th scope="col" class="px-2 xl:px-4 py-3">SP</th>
        <th scope="col" class="px-2 xl:px-4 py-3">ST</th>
        <th scope="col" class="px-2 xl:px-4 py-3">EN</th>
        <th scope="col" class="px-2 xl:px-4 py-3">DU</th>
        <th scope="col" class="px-2 xl:px-4 py-3">DI</th>
        <th scope="col" class="px-2 xl:px-4 py-3">SK</th>
        <th scope="col" class="px-2 xl:px-4 py-3">PA</th>
        <th scope="col" class="px-2 xl:px-4 py-3">PC</th>
        <th scope="col" class="px-2 xl:px-4 py-3">DF</th>
        <th scope="col" class="px-2 xl:px-4 py-3">SC</th>
        <th scope="col" class="px-2 xl:px-4 py-3">EX</th>
        <th scope="col" class="px-2 xl:px-4 py-3">LD</th>
        <th scope="col" class="px-2 xl:px-4 py-3">OV</th>
        <th scope="col" class="px-2 xl:px-4 py-3">Age</th>
        <th scope="col" class="px-2 xl:px-4 py-3">CT</th>
        <th scope="col" class="px-2 xl:px-4 py-3">Salary</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="error">
        <td colspan="12" class="text-secondary-500 text-center font-medium py-4">
          Spieler können nicht geladen werden.
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
        v-for="(row, index) in roster"
        class="text-sm text-right"
        :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
        :key="row.fname + row.lname"
      >
        <td class="py-1 pl-2 whitespace-nowrap text-gray-900 dark:text-gray-200">
          {{ row.seasondata.number }}
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
          {{ row.display_fname }} {{ row.display_lname }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.pos }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.cd }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.ij }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.it }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.sp }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.st }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.en }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.du }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.di }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.sk }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.pa }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.pc }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.df }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.sc }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.ex }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.ld }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.ov }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.age }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.ct }}
        </td>
        <td class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400">
          {{ row.seasondata.salary }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    season: String,
    team: String,
    title: String,
    filter: Object
  },
  data() {
    return {
      error: false
    }
  },
  apollo: {
    roster: {
      query: gql`
        query getRoster($team: String!, $season: ID!) {
          roster(teamsim: $team, season: $season) {
            fname
            lname
            display_fname
            display_lname
            seasondata(season: $season) {
              number
              pos
              cd
              ij
              it
              sp
              st
              en
              du
              di
              sk
              pa
              pc
              df
              sc
              ex
              ld
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
  }
}
</script>
