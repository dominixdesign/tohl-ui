<template>
  <section>
    <div v-if="loading" key="player-career-loading">lädt...</div>
    <div v-else-if="error" key="player-career-error">oops {{ error }}</div>
    <div v-if="allSeasons" key="player-career-display">
      <div v-for="typer in types" class="statstable overflow-x-auto" :key="`${typer}`">
        <h3 class="ml-1 mb-2 text-xl font-bold sm:ml-0">
          {{ `seasontypes.${typer}` }}
        </h3>
        <table v-if="allSeasons[typer] && Object.keys(allSeasons[typer]).length > 0">
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
          <tbody v-if="allSeasons">
            <tr v-for="(stat, name, index) of allSeasons[typer]" :key="name">
              <td
                v-for="col of cols"
                :key="`${typer}${stat.season}${stat.team.teamid}${col}`"
                :class="col === 'team' ? '!text-left' : ''"
              >
                <span v-if="col === 'season'">{{
                  !Object.keys(allSeasons[typer])[index - 1] ||
                  (Object.keys(allSeasons[typer])[index - 1] &&
                    Object.keys(allSeasons[typer])[index - 1].substr(0, 6) !== name.substr(0, 6))
                    ? stat.season
                    : ''
                }}</span>
                <team-small-inline v-else-if="col === 'team'" :team="stat.team" />
                <span v-else-if="col === 'spercentage'">{{
                  shotpercentage(get(stat, col)) || '&mdash;'
                }}</span>
                <span v-else-if="col === 'averageicetime'">{{
                  averageicetime(get(stat, col)) || '&mdash;'
                }}</span>
                <span v-else-if="col === 'plusminus'"
                  >{{ get(stat, col, '&mdash;') > 0 ? '+' : ''
                  }}{{ get(stat, col, '&mdash;') }}</span
                >
                <template v-else>{{ get(stat, col, '&mdash;') }}</template>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="allSeasons.career" class="border-t-4 border-double border-secondary-500">
            <tr class="text-gray-500" v-for="(stat, name) of allSeasons.career[typer]" :key="name">
              <td
                v-for="col of cols"
                :key="`career-${typer}${stat.goals}${stat.assists}${col}`"
                :class="col === 'team' ? '!text-left' : ''"
              >
                <span v-if="col === 'season'"></span>
                <span v-else-if="col === 'team'" class="uppercase"> {{ name }} </span>
                <span v-else-if="col === 'spercentage'">{{
                  shotpercentage((get(stat, 'goals') / get(stat, 'shots')) * 100) || '&mdash;'
                }}</span>
                <span v-else-if="col === 'averageicetime'">{{
                  averageicetime(get(stat, 'icetime') / get(stat, 'games')) || '&mdash;'
                }}</span>
                <template v-else>{{ get(stat, col, '&mdash;') }}</template>
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
                <span v-else-if="col === 'spercentage'">
                  {{
                    shotpercentage(
                      (get(allSeasons.career.all[typer], 'goals') /
                        get(allSeasons.career.all[typer], 'shots')) *
                        100
                    ) || '&mdash;'
                  }}</span
                >
                <span v-else-if="col === 'averageicetime'">{{
                  averageicetime(
                    get(allSeasons.career.all[typer], 'icetime') /
                      get(allSeasons.career.all[typer], 'games')
                  ) || '&mdash;'
                }}</span>
                <template v-else>{{ get(allSeasons.career.all[typer], col, '&mdash;') }}</template>
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
          <tbody v-if="allSeasons">
            <tr v-for="(stat, name, index) of allSeasons.farm" :key="'farm' + name">
              <td
                v-for="col of ['season', 'team', 'farm_goals', 'farm_assists', 'farm_points']"
                :key="`farm${stat.season}${stat.team.teamid}${col}`"
                :class="col === 'team' ? '!text-left' : ''"
              >
                <span v-if="col === 'season'">{{
                  !Object.keys(allSeasons.farm)[index - 1] ||
                  (Object.keys(allSeasons.farm)[index - 1] &&
                    Object.keys(allSeasons.farm)[index - 1].substr(0, 9) !== name.substr(0, 9))
                    ? stat.season
                    : 'skip ' + stat.season
                }}</span>
                <team-small-inline v-else-if="col === 'team'" :team="stat.team" />
                <span v-else>{{ get(stat, col, '&mdash;') }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="allSeasons.career" class="border-t-4 border-double border-secondary-500">
            <tr class="font-bold">
              <td
                v-for="col of ['season', 'team', 'farm_goals', 'farm_assists', 'farm_points']"
                :key="`career-farm-all-${col}`"
                :class="col === 'team' ? '!text-left' : ''"
              >
                <span v-if="col === 'season'"></span>
                <span v-else-if="col === 'team'" class="uppercase">Career</span>
                <span v-else>{{ get(allSeasons.career.all.farm, col, '&mdash;') }}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { get } from 'lodash-es'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { shotpercentage, averageicetime } from '~/lib/playerstats'

const route = useRoute()
const { currentRoute } = useRouter()

const types = ['reg', 'plf', 'pre']
const cols = [
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
const allSeasons = ref(false)

const { result, loading, error } = useQuery(
  gql`
    query playerstats($where: JSON) {
      playerstats(where: $where) {
        season
        player {
          id
        }
        team {
          teamid
          teamsim
          foreground @client
          background @client
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
  {
    where: JSON.stringify([
      ['player', '=', route.params.playerid],
      ['team', '!=', 'tot']
    ])
  }
)

watch(
  result,
  (newResult) => {
    if (Object.keys(newResult?.playerstats || {}).length === 0) {
      return
    }
    const newPlayerstats = newResult.playerstats
    const farmCols = ['farm_goals', 'farm_assists', 'farm_points']
    const seasons = {
      plf: {},
      reg: {},
      pre: {},
      farm: {},
      career: {
        all: {
          plf: { ...Object.fromEntries(cols.map((col) => [col, 0])), years: 0 },
          reg: { ...Object.fromEntries(cols.map((col) => [col, 0])), years: 0 },
          pre: { ...Object.fromEntries(cols.map((col) => [col, 0])), years: 0 },
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
          cols.map((col) => [col, 0])
        )
      }
      for (const number of cols) {
        if (!isNaN(playerstat[number])) {
          if (number !== 'spercentage' && number !== 'averageicetime') {
            seasons.career[type][playerstat.team.teamid][number] += playerstat[number]
            seasons.career.all[type][number] += playerstat[number]
          }
        }
      }
    })
    allSeasons.value = seasons
  },
  { immediate: true, deep: true }
)
</script>
<style scoped>
.statstable table {
  @apply mb-5;
}

.statstable td,
.statstable th {
  @apply py-0.5 px-2 border border-gray-300;
}
@media (min-width: 640px) {
  .statstable td,
  .statstable th {
    @apply px-2 text-sm;
  }
}
.statstable th {
  @apply bg-gray-200;
  @apply text-secondary-500;
}
.statstable td {
  @apply py-0.5 text-right;
}
.statstable tr:hover {
  @apply bg-primary-200;
}
</style>
