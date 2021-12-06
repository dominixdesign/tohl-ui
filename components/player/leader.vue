<template>
  <div class="flex flex-col items-end w-full h-36" v-if="leader">
    <div
      class="
        shadow-lg
        relative
        isolate
        overflow-hidden
        rounded-md
        w-full
        h-full
        border-t-4
        bg-white
        dark:bg-gray-700
      "
      :style="`border-color: ${leader.team.background}`"
    >
      <div class="mx-auto p-2 flex flex-row">
        <div class="w-24">
          <div
            class="
              w-20
              h-20
              relative
              mx-auto
              rounded-full
              shadow
              bg-top bg-cover
              border-4 border-white
              bg-white
            "
            :style="`background-image: url(https://my-tohl.org/img/player/${leader.player.id}.jpg)`"
          />
          <team-logo-big :teamid="leader.team.teamid" class="w-12 h-12 relative -mt-5" />
        </div>
        <div
          class="flex-grow sm:pl-4 flex flex-col pt-2 sm:place-items-start place-items-center gap-1"
        >
          <h2
            class="
              font-bold font-college
              text-center
              inline-block
              px-2
              bg-gray-50 bg-opacity-40
              overflow-ellipsis overflow-hidden
              whitespace-nowrap
            "
          >
            <span class="text-lg block sm:inline">{{
              leader.player.display_lname.length + leader.player.display_fname.length > 18
                ? leader.player.display_fname[0] + '.'
                : leader.player.display_fname
            }}</span>
            <span class="uppercase text-xl">&nbsp;{{ leader.player.display_lname }}</span>
          </h2>
          <p
            class="
              uppercase
              text-2xl
              sm:text-3xl
              font-bold font-headline
              text-center
              inline-block
              px-2
              bg-gray-50 bg-opacity-40
            "
          >
            {{ $tc(`leader.${sortby}`, leader[sortby]) }}
          </p>
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
