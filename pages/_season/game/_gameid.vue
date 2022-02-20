<template>
  <div v-if="game">
    <div class="relative isolate overflow-hidden shadow">
      <team-bg foreground="#B92727" background="#0061AF" />
      <div class="container mx-auto flex flex-row items-center justify-center p-6">
        <div class="w-40">
          <team-logo-big :teamid="game.home.teamid" />
        </div>
        <div class="w-40 place-self-center text-center leading-none text-white">
          <div class="text-8xl font-extrabold">{{ game.goalshome }}:{{ game.goalsaway }}</div>
          <div v-if="game.overtimes === 1" class="text-xl font-extrabold leading-3">OT</div>
          <div v-else-if="game.overtimes > 1" class="text-xl font-extrabold leading-3">
            OT{{ game.overtimes }}
          </div>
        </div>
        <div class="w-40">
          <team-logo-big :teamid="game.away.teamid" />
        </div>
      </div>
      <ul class="mb-2 flex justify-center gap-2">
        <li class="flex text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ game.home.rink }}</span>
        </li>
        <li class="flex text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ new Date().toLocaleDateString() }}</span>
        </li>
      </ul>
    </div>
    <div class="mx-auto max-w-screen-2xl p-2 md:p-6 xl:px-12">
      <div
        v-for="period of Object.keys(eventList)"
        :key="`gameday-${period}`"
        class="mt-4 xl:shadow"
      >
        <div
          class="
            bg-primary-500
            p-3
            text-lg
            font-bold
            text-primary-50
            dark:bg-primary-700 dark:text-primary-200
          "
        >
          <span v-if="period <= 3">{{ period }}. Drittel</span>
          <span v-else>{{ period - 3 }}. Verlängerung</span>
        </div>
        <games-event-row
          v-for="(event, index) in eventList[period]"
          :key="`${event.period}-${event.minutes}-${index}`"
          :event="event"
          :index="index"
        />
      </div>
    </div>
    <div class="mx-auto max-w-screen-2xl p-2 md:p-6 xl:px-12">
      <div
        class="p-3 text-lg font-bold"
        :style="`background-color: ${game.home.background}; color: ${game.home.foreground};`"
      >
        {{ game.home.teamid }}
      </div>

      <player-scorerlist
        :loading="$apollo.loading"
        :columns="statsColumns"
        :sortedScorer="roster[game.home.teamid]"
        :error="$apollo.error"
        :sortColumn="sortColumn"
        :sortCol="sortCol"
        :direction="direction"
        firstCol="number"
      />
      <div
        class="mt-5 p-3 text-lg font-bold"
        :style="`background-color: ${game.away.background}; color: ${game.away.foreground};`"
      >
        {{ game.away.teamid }}
      </div>

      <player-scorerlist
        :loading="$apollo.loading"
        :columns="statsColumns"
        :sortedScorer="roster[game.away.teamid]"
        :error="$apollo.error"
        :sortColumn="sortColumn"
        :sortCol="sortCol"
        :direction="direction"
        firstCol="number"
      />
    </div>
  </div>
</template>

<script>
// https://www.ersteliga.hu/game/id/62630/season/2177
// https://www.championshockeyleague.com/en/matches/7e75f8d87841ad0efdba93dc/frolunda-gothenburg-vs-rogle-angelholm#tab_event=lineups
// https://www.sihf.ch/de/game-center/game/#/20221105000200
// https://www.hockeyslovakia.sk/sk/stats/matches/843/tipos-extraliga/match/124992/PlayByPlay#matchDetailTabs
// https://www.del-2.org/liga/archiv/127/spiel/6299/
// http://pointstreak.com/prostats/boxscore.html?gameid=2490788
import gql from 'graphql-tag'

const addToPeriod = (list, event) => {
  if (!list[event.period]) {
    list[event.period] = []
  }
  list[event.period].push(event)
}

