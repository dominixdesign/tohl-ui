<template>
  <table
    v-if="playerstats"
    class="relative font-light w-full min-w-full divide-y divide-gray-200 dark:divide-gray-600"
  >
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
        <th colspan="4" scope="col" class="px-6 py-3 text-left">
          <!-- eslint-disable vue/no-parsing-error -->
          <h3 class="uppercase text-xl">
            {{ position.length <= 2 ? $t(`positions.${position}`) : $t(`top10.${sortby}`) }}
          </h3>
          <!-- eslint-enable -->
        </th>
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
        <td class="px-2 py-0.5">
          <div
            class="bg-gray-200 dark:bg-primary-700 w-8 h-6 animate-pulse float-right rounded-sm"
          />
        </td>
        <td class="px-2 py-0.5">
          <div class="bg-gray-200 dark:bg-primary-700 w-40 h-6 animate-pulse rounded-sm" />
        </td>
        <td v-for="c in 10" :key="`standins-${n}-${c}`" class="px-2 py-1">
          <div
            class="bg-gray-200 dark:bg-primary-700 w-8 h-6 animate-pulse float-right rounded-sm"
          />
        </td>
      </tr>
      <tr
        v-for="index in limit"
        class="text-sm text-right"
        :class="[
          index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-primary-900',
          playerstats[index - 1][sortby] === playerstats[0][sortby] &&
          playerstats[index - 1].games === playerstats[0].games
            ? 'font-bold'
            : ''
        ]"
        :key="`${playerstats[index - 1].team.teamid}-${
          playerstats[index - 1].player.lname
        }-${index}`"
      >
        <td
          class="py-0.5 pl-2 whitespace-nowrap text-gray-900 dark:text-gray-200"
          v-if="
            !playerstats[index - 2] ||
            (playerstats[index - 2] &&
              (playerstats[index - 1][sortby] !== playerstats[index - 2][sortby] ||
                playerstats[index - 1].games !== playerstats[index - 2].games))
          "
        >
          {{ index }}.
        </td>
        <td class="py-0.5 pl-2 whitespace-nowrap text-gray-900 dark:text-gray-200" v-else></td>
        <td
          class="px-3 py-0.5 whitespace-nowrap text-left text-gray-900 dark:text-gray-200"
          v-if="playerstats[index - 1][sortby] > 0"
        >
          <team-logo-inline :teamid="playerstats[index - 1].team.teamid" />
          {{ playerstats[index - 1].player.display_fname }}
          <span class="uppercase">{{ playerstats[index - 1].player.display_lname }}</span>
        </td>
        <td
          class="pl-2 pr-4 py-0.5 whitespace-nowrap text-gray-600 dark:text-gray-400 italic"
          v-if="playerstats[index - 1][sortby] > 0"
        >
          {{ playerstats[index - 1].games }}
        </td>
        <td
          class="pl-2 pr-4 py-0.5 whitespace-nowrap text-gray-600 dark:text-gray-400"
          v-if="playerstats[index - 1][sortby] > 0"
        >
          {{ format(playerstats[index - 1][sortby], sortby, playerstats[index - 1]) }}
        </td>
        <td
          colspan="3"
          class="pl-2 pr-4 py-0.5 text-left whitespace-nowrap text-gray-600 dark:text-gray-400"
          v-else
        >
          &hellip;
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
            player {
              id
              fname
              display_fname
              display_lname
              lname
            }
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
    },
    backgroundColor(team) {
      return this.$store.getters['teams/backgroundByTeam'](team)
    },
    foregroundColor(team) {
      return this.$store.getters['teams/foregroundByTeam'](team)
    }
  }
}
</script>
