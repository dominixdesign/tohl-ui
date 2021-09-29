<template>
  <div class="flex flex-col items-end w-full h-44">
    <div
      v-if="leader"
      class="
        flex flex-col
        items-center
        h-full
        justify-between
        w-full
        box-border
        border-8
        rounded-md
        shadow-md
        border-gray-600
        bg-right-bottom bg-no-repeat bg-40 bg-white
        dark:bg-gray-600
      "
      :style="`
        background-image: url(https://my-tohl.org/img/player/${leader.player.id}.jpg);
        `"
    >
      <div class="w-full px-4">
        <span class="text-2xl font-bold">{{ $t(sortby) }}</span>
      </div>
      <div class="flex items-end justify-start flex-row pb-4 px-4 w-full text-left">
        <div class="w-full flex flex-col">
          <team-logo-small class="mb-2 block" :teamid="leader.team.teamid" />
          <div class="flex">
            <span class="self-end min-w-7 inline-block relative w-auto z-1 whitespace-nowrap"
              ><span
                class="opacity-75 absolute -top-1 -left-1 -z-1 w-10plus h-10plus"
                :style="`background-color: ${backgroundColor(leader.team.teamid)};`"
              ></span
              ><span
                class="max-w-xxs overflow-ellipsis overflow-hidden block"
                :style="`color: ${foregroundColor(leader.team.teamid)}`"
                ><span class="first">{{ leader.player.display_fname }}</span
                ><span class="font-bold"> {{ leader.player.display_lname }}</span></span
              ></span
            >
          </div>
        </div>
        <span
          class="text-3xl mb-0 ml-auto justify-self-end relative w-auto z-1"
          :style="`color: ${foregroundColor(leader.team.teamid)};`"
          ><span
            class="opacity-75 absolute -top-1 -left-1 -z-1 w-10plus h-10plus"
            :style="`background-color: ${backgroundColor(leader.team.teamid)};`"
          ></span
          >{{ leader[sortby] }}</span
        >
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
        console.log('where', this.where)
        return {
          order: { column: this.sortby, order: this.sortby === 'gaa' ? 'ASC' : 'DESC' },
          where: JSON.stringify(this.where)
        }
      },
      update: ({ playerstats }) => {
        console.log(playerstats)
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