export default {
  async asyncData({ params }) {
    const season = params.season
    const gamenumber = params.gameid
    return { season, gamenumber }
  },
  head() {
    if (this.game) {
      return {
        title: `${this.game.home.teamid.toUpperCase()} vs. ${this.game.away.teamid.toUpperCase()} - ${
          this.season
        }`
      }
    }
  },
  data() {
    return {
      eventList: {},
      roster: {},
      sortCol: 'points',
      direction: 'desc',
      statsColumns: [
        'name',
        'goals',
        'assists',
        'points',
        'plusminus',
        'pim',
        'shots',
        'spercentage',
        'icetime',
        'hits',
        'injured',
        'ejected',
        'fightswon',
        'fightslose',
        'fightsdraw'
      ]
    }
  },
  watch: {
    game(gameData) {
      const eventList = {}
      gameData.events.forEach((e) => addToPeriod(eventList, e))
      gameData.goals.forEach((g) => addToPeriod(eventList, g))
      gameData.penalties.forEach((p) => addToPeriod(eventList, p))
      for (const period in eventList) {
        eventList[period].sort((a, b) => {
          const timeA = a.minutes * 60 + a.seconds
          const timeB = b.minutes * 60 + b.seconds
          if (timeA > timeB) return 1
          if (timeA < timeB) return -1
          if (a.__typename === 'GameEvent') {
            if (a.type === 'fight' || a.type === 'draw') {
              return -1
            } else if (b.__typename !== 'GameEvent') {
              return 1
            }
          }
          if (b.__typename === 'GameEvent') {
            if (b.type === 'fight' || b.type === 'draw') {
              return 1
            } else if (a.__typename !== 'GameEvent') {
              return -1
            }
          }
          return 0
        })
      }
      const roster = {
        [gameData.home.teamid]: [],
        [gameData.away.teamid]: []
      }
      gameData.lineup.forEach((p) => roster[p.team.teamid].push(p))

      this.eventList = eventList
      this.roster = roster
    }
  },
  methods: {
    sortColumn(col) {
      this.sortCol = col
      this.direction = this.direction === 'desc' ? 'asc' : 'desc'
      Object.keys(this.roster).forEach((ros) => {
        this.roster[ros].sort((a, b) => {
          if (a[col] > b[col]) return -1
          if (a[col] < b[col]) return 1
          return 0
        })
        if (this.direction === 'asc') {
          this.roster[ros].reverse()
        }
      })
    }
  },
  apollo: {
    game: {
      query: gql`
        query game($season: String!, $gamenumber: Int!) {
          game(season: $season, gamenumber: $gamenumber) {
            gameday
            season
            home {
              teamid
              rink
              foreground @client(always: true)
              background @client(always: true)
            }
            away {
              teamid
              foreground @client(always: true)
              background @client(always: true)
            }
            goalshome
            goalsaway
            overtimes
            winner {
              teamid
            }
            loser {
              teamid
            }
            events {
              type
              minutes
              seconds
              period
              player {
                id
                display_fname
                display_lname
              }
              player2 {
                id
                display_fname
                display_lname
              }
              team {
                teamid
              }
            }
            goals {
              minutes
              seconds
              period
              goalscorer {
                id
                display_fname
                display_lname
              }
              primaryassist {
                id
                display_fname
                display_lname
              }
              secondaryassist {
                id
                display_fname
                display_lname
              }
              score
              team: scoringteam {
                teamid
              }
              situation
              tags
            }
            penalties {
              minutes
              seconds
              period
              length
              offense
              player {
                id
                display_fname
                display_lname
              }
              team {
                teamid
              }
            }
            pphome
            ppaway
            ppghome
            pphaway
            shotshome
            shotsaway
            gamedata
            lineup {
              player {
                display_fname
                display_lname
                fname
                lname
              }
              team {
                teamid
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
              line
              spercentage @client
            }
          }
        }
      `,
      variables() {
        return {
          season: this.season,
          gamenumber: parseInt(this.gamenumber)
        }
      },
      update: ({ game }) => game,
      error() {
        this.error = true
      }
    }
  }
}
</script>
