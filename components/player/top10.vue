<template>
  <table class="top10__table">
    <thead>
      <tr class="text-base">
        <th colspan="4" scope="col">
          <!-- eslint-disable vue/no-parsing-error -->
          <h3 class="text-xl uppercase">
            {{ position.length <= 2 ? $t(`positions.${position}`) : $t(`top10.${sortby}`) }}
          </h3>
          <!-- eslint-enable -->
        </th>
      </tr>
    </thead>
    <tbody v-if="error">
      <tr>
        <td colspan="12" class="py-4 text-center font-medium text-secondary-500">
          Tabelle kann nicht geladen werden.
        </td>
      </tr>
    </tbody>
    <tbody v-if="$apollo.loading">
      <tr
        v-for="n in 10"
        :key="`standing-${n}`"
        :class="n % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900'"
      >
        <!-- eslint-enable -->
        <td class="px-2 py-0.5">
          <div
            class="float-right h-4 w-6 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
          />
        </td>
        <td class="px-2 py-0.5">
          <div class="h-4 w-40 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700" />
        </td>
        <td v-for="c in 2" :key="`standins-${n}-${c}`" class="px-2 py-1">
          <div
            class="float-right h-4 w-8 animate-pulse rounded-sm bg-gray-200 dark:bg-primary-700"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <tr
        v-for="(stat, index) in playerstats"
        :class="[
          index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900',
          stat[sortby] === playerstats[0][sortby] && stat.games === playerstats[0].games
            ? 'font-bold'
            : ''
        ]"
        :style="
          logTeam === stat.team.teamid
            ? `background-color: ${stat.team.background}; color: ${stat.team.foreground};`
            : ''
        "
        :key="`${sortby}-${stat.team.teamid}-${stat.player.lname}-${index}`"
      >
        <td
          v-if="
            !playerstats[index - 1] ||
            (playerstats[index - 1] &&
              (stat[sortby] !== playerstats[index - 1][sortby] ||
                stat.games !== playerstats[index - 1].games))
          "
        >
          {{ index + 1 }}.
        </td>
        <td v-else></td>
        <td v-if="stat[sortby] > 0">
          <player-team-and-name
            :player="stat.player"
            :team="stat.team"
            :totalTeams="stat.total_teams"
          />
        </td>
        <td v-if="stat[sortby] > 0">
          {{ stat.games }}
        </td>
        <td v-if="stat[sortby] > 0">
          {{ format(stat[sortby], sortby, stat) }}
        </td>
        <td colspan="3" v-else>&hellip;</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {
  props: {
    season: String,
    position: String,
    sortby: String
  },
  data() {
    return {
      error: false
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
            icetime
            goals
            assists
            points
            pim
            ppg
            shg
            plusminus
            hits
            shots
            gaa
            shotsfaced
            savepercentage
            shutout
            fightswon
            fightslose
            fightsdraw
            enforcerpoints
          }
        }
      `,
      variables() {
        return {
          order: [
            { column: this.sortby, order: this.sortby === 'gaa' ? 'ASC' : 'DESC' },
            { column: 'games', order: 'ASC' }
          ],
          where: JSON.stringify(this.where),
          limit: this.limit
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
  computed: {
    ...mapState({
      logTeam: (state) => state.user.team
    }),
    limit() {
      return this.position === 'goalies' ? 5 : 10
    },
    where() {
      if (this.position === 'offense') {
        return [
          ['playerstats.season', '=', this.season],
          ['playerdata.pos', 'IN', ['LW', 'RW', 'C']]
        ]
      } else if (this.position.length <= 2) {
        return [
          ['playerstats.season', '=', this.season],
          ['playerdata.pos', 'IN', [this.position]]
        ]
      } else if (this.position === 'all') {
        return [
          ['playerstats.season', '=', this.season],
          ['playerdata.pos', 'IN', ['LW', 'RW', 'C', 'D']]
        ]
      } else if (this.position === 'defense') {
        return [
          ['playerstats.season', '=', this.season],
          ['playerdata.pos', '=', 'D']
        ]
      } else if (this.position === 'goalies') {
        return [
          ['playerstats.season', '=', this.season],
          [
            'playerstats.minutes',
            '>=',
            `(SELECT STD(\`minutes\`) as 'minmin' FROM playerstats WHERE season = '${this.season}')`
          ],
          ['playerdata.pos', '=', 'G']
        ]
      }
    }
  },
  methods: {
    format(value, type, allValues) {
      if (type === 'plusminus') {
        return value > 0 ? `+${value}` : value
      }
      if (this.position.length <= 2 && type === 'points') {
        return `${allValues.goals}-${allValues.assists}-${allValues.points}`
      }
      if (type === 'gaa' || type === 'savepercentage') {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
      return value
    }
  }
}
</script>
