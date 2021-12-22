<template>
  <div class="statstable overflow-x-auto">
    <h3>gamelog</h3>
    <table v-if="games">
      <thead>
        <tr>
          <th></th>
          <th colspan="4">Spiel</th>
          <th colspan="3">Scoring</th>
          <th></th>
          <th colspan="2"></th>
          <th colspan="2">Shots</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th>Day</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>G</th>
          <th>A</th>
          <th>PTS</th>
          <th>+/-</th>
          <th>PIM</th>
          <th>EJEC</th>
          <th>S</th>
          <th>S%</th>
          <th>TOI</th>
          <th>HITS</th>
          <th>INJ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stat, name, index) of games" :key="'gamelog-game-' + index">
          <td
            v-for="col of cols"
            :key="`gamelog-${stat.season}${stat.team.teamid}${col}`"
            :class="['team', 'result', 'opponent'].indexOf(col) >= 0 ? '!text-left' : ''"
          >
            <span v-if="col === 'gameday'">{{ stat.game.gameday }}</span>
            <span v-else-if="col === 'team'" class="uppercase">
              {{ stat.team.teamid }}
            </span>
            <span v-else-if="col === 'at'">{{
              stat.team.teamid === stat.game.home.teamid ? '' : '@'
            }}</span>
            <span v-else-if="col === 'opponent'" class="uppercase">{{
              stat.team.teamid === stat.game.home.teamid
                ? stat.game.away.teamid
                : stat.game.home.teamid
            }}</span>
            <span
              v-else-if="col === 'result' && stat.game.winner"
              class="uppercase"
              :class="
                stat.team.teamid === stat.game.winner.teamid
                  ? 'text-green-700 font-bold'
                  : 'text-red-700'
              "
            >
              {{ stat.team.teamid === stat.game.winner.teamid ? 'W' : 'L'
              }}{{ stat.game.overtimes > 0 ? `-OT${stat.game.overtimes}` : '' }}
            </span>
            <span v-else-if="col === 'spercentage'">{{ shotpercentage(stat) || '&mdash;' }}</span>
            <span v-else-if="col === 'plusminus'"
              >{{ get(stat, col, '&mdash;') > 0 ? '+' : '' }}{{ get(stat, col, '&mdash;') }}</span
            >
            <span v-else>{{ get(stat, col, '&mdash;') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    {{ games }}
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { get } from 'lodash-es'

export default {
  async asyncData({ params: { playerid } }) {
    return { playerid }
  },
  data() {
    return {
      cols: [
        'gameday',
        'team',
        'at',
        'opponent',
        'result',
        'goals',
        'assists',
        'points',
        'plusminus',
        'pim',
        'ejected',
        'shots',
        'spercentage',
        'icetime',
        'hits',
        'injured'
      ]
    }
  },
  apollo: {
    games: {
      query: gql`
        query games($player: String, $season: String) {
          lineup(filter: { player: $player, season: $season }) {
            season
            team {
              teamid
            }
            game {
              home {
                teamid
              }
              away {
                teamid
              }
              winner {
                teamid
              }
              gameday
              overtimes
              goalshome
              goalsaway
            }
            goals
            assists
            points
            plusminus
            pim
            shots
            hits
            icetime
            fightswon
            fightslose
            fightsdraw
            injured
            ejected
            minutes
            saves
            shotsfaced
            goalsagainst
            shutout
            star
          }
        }
      `,
      variables() {
        return {
          player: this.playerid,
          season: 'TOHL12'
        }
      },
      update: ({ lineup }) => lineup,
      error() {
        this.error = true
      }
    }
  },
  methods: {
    get(object, path, defaultValue) {
      if (object.games <= 0 && !path.includes('farm')) {
        return defaultValue
      }
      return get(object, path, defaultValue)
    },
    shotpercentage(stat) {
      if (stat.games <= 0) {
        return false
      }
      let sp = 0
      if (stat.goals > 0) {
        sp = (100 * stat.goals) / stat.shots
      }
      return (
        sp.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%'
      )
    }
  }
}
</script>
