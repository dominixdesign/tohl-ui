<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <h3 class="text-3xl font-bold my-5">Teamstats</h3>
    <table
      class="font-mono text-right relative min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    >
      <thead
        class="
          sticky
          z-9
          top-0
          bg-primary-500
          dark:bg-primary-700
          text-primary-50 text-right text-base
          dark:text-primary-200
          uppercase
          tracking-wider
        "
      >
        <tr class="text-base">
          <th
            v-for="col in cols"
            scope="col"
            class="px-1 py-3 cursor-pointer whitespace-nowrap"
            @click="() => sortColumn(col)"
            :key="'headline-' + col"
            :class="col === 'teamname' ? 'text-left' : ''"
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
          <td colspan="9" class="text-secondary-500 text-center font-medium py-4">
            Teams können nicht geladen werden.
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
              class="bg-gray-200 dark:bg-primary-700 w-8 h-6 animate-pulse float-right rounded-sm"
            />
          </td>
          <td v-for="c in 8" :key="`playerlist-${n}-${c}`" class="px-2 py-1">
            <div
              class="bg-gray-200 dark:bg-primary-700 w-6 h-6 animate-pulse float-right rounded-sm"
            />
          </td>
        </tr>
        <tr
          v-for="(row, index) in sortedTeamstats"
          :class="
            index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'
          "
          class="text-base dark:hover:bg-primary-700 hover:bg-gray-100"
          :key="row.team.teamid"
        >
          <td
            v-for="col in cols"
            class="p-1 whitespace-nowrap text-gray-600 dark:text-gray-400"
            :class="[
              sortCol === col
                ? 'bg-gray-100 dark:bg-secondary-900 dark:hover:bg-primary-700 hover:bg-gray-100'
                : '',
              col === 'teamname' ? 'text-left' : '',
              ['gag', 'sag'].indexOf(col) < 0 &&
              Math.max(...sortedTeamstats.map((t) => t[col])) === row[col]
                ? 'font-bold'
                : '',
              ['gag', 'sag'].indexOf(col) >= 0 &&
              Math.min(...sortedTeamstats.map((t) => t[col])) === row[col]
                ? 'font-bold'
                : ''
            ]"
            :style="
              logTeam === row.team.teamid
                ? `background-color: ${row.team.background}; color: ${row.team.foreground};`
                : ''
            "
            :key="row.team.teamid + col"
          >
            <team-inline :team="row.team" v-if="col === 'teamname'" />
            <span v-else-if="col === 'games'">{{ row[col] }}</span>
            <span v-else-if="['ppcalc', 'pkcalc', 'scalc', 'gcalc'].indexOf(col) >= 0"
              >{{ row[col].toFixed(1) }}%</span
            >
            <span v-else>{{ row[col].toFixed(1) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bg-gray-100 dark:bg-primary-800 xl:shadow p-6 mt-6" v-if="!$apollo.loading">
      <h3 class="font-serif font-mono font-extralight uppercase pb-4 text-xl">Legende</h3>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(dd, dt) in legend" :key="dt">
          <span class="font-medium">{{ dt }}</span> <span>&ndash; {{ dd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gql from 'graphql-tag'
import { get } from 'lodash-es'

export default {
  async asyncData({ params }) {
    const season = params.season
    return { season }
  },
  data() {
    return {
      sortedTeamstats: [],
      error: false,
      cols: [
        'teamname',
        'games',
        'ppcalc',
        'pkcalc',
        'pimg',
        'gfg',
        'gag',
        'sfg',
        'sag',
        'gcalc',
        'scalc'
      ],
      sortCol: 'teamname',
      direction: 'desc',
      legend: {
        'PP%': 'Powerplay Percentage / Überzahlquote',
        'PK%': 'Penaltykilling Percentage / Unterzahlquote',
        'PIM/G': 'Penaltyminutes per Game / Strafminuten pro Spiel',
        'GF/G': 'Goals For per Game / Tor pro Spiel',
        'GA/G': 'Goals Against per Game / Gegentor pro Spiel',
        'SF/G': 'Shots For per Game / Schüsse pro Spiel',
        'SA/G': 'Shots Against per Game / Gegnerische Torschüsse pro Spiel',
        'SH%': 'Shots Percentage / Schussquote',
        'SV%': 'Save Percentage / Fangquote'
      }
    }
  },
  apollo: {
    teamstats: {
      query: gql`
        query standings($filter: TeamstatsFilter!, $order: [OrderBy]) {
          teamstats(filter: $filter, orderBy: $order) {
            team {
              teamsim
              teamid
              foreground @client(always: true)
              background @client(always: true)
            }
            games
            goalsfor
            goalsagainst
            pp
            ppg
            pk
            pkg
            pim
            shotsfor
            shotsagainst
          }
        }
      `,
      variables() {
        return {
          filter: { season: this.season },
          order: { column: 'games', order: 'DESC' }
        }
      },
      update: ({ teamstats }) =>
        teamstats.map((t) => {
          return {
            ...t,
            ppcalc: Number((t.ppg / t.pp) * 100),
            pkcalc: Number((1 - t.pkg / t.pk) * 100),
            pimg: Number(t.pim / t.games),
            gcalc: Number((t.goalsfor / t.shotsfor) * 100),
            scalc: Number((1 - t.goalsagainst / t.shotsagainst) * 100),
            gfg: Number(t.goalsfor / t.games),
            gag: Number(t.goalsagainst / t.games),
            sfg: Number(t.shotsfor / t.games),
            sag: Number(t.shotsagainst / t.games)
          }
        }),
      error() {
        this.error = true
      }
    }
  },
  watch: {
    teamstats() {
      this.updateTeams()
    }
  },
  computed: {
    ...mapState({
      logTeam: (state) => state.user.team
    })
  },
  methods: {
    sortColumn(col) {
      if (this.sortCol === col) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.direction = 'asc'
      }
      this.sortCol = col
      this.updateTeams()
    },
    updateTeams() {
      let sorting = this.sortCol
      if (sorting === 'teamname') {
        sorting = 'team.teamid'
      }
      this.sortedTeamstats = this.teamstats.slice().sort((a, b) => {
        if (get(a, sorting) > get(b, sorting)) return 1
        if (get(a, sorting) < get(b, sorting)) return -1
        return 0
      })
      if (this.direction === 'asc') {
        this.sortedTeamstats.reverse()
      }
    }
  }
}
</script>
