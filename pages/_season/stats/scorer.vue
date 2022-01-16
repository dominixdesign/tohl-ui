<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <h3 class="text-3xl font-bold my-5">Scorerliste</h3>
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
          <td colspan="9" class="text-secondary-500 text-center font-medium py-4">
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
          v-for="(row, index) in sortedScorer"
          :class="
            index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'
          "
          class="text-base dark:hover:bg-primary-700 hover:bg-gray-100"
          :key="`${row.player.fname}-${row.player.lname}-${row.team.teamid}`"
        >
          <td
            v-for="col in cols"
            class="p-1 whitespace-nowrap text-gray-600 dark:text-gray-400"
            :class="[
              sortCol === col
                ? 'bg-gray-100 dark:bg-secondary-900 dark:hover:bg-primary-700 hover:bg-gray-100'
                : '',
              col === 'name' ? 'text-left' : ''
            ]"
            :style="
              logTeam === row.team.teamid
                ? `background-color: ${row.team.background}; color: ${row.team.foreground};`
                : ''
            "
            :key="row.team.teamid + col"
          >
            <player-team-and-name
              v-if="col === 'name'"
              :player="row.player"
              :team="row.team"
              :totalTeams="row.total_teams"
            />
            <span v-else-if="col === 'spercentage'">{{ shotpercentage(row[col]) }}</span>
            <span v-else-if="col === 'averageicetime'">{{ averageicetime(row[col]) }}</span>
            <span v-else>{{ row[col] }}</span>
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
import statsMixin from '~/mixins/playerstats'

export default {
  async asyncData({ params }) {
    const season = params.season
    return { season }
  },
  mixins: [statsMixin],
  data() {
    return {
      sortedScorer: [],
      error: false,
      cols: [
        'name',
        'games',
        'goals',
        'assists',
        'points',
        'plusminus',
        'pim',
        'ejections',
        'evg',
        'ppg',
        'shg',
        'gwg',
        'eva',
        'ppa',
        'sha',
        'shots',
        'spercentage',
        'icetime',
        'averageicetime',
        'hits',
        'injuries'
      ],
      sortCol: 'points',
      direction: 'asc',
      legend: {
        SP: 'Games / Spiele',
        T: 'Goals / Tore',
        A: 'Assists / Vorlagen',
        P: 'Points / Punkte',
        '+/-': 'Plus-Minus',
        PIM: 'Penalty Minutes / Strafminuten',
        EJ: 'Ejections / Spieldauerstrafen',
        EVG: 'Even Strength Goals / Tore bei gleicher Spielerzahl',
        PPG: 'Powerplay Goals / Überzahltore',
        SHG: 'Shorthanded Goals / Unterzahltore',
        GWG: 'Game Winning Goals / Siegtore',
        EVA: 'Even Strength Assists / Vorlagen bei gleicher Spielerzahl',
        PPA: 'Powerplay Assists / Vorlagen zu Überzahltoren',
        SHA: 'Shorthanded Assists / Vorlagen zu Unterzahltoren',
        S: 'Shots / Schüsse',
        'S%': 'Shotpercentage / Torquote',
        IT: 'Ice Time / Eiszeit',
        'IT/G': 'Ice Time per Game / Eiszeit pro Spiel',
        H: 'Hits / Checks',
        INJ: 'Injuries / Verletzungen'
      }
    }
  },
  apollo: {
    playerstats: {
      query: gql`
        query leader($order: [OrderBy], $where: JSON, $limit: Int) {
          playerstats(orderBy: $order, limit: $limit, where: $where) {
            team {
              teamsim
              teamid
              foreground @client(always: true)
              background @client(always: true)
            }
            currentTeam {
              teamsim
              teamid
              foreground @client(always: true)
              background @client(always: true)
            }
            total_teams {
              teamsim
              teamid
              foreground @client(always: true)
              background @client(always: true)
            }
            player {
              id
              fname
              display_fname
              display_lname
              lname
            }
            season
            games
            goals
            assists
            points
            plusminus
            pim
            shots
            hits
            icetime
            evg
            eva
            ppg
            ppa
            shg
            sha
            gwg
            streak_goals_current
            streak_goals_longest
            streak_points_current
            streak_points_longest
            fightswon
            fightslose
            fightsdraw
            injuries
            ejections
            minutes
            saves
            shotsfaced
            savepercentage
            gaa
            goalsagainst
            shutout
            first_stars
            second_stars
            third_stars
            spercentage @client
            averageicetime @client
          }
        }
      `,
      variables() {
        return {
          order: [
            { column: 'points', order: 'DESC' },
            { column: 'games', order: 'ASC' }
          ],
          where: JSON.stringify([
            ['playerstats.season', '=', this.season],
            ['playerdata.pos', 'IN', ['LW', 'RW', 'C', 'D']]
          ]),
          limit: 1500
        }
      },
      update: ({ playerstats }) => {
        if (playerstats.length >= 1) {
          return playerstats
        }
        return false
      },
      error() {
        this.error = true
      }
    }
  },
  watch: {
    playerstats() {
      this.updatePlayer()
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
      this.updatePlayer()
    },
    updatePlayer() {
      let sorting = this.sortCol
      if (sorting === 'name') {
        sorting = 'player.display_lname'
      }
      this.sortedScorer = this.playerstats.slice().sort((a, b) => {
        if (a.team === null) {
          console.log(a)
        }
        if (get(a, sorting) > get(b, sorting)) return 1
        if (get(a, sorting) < get(b, sorting)) return -1
        return 0
      })
      if (this.direction === 'asc') {
        this.sortedScorer.reverse()
      }
      this.sortedScorer = this.sortedScorer.slice(0, 25)
    }
  }
}
</script>
