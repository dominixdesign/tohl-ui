<template>
  <div class="overflow-y-auto">
    <table
      class="relative min-w-full divide-y divide-gray-200 text-right font-mono dark:divide-gray-600"
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
            class="cursor-pointer whitespace-nowrap px-1 py-3"
            @click="() => sortColumn(col)"
            :key="'headline-' + col"
            :class="col === 'name' ? 'text-left' : ''"
          >
            {{ col === 'name' && title ? title : $t(`column.${col}`) }}
            <span
              class="inline-block h-1 w-1 border-4 border-transparent"
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
          <td colspan="12" class="py-4 text-center font-medium text-secondary-500">
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
          <td class="p-1">
            <div
              class="float-right h-6 w-8 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
            />
          </td>
          <td class="p-1">
            <div class="h-6 w-40 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700" />
          </td>
          <td v-for="c in 19" :key="`playerlist-${n}-${c}`" class="px-2 py-1">
            <div
              class="float-right h-6 w-6 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
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
            :class="
              sortCol === col
                ? 'bg-gray-100 hover:bg-gray-100 dark:bg-secondary-900 dark:hover:bg-primary-700'
                : ''
            "
            :key="row.fname + row.lname + col"
          >
            <span v-if="col === 'name'">
              <player-linked-name :player="row" />
            </span>
            <span v-if="col === 'number'" class="italic">
              {{ row.seasondata.number }}
            </span>
            <player-status
              v-else-if="col === 'cd'"
              :cd="parseInt(row.seasondata.cd)"
              :ij="row.seasondata.ij"
            />
            <span v-else-if="col === 'salary'">
              ${{ row.seasondata.salary.toLocaleString() }}
            </span>
            <span v-else>{{ row.seasondata[col] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { get } from 'lodash-es'

export default {
  props: {
    season: String,
    selectedRoster: String,
    positions: Set,
    columns: Array,
    sorting: String,
    sortingDirection: String,
    team: String,
    title: String,
    filter: Object
  },
  data() {
    return {
      error: false,
      cols: this.columns || [
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
      sortCol: this.sorting || 'name',
      direction: this.sortingDirection || 'desc'
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

<style scoped>
.player-row:hover td {
  @apply bg-gray-100;
}
.dark .player-row:hover td {
  @apply bg-primary-700;
}
</style>
