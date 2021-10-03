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
        <th
          v-for="col in cols"
          scope="col"
          class="px-2 xl:px-4 py-3 cursor-pointer"
          @click="() => sortColumn(col)"
          :key="'headline-' + col"
          :class="col === 'name' ? 'text-left' : ''"
        >
          {{ $t(`column.${col}`) }}
        </th>
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
        v-for="(row, index) in filtertedRoster"
        class="text-sm text-right"
        :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
        :key="row.fname + row.lname"
      >
        <td
          v-for="col in cols"
          class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400"
          :key="row.fname + row.lname + col"
        >
          <span v-if="col === 'name'">
            {{ row.display_fname }} <span class="font-medium">{{ row.display_lname }}</span>
          </span>
          <span v-else-if="col === 'salary'"> ${{ row.seasondata.salary.toLocaleString() }} </span>
          <span v-else>{{ row.seasondata[col] }}</span>
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
    selectedRoster: String,
    positions: Set,
    team: String,
    title: String,
    filter: Object
  },
  data() {
    return {
      error: false,
      cols: [
        'number',
        'name',
        'pos',
        'cd',
        'ij',
        'it',
        'sp',
        'st',
        'en',
        'du',
        'di',
        'sk',
        'pa',
        'pc',
        'df',
        'sc',
        'ex',
        'ld',
        'ov',
        'age',
        'contract',
        'salary'
      ],
      filtertedRoster: [],
      sortCol: 'name',
      direction: 'desc'
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
              roster
              number
              age
              salary
              contract
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
  },
  watch: {
    positions(positions) {
      this.updateRoster()
    },
    roster(newRoster) {
      this.updateRoster()
    }
  },
  methods: {
    sortColumn(col) {
      console.log(col)
      this.sortCol = col
      this.direction = 'desc'
      this.updateRoster()
    },
    updateRoster() {
      let sorting = this.sortCol
      if (sorting === 'name' || !sorting) {
        sorting = 'lname'
      }
      console.log({ sorting })
      const filtertedRoster = [...this.roster]
        .filter((p) => {
          if (this.selectedRoster) {
            return p.seasondata.roster === this.selectedRoster
          }
          return true
        })
        .filter((p) => {
          if (this.positions) {
            return this.positions.has(p.seasondata.pos)
          }
          return true
        })
      // TODO lodash pick um seasondata daten zu bekommen pick(a, 'lname') || pick(a, 'seasondata.sp')
      this.filtertedRoster = filtertedRoster.sort((a, b) => {
        if (a[sorting] > b[sorting]) return 1
        if (a[sorting] < b[sorting]) return -1
        return 0
      })
    }
  }
}
</script>
