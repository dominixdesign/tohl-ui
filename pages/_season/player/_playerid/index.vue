<template>
  <div>
    <div v-for="type in types" class="statstable overflow-x-auto" :key="`${season}-${type}`">
      <h3 class="font-college font-bold text-xl ml-1 sm:ml-0 mb-2">
        {{ $t(`seasontypes.${type}`) }}
      </h3>
      <table>
        <thead>
          <tr>
            <th colspan="2"></th>
            <th></th>
            <th colspan="3">Scoring</th>
            <th></th>
            <th></th>
            <th colspan="4">Goals</th>
            <th colspan="3">Assists</th>
            <th colspan="2">Shots</th>
            <th colspan="2">Ice Time</th>
            <th></th>
          </tr>
          <tr>
            <th>Saison</th>
            <th>Team</th>
            <th>GP</th>
            <th>G</th>
            <th>A</th>
            <th>PTS</th>
            <th>+/-</th>
            <th>PIM</th>
            <th>EV</th>
            <th>PP</th>
            <th>SH</th>
            <th>GW</th>
            <th>EV</th>
            <th>PP</th>
            <th>SH</th>
            <th>S</th>
            <th>S%</th>
            <th>TOI</th>
            <th>ATOI</th>
            <th>HITS</th>
          </tr>
        </thead>
        <tbody v-if="seasons">
          <tr v-for="(stat, name, index) of seasons[type]" :key="name">
            <td
              v-for="col of cols"
              :key="`${type}${stat.season}${stat.team.teamid}${col}`"
              :class="col === 'team' ? '!text-left' : ''"
            >
              <span v-if="col === 'season'">{{
                !Object.keys(seasons[type])[index - 1] ||
                (Object.keys(seasons[type])[index - 1] &&
                  Object.keys(seasons[type])[index - 1].substr(0, 6) !== name.substr(0, 6))
                  ? stat.season
                  : ''
              }}</span>
              <span v-else-if="col === 'team'" class="uppercase">
                <team-logo-inline class="hidden sm:inline-block" :teamid="stat.team.teamid" />
                {{ stat.team.teamid }}
              </span>
              <span v-else-if="col === 'spercentage'">{{ shotpercentage(stat) }}%</span>
              <span v-else-if="col === 'averageicetime'">{{ averageicetime(stat) }}</span>
              <span v-else>{{ get(stat, col, '&mdash;') }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { get } from 'lodash-es'

export default {
  async asyncData({ params: { playerid, season } }) {
    return { playerid, season }
  },
  data() {
    return {
      types: ['reg', 'plf', 'pre'],
      seasons: {},
      cols: [
        'season',
        'team',
        'games',
        'goals',
        'assists',
        'points',
        'plusminus',
        'pim',
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
        'hits'
      ]
    }
  },
  watch: {
    playerstats(newPlayerstats) {
      const seasons = { plf: {}, reg: {}, pre: {} }
      // const seasons = [...newPlayerstats.map((p) => p.season)].sort(seasonSorter)
      newPlayerstats.forEach((playerstat) => {
        const s = playerstat.season.substr(0, 6)
        if (!seasons[s + playerstat.team.teamid]) {
          seasons[s + playerstat.team.teamid] = {}
        }
        if (playerstat.season.indexOf('PLF') >= 0) {
          seasons['plf'][s + playerstat.team.teamid] = playerstat
        } else if (playerstat.season.indexOf('pre') >= 0) {
          seasons['pre'][s + playerstat.team.teamid] = playerstat
        } else {
          seasons['reg'][s + playerstat.team.teamid] = playerstat
        }
      })
      this.seasons = seasons
    }
  },
  methods: {
    get(object, path, defaultValue) {
      return get(object, path, defaultValue)
    },
    shotpercentage(stat) {
      let sp = 0
      if (stat.goals > 0) {
        sp = (100 * stat.goals) / stat.shots
      }
      return sp.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    },
    averageicetime(stat) {
      let atoi = 0
      if (stat.icetime > 0) {
        atoi = stat.icetime / stat.games
      }
      return `${Math.floor(atoi)}:${('00' + Math.floor((atoi % 1) * 60)).slice(-2)}`
    }
  },
  apollo: {
    playerstats: {
      query: gql`
        query playerstats($where: JSON) {
          playerstats(where: $where) {
            season
            team {
              teamid
              teamsim
            }
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
          }
        }
      `,
      variables() {
        return {
          where: JSON.stringify([['player', '=', this.playerid]])
        }
      },
      update: ({ playerstats }) => playerstats,
      error() {
        this.error = true
      }
    }
  }
}
</script>
