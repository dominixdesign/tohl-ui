<template>
  <div
    v-if="leader"
    class="
      col-span-1
      flex flex-col
      text-center
      bg-white
      dark:bg-gray-600
      rounded-lg
      shadow
      divide-y divide-gray-600
      dark:divide-white
      divide-opacity-20 divide-dashed
      overflow-hidden
    "
  >
    <div class="flex-1 flex flex-col pt-4 pr-4 pb-1">
      <div class="flex w-full items-center flex-row pb-3">
        <div
          class="
            flex-grow
            text-left
            leading-3
            p-2
            overflow-hidden overflow-ellipsis
            text-primary-700
            dark:text-white
          "
        >
          <span class="first text-sm">{{ leader.player.display_fname }}</span
          ><br />
          <span class="font-bold text-xl uppercase whitespace-nowrap">
            {{ leader.player.display_lname }}</span
          >
        </div>
        <div
          class="
            flex-none
            w-20
            min-w-20
            h-20
            p-2
            rounded-full
            bg-white
            border-2 border-gray-100
            shadow
            bg-no-repeat bg-cover
            relative
          "
          :style="`
          background-image: url(https://my-tohl.org/img/player/${leader.player.id}.jpg);
          border-color: ${backgroundColor(leader.team.teamid)};
          `"
        >
          <team-logo-middle
            :teamid="leader.team.teamid"
            class="transform scale-50 min-w-20 absolute -bottom-1/2 -right-1/2"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="flex">
        <div class="w-0 flex-1 flex-col flex items-center">
          <span class="font-medium uppercase font-headline text-lg">{{
            $tc(`leader.${sortby}`, leader[sortby])
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    season: String,
    position: String,
    sortby: String
  },
  apollo: {
    leader: {
      query: gql`
        query leader($order: [OrderBy], $where: JSON) {
          playerstats(orderBy: $order, limit: 1, where: $where) {
            team {
              teamsim
              teamid
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
            plusminus
            hits
            shots
            gaa
            savepercentage
            shutout
          }
        }
      `,
      variables() {
        return {
          order: { column: this.sortby, order: this.sortby === 'gaa' ? 'ASC' : 'DESC' },
          where: JSON.stringify(this.where)
        }
      },
      update: ({ playerstats }) => {
        if (playerstats.length === 1) {
          return playerstats[0]
        }
        return false
      },
      error() {
        this.error = true
      }
    }
  },
  computed: {
    where() {
      if (this.position === 'offense') {
        return [
          ['playerstats.season', '=', this.season],
          ['playerdata.pos', 'IN', ['LW', 'RW', 'C']]
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
    backgroundColor(team) {
      return this.$store.getters['teams/backgroundByTeam'](team)
    },
    foregroundColor(team) {
      return this.$store.getters['teams/foregroundByTeam'](team)
    }
  }
}
</script>
