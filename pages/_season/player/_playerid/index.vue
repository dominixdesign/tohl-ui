<template>
  <div class="statstable">
    <h3 class="font-college font-bold text-xl mx-auto">Career</h3>
    <table class="mx-auto hidden md:table">
      <thead>
        <tr>
          <th v-for="col of [...cols['*'], ...cols['reg'], 'post', ...cols['plf']]" :key="col">
            {{ $t(`abbr.${col.split('.')[1] || col}`) }}
          </th>
        </tr>
      </thead>
      <tbody v-if="seasons">
        <tr v-for="(stat, name, index) of seasons" :key="name">
          <td
            v-for="col of [...cols['*'], ...cols['reg'], 'post', ...cols['plf']]"
            :key="`${stat.reg.season}${stat.reg.team.teamid}${col}`"
            :class="['post', 'team'].indexOf(col) >= 0 ? '!text-left' : ''"
          >
            <span v-if="col === 'season'">{{
              !Object.keys(seasons)[index - 1] ||
              (Object.keys(seasons)[index - 1] &&
                Object.keys(seasons)[index - 1].substr(0, 6) !== name.substr(0, 6))
                ? name.substr(0, 6)
                : ''
            }}</span>
            <span v-else-if="col === 'team'">
              <team-logo-inline :teamid="stat.reg.team.teamid" /> {{ stat.reg.team.teamsim }}
            </span>
            <span v-else-if="col === 'post'">|</span>
            <span v-else>{{ get(stat, col, '&mdash;') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="md:hidden w-full">
      <div class="flex gap-2">
        <div>Regular Season</div>
        <button
          @click="showReg = !showReg"
          type="button"
          class="
            bg-gray-200
            relative
            inline-flex
            flex-shrink-0
            h-6
            w-11
            border-2 border-transparent
            rounded-full
            cursor-pointer
            transition-colors
            ease-in-out
            duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
          role="switch"
          aria-checked="false"
        >
          <span class="sr-only">Playoff switch</span>
          <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
          <span
            aria-hidden="true"
            class="
              pointer-events-none
              inline-block
              h-5
              w-5
              rounded-full
              bg-primary-500
              shadow
              transform
              ring-0
              transition
              ease-in-out
              duration-200
            "
            :class="showReg ? 'translate-x-0' : 'translate-x-5'"
          ></span>
        </button>
        <div>Playoffs</div>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th v-for="col of [...cols['*'], ...cols[showReg ? 'reg' : 'plf']]" :key="col">
              {{ $t(`abbr.${col.split('.')[1] || col}`) }}
            </th>
          </tr>
        </thead>
        <tbody v-if="seasons">
          <tr v-for="(stat, name, index) of seasons" :key="name">
            <td
              v-for="col of [...cols['*'], ...cols[showReg ? 'reg' : 'plf']]"
              :key="`${stat.reg.season}${stat.reg.team.teamid}${col}`"
              :class="['post', 'team'].indexOf(col) >= 0 ? '!text-left' : ''"
            >
              <span v-if="col === 'season'">{{
                !Object.keys(seasons)[index - 1] ||
                (Object.keys(seasons)[index - 1] &&
                  Object.keys(seasons)[index - 1].substr(0, 6) !== name.substr(0, 6))
                  ? name.substr(0, 6)
                  : ''
              }}</span>
              <span v-else-if="col === 'team'" class="uppercase">
                {{ stat.reg.team.teamid }}
              </span>
              <span v-else-if="col === 'post'">|</span>
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
  async asyncData({ params: { playerid } }) {
    console.log({ playerid })
    return { playerid }
  },
  data() {
    return {
      showReg: true,
      seasons: {},
      cols: {
        '*': ['season', 'team'],
        reg: ['reg.games', 'reg.goals', 'reg.assists', 'reg.points', 'reg.pim', 'reg.plusminus'],
        plf: ['plf.games', 'plf.goals', 'plf.assists', 'plf.points', 'plf.pim', 'plf.plusminus']
      }
    }
  },
  watch: {
    playerstats(newPlayerstats) {
      const seasons = {}
      // const seasons = [...newPlayerstats.map((p) => p.season)].sort(seasonSorter)
      newPlayerstats.forEach((playerstat) => {
        const s = playerstat.season.substr(0, 6)
        if (!seasons[s + playerstat.team.teamid]) {
          seasons[s + playerstat.team.teamid] = {}
        }
        if (playerstat.season.indexOf('PLF') >= 0) {
          seasons[s + playerstat.team.teamid]['plf'] = playerstat
        } else if (playerstat.season.indexOf('pre') >= 0) {
          seasons[s + playerstat.team.teamid]['pre'] = playerstat
        } else {
          seasons[s + playerstat.team.teamid]['reg'] = playerstat
        }
      })
      this.seasons = seasons
    }
  },
  methods: {
    get(object, path, defaultValue) {
      return get(object, path, defaultValue)
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

<style lang="postcss" scoped>
.statstable td,
.statstable th {
  @apply font-headline;
  @apply py-2;
  @apply px-2;
}
@media (min-width: 640px) {
  .statstable td,
  .statstable th {
    @apply px-3;
  }
}
.statstable th {
  @apply bg-primary-600;
  @apply text-white;
}
.statstable td {
  @apply py-1;
  @apply text-right;
}
.statstable tr:nth-child(2n) {
  @apply bg-gray-100;
}
.statstable tr:nth-child(2n + 1) {
  @apply bg-gray-200;
}
.statstable tr:hover {
  @apply bg-gray-300;
}
.dark .statstable tr:nth-child(2n) {
  @apply bg-gray-500;
}
.dark .statstable tr:nth-child(2n + 1) {
  @apply bg-gray-600;
}
.dark .statstable tr:hover {
  @apply bg-gray-700;
}
</style>
