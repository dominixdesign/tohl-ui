<template>
  <div>
    <div v-for="type in types" class="statstable overflow-x-auto" :key="`${type}`">
      <h3 class="ml-1 mb-2 text-xl font-bold sm:ml-0">
        {{ $t(`seasontypes.${type}`) }}
      </h3>
      <table v-if="seasons[type] && Object.keys(seasons[type]).length > 0">
        <thead>
          <tr>
            <th colspan="2"></th>
            <th></th>
            <th colspan="3">Scoring</th>
            <th></th>
            <th colspan="3">Härte</th>
            <th colspan="4">Tore</th>
            <th colspan="3">Vorlagen</th>
            <th colspan="2">Schüsse</th>
            <th colspan="2">Eiszeit</th>
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
            <th>HITS</th>
            <th>EJEC</th>
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
            <th>INJ</th>
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
                <team-logo-inline class="hidden md:inline-block" :teamid="stat.team.teamid" />
                {{ stat.team.teamid }}
              </span>
              <span v-else-if="col === 'spercentage'">{{
                shotpercentage(get(stat, col)) || '&mdash;'
              }}</span>
              <span v-else-if="col === 'averageicetime'">{{
                averageicetime(get(stat, col)) || '&mdash;'
              }}</span>
              <span v-else-if="col === 'plusminus'"
                >{{ get(stat, col, '&mdash;') > 0 ? '+' : '' }}{{ get(stat, col, '&mdash;') }}</span
              >
              <span v-else>{{ get(stat, col, '&mdash;') }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="seasons.career" class="border-t-4 border-double border-secondary-500">
          <tr class="text-gray-500" v-for="(stat, name) of seasons.career[type]" :key="name">
            <td
              v-for="col of cols"
              :key="`career-${type}${stat.goals}${stat.assists}${col}`"
              :class="col === 'team' ? '!text-left' : ''"
            >
              <span v-if="col === 'season'"></span>
              <span v-else-if="col === 'team'" class="uppercase"> {{ name }} </span>
              <span v-else-if="col === 'spercentage'">{{
                shotpercentage(get(stat, col)) || '&mdash;'
              }}</span>
              <span v-else-if="col === 'averageicetime'">{{
                averageicetime(get(stat, col)) || '&mdash;'
              }}</span>
              <span v-else>{{ get(stat, col, '&mdash;') }}</span>
            </td>
          </tr>
          <tr class="font-bold">
            <td
              v-for="col of cols"
              :key="`career-all-${col}`"
              :class="col === 'team' ? '!text-left' : ''"
            >
              <span v-if="col === 'season'"></span>
              <span v-else-if="col === 'team'" class="uppercase">Career</span>
              <span v-else-if="col === 'spercentage'">{{
                shotpercentage(get(seasons.career.all[type], col)) || '&mdash;'
              }}</span>
              <span v-else-if="col === 'averageicetime'">{{
                averageicetime(get(seasons.career.all[type], col)) || '&mdash;'
              }}</span>
              <span v-else>{{ get(seasons.career.all[type], col, '&mdash;') }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <p v-else class="mb-4">&mdash;</p>
    </div>
    <div class="statstable overflow-x-auto">
      <h3 class="ml-1 mb-2 text-xl font-bold sm:ml-0">Farm-Team Statistik</h3>
      <table>
        <thead>
          <tr>
            <th colspan="2"></th>
            <th colspan="3">Scoring</th>
          </tr>
          <tr>
            <th>Saison</th>
            <th>Team</th>
            <th>G</th>
            <th>A</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody v-if="seasons">
          <tr v-for="(stat, name, index) of seasons.farm" :key="'farm' + name">
            <td
              v-for="col of ['season', 'team', 'farm_goals', 'farm_assists', 'farm_points']"
              :key="`farm${stat.season}${stat.team.teamid}${col}`"
              :class="col === 'team' ? '!text-left' : ''"
            >
              <span v-if="col === 'season'">{{
                !Object.keys(seasons.farm)[index - 1] ||
                (Object.keys(seasons.farm)[index - 1] &&
                  Object.keys(seasons.farm)[index - 1].substr(0, 9) !== name.substr(0, 9))
                  ? stat.season
                  : 'skip ' + stat.season
              }}</span>
              <span v-else-if="col === 'team'" class="uppercase">
                <team-logo-inline class="hidden sm:inline-block" :teamid="stat.team.teamid" />
                {{ stat.team.teamid }}
              </span>
              <span v-else>{{ get(stat, col, '&mdash;') }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="seasons.career" class="border-t-4 border-double border-secondary-500">
          <tr class="font-bold">
            <td
              v-for="col of ['season', 'team', 'farm_goals', 'farm_assists', 'farm_points']"
              :key="`career-farm-all-${col}`"
              :class="col === 'team' ? '!text-left' : ''"
            >
              <span v-if="col === 'season'"></span>
              <span v-else-if="col === 'team'" class="uppercase">Career</span>
              <span v-else>{{ get(seasons.career.all.farm, col, '&mdash;') }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { get } from 'lodash-es'
import statsMixin from '~/mixins/playerstats'

export default {
  async asyncData({ params: { playerid } }) {
    return { playerid }
  },
  mixins: [statsMixin],
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
        'hits',
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
        'injuries'
      ]
    }
  },
  watch: {
    playerstats(newPlayerstats) {
      const farmCols = ['farm_goals', 'farm_assists', 'farm_points']
      const seasons = {
        plf: {},
        reg: {},
        pre: {},
        farm: {},
        career: {
          all: {
            plf: { ...Object.fromEntries(this.cols.map((col) => [col, 0])), years: 0 },
            reg: { ...Object.fromEntries(this.cols.map((col) => [col, 0])), years: 0 },
            pre: { ...Object.fromEntries(this.cols.map((col) => [col, 0])), years: 0 },
            farm: { ...Object.fromEntries(farmCols.map((col) => [col, 0])), years: 0 }
          },
          plf: {},
          reg: {},
          pre: {},
          farm: {}
        }
      }
      // const seasons = [...newPlayerstats.map((p) => p.season)].sort(seasonSorter)
      newPlayerstats.forEach((playerstat) => {
        const type =
          playerstat.season.indexOf('PLF') >= 0
            ? 'plf'
            : playerstat.season.indexOf('pre') >= 0
            ? 'pre'
            : 'reg'
        const s = playerstat.season.substr(0, 6)

        seasons[type][s + playerstat.team.teamid] = playerstat
        if (playerstat.farm_points > 0) {
          console.log(playerstat.farm_points)
          seasons['farm'][playerstat.season + playerstat.team.teamid] = playerstat
          if (!seasons.career.farm[playerstat.team.teamid]) {
            seasons.career.farm[playerstat.team.teamid] = Object.fromEntries(
              farmCols.map((col) => [col, 0])
            )
          }
          for (const number of farmCols) {
            if (!isNaN(playerstat[number])) {
              seasons.career.farm[playerstat.team.teamid][number] += playerstat[number]
              seasons.career.all.farm[number] += playerstat[number]
            }
          }
        }

        if (!seasons.career[type][playerstat.team.teamid]) {
          seasons.career[type][playerstat.team.teamid] = Object.fromEntries(
            this.cols.map((col) => [col, 0])
          )
        }
        for (const number of this.cols) {
          if (!isNaN(playerstat[number])) {
            seasons.career[type][playerstat.team.teamid][number] += playerstat[number]
            seasons.career.all[type][number] += playerstat[number]
          }
        }
      })
      console.log(seasons.career.all.farm)
      this.seasons = seasons
    }
  },
  methods: {
    get(object, path, defaultValue) {
      if (object.games <= 0 && !path.includes('farm')) {
        return defaultValue
      }
      return get(object, path, defaultValue)
    }
  },
  apollo: {
    playerstats: {
      query: gql`
        query playerstats($where: JSON) {
          playerstats(where: $where) {
            season
            player {
              id
            }
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
            farm_goals
            farm_assists
            farm_points
            spercentage @client
            averageicetime @client
          }
        }
      `,
      variables() {
        return {
          where: JSON.stringify([
            ['player', '=', this.playerid],
            ['team', '!=', 'tot']
          ])
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
