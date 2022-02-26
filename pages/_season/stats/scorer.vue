<template>
  <div class="mx-auto max-w-screen-2xl p-6 xl:px-12">
    <h3 class="my-5 text-3xl font-bold">Scorerliste</h3>
    <player-scorerlist
      :loading="$apollo.loading"
      :sortedScorer="sortedScorer"
      :error="$apollo.error"
      :sortColumn="sortColumn"
      :sortCol="sortCol"
      :direction="direction"
    />
    <div class="mt-6 bg-gray-100 p-6 dark:bg-primary-800 xl:shadow" v-if="!$apollo.loading">
      <h3 class="font-serif pb-4 font-mono text-xl font-extralight uppercase">Legende</h3>
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
      page: 0,
      perPage: 20,
      error: false,
      sortCol: 'points',
      direction: 'desc',
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
            shotspercentage
            itg
            spercentage @client
            averageicetime @client
          }
        }
      `,
      variables() {
        return {
          order: [
            { column: this.sortCol, order: this.direction },
            { column: 'games', order: 'ASC' }
          ],
          where: JSON.stringify([
            ['playerstats.season', '=', this.season],
            ['playerdata.pos', 'IN', ['LW', 'RW', 'C', 'D']]
          ]),
          limit: this.perPage
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
  methods: {
    sortColumn(col) {
      if (this.sortCol === col) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.direction = 'desc'
      }
      this.sortCol = col
    },
    updatePlayer() {
      this.sortedScorer = this.playerstats.slice()
    }
  }
}
</script>
