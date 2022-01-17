<template>
  <div v-if="game">
    <div class="shadow relative isolate overflow-hidden">
      <team-bg foreground="#B92727" background="#0061AF" />
      <div class="container mx-auto p-6 flex flex-col sm:flex-row justify-center">
        <div class="w-40">
          <team-logo-big :teamid="game.home.teamid" />
        </div>
        <div class="w-40 text-center place-self-center leading-none">
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
    </div>
    <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl" v-if="game">
      <h3 class="text-3xl font-bold my-5">Spiel #{{ gamenumber }} in {{ season }}</h3>
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
