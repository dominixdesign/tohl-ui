<template>
  <div class="statstable">
    Career
    <table>
      <thead>
        <tr>
          <th v-for="col of cols" :key="col">
            {{ $t(`abbr.${col}`) }}
          </th>
        </tr>
      </thead>
      <tbody v-if="playerstats">
        <tr v-for="stat of playerstats" :key="`${stat.season}-${stat.team.teamid}`">
          <td v-for="col of cols" :key="col">
            {{ stat[col] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params: { playerid } }) {
    return { playerid }
  },
  data() {
    return {
      cols: [
        'season',
        'team',
        'games',
        'goals',
        'assists',
        'points',
        'plusminus',
        'pim',
        'shots',
        'hits',
        'icetime',
        'ppg',
        'ppa',
        'shg',
        'sha',
        'streak_goals_current',
        'streak_goals_longest',
        'streak_points_current',
        'streak_points_longest',
        'fightswon',
        'fightslose',
        'fightsdraw',
        'injuries',
        'ejections',
        'minutes',
        'saves',
        'shotsfaced',
        'savepercentage',
        'gaa',
        'goalsagainst',
        'shutout',
        'first_stars',
        'second_stars',
        'third_stars'
      ]
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
  @apply border;
  @apply border-primary-600;
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
}
.statstable td:hover {
  @apply bg-gray-600;
}
</style>
