<template>
  <table class="font-headline relative min-w-full divide-y divide-gray-200 dark:divide-gray-600">
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
          class="px-1 xl:px-2 py-3 cursor-pointer whitespace-nowrap"
          @click="() => sortColumn(col)"
          :key="'headline-' + col"
          :class="col === 'name' ? 'text-left' : ''"
        >
          {{ $t(`column.${col}`) }}
          <span
            class="w-1 h-1 inline-block border-4 border-transparent"
            :class="
              sortCol === col && direction === 'asc'
                ? 'border-t-primary-100'
                : sortCol === col && direction === 'desc'
                ? 'border-b-primary-100'
                : ''
            "
          ></span>
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
        :key="`roster-${n}`"
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
        :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
        class="text-sm text-right dark:hover:bg-primary-700 hover:bg-gray-100"
        :key="row.fname + row.lname"
      >
        <td
          v-for="col in cols"
          class="px-2 xl:px-4 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400"
          :class="
            sortCol === col
              ? 'bg-gray-100 dark:bg-secondary-900 dark:hover:bg-primary-700 hover:bg-gray-100'
              : ''
          "
          :key="row.fname + row.lname + col"
        >
          <span v-if="col === 'name'">
            {{ row.display_fname }} <span class="font-bold">{{ row.display_lname }}</span>
          </span>
          <span v-if="col === 'number'" class="italic">
            {{ row.seasondata.number }}
          </span>
          <player-status
            v-else-if="col === 'cd'"
            :cd="parseInt(row.seasondata.cd)"
            :ij="row.seasondata.ij"
          />
          <span v-else-if="col === 'salary'"> ${{ row.seasondata.salary.toLocaleString() }} </span>
          <span v-else>{{ row.seasondata[col] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import gql from 'graphql-tag'
import { get } from 'lodash-es'

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
      if (this.sortCol === col) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.direction = 'asc'
      }
      this.sortCol = col
      this.updateRoster()
    },
    updateRoster() {
      let sorting = this.sortCol
      if (sorting === 'name') {
        sorting = 'lname'
      } else {
        sorting = 'seasondata.' + sorting
      }
      console.log({ sorting })
      const filtertedRoster = [...this.roster]
        .filter((p) => {
          if (this.selectedRoster && this.selectedRoster !== 'all') {
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
      this.filtertedRoster = filtertedRoster.sort((a, b) => {
        if (get(a, sorting) > get(b, sorting)) return 1
        if (get(a, sorting) < get(b, sorting)) return -1
        return 0
      })
      if (this.direction === 'asc') {
        this.filtertedRoster.reverse()
      }
    }
  }
}
</script>
