<template>
  <div v-if="game">
    <div class="shadow relative isolate overflow-hidden">
      <team-bg foreground="#B92727" background="#0061AF" />
      <div class="container mx-auto p-6 flex flex-col sm:flex-row justify-center">
        <div class="w-40">
          <team-logo-big :teamid="game.home.teamid" />
        </div>
        <div class="w-40 text-center place-self-center leading-none text-white">
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
      <ul class="flex justify-center gap-2 mb-2">
        <li class="text-white flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
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
        <li class="text-white flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
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
    <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
      <div :id="`gameday-${gameday}`" class="xl:shadow mt-4">
        <div
          class="
            p-3
            text-lg
            font-bold
            bg-primary-500
            dark:bg-primary-700
            text-primary-50
            dark:text-primary-200
          "
        >
          1. Drittel
        </div>
      </div>
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
            }
            away {
              teamid
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
