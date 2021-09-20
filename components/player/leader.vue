<template>
  <div class="flex flex-col items-end w-full h-44">
    <div
      v-if="leader"
      class="flex flex-col items-center h-full justify-between w-full"
      :style="`
        background-color: ${backgroundColor(leader.team.teamid)};
        color: rgb(255, 255, 255);
        `"
    >
      <div class="w-full pt-4 px-4">
        <span class="text-xl bold">{{ sortby }}</span>
      </div>
      <div class="flex items-end justify-start flex-row pb-4 px-4 w-full text-left">
        <div class="w-full flex flex-col">
          <team-logo-small class="ml-2 mb-1 block" :teamid="leader.team.teamid" />
          <div class="flex">
            <span class="self-end min-w-7 inline-block relative w-auto z-1 whitespace-nowrap"
              ><span
                class="opacity-75 absolute -top-1 -left-1 -z-1 w-10plus h-10plus"
                :style="`background-color: ${foregroundColor(leader.team.teamid)};`"
              ></span
              ><span
                ><span class="first">{{ leader.player.fname }}</span
                ><span class="font-bold"> {{ leader.player.lname }}</span></span
              ></span
            >
          </div>
        </div>
        <span class="text-3xl mb-0 ml-auto justify-self-end relative w-auto z-1"
          ><span
            class="opacity-75 absolute -top-1 -left-1 -z-1 w-10plus h-10plus"
            :style="`background-color: ${foregroundColor(leader.team.teamid)};`"
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
              fname
              lname
            }
            games
            goals
            assists
            points
            pim
            plusminus
            hits
            shots
          }
        }
      `,
      variables() {
        console.log('where', this.where)
        return {
          order: { column: this.sortby, order: 'DESC' },
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
