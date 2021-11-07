<template>
  <div
    v-if="player"
    class="
      p-6
      xl:px-12
      mx-auto
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      2xl:grid-cols-4
      gap-10
    "
  >
    <div class="overflow-hidden p-4 relative">
      <div
        class="flex gap-1 text-xs uppercase border-b"
        :style="`border-color: ${player.seasondata.team.background};`"
      >
        <div>
          {{ player.seasondata.position }}
        </div>
        <div>@</div>
        <div :style="`color: ${player.seasondata.team.background};`">
          {{ player.seasondata.team.teamsim }}
        </div>
      </div>
      <h2
        class="
          flex-grow
          text-left
          leading-3
          pt-2
          overflow-hidden overflow-ellipsis
          text-primary-700
          dark:text-white
          font-headline
        "
      >
        <span class="first text">{{ player.display_fname }}</span
        ><br />
        <span class="font-bold text-3xl uppercase whitespace-nowrap">
          {{ player.display_lname }}</span
        >
      </h2>
    </div>
    <div class="overflow-hidden">
      <img class="h-20 bg-white" :src="`https://my-tohl.org/img/player/${player.id}.jpg`" />
    </div>
    <div class="overflow-hidden">Lorem ipsum</div>
    <div class="overflow-hidden">
      <player-radar
        :chartdata="{
          labels: ['IT', 'SP', 'ST', 'EN', 'DU', 'DI', 'SK', 'PA', 'PC', 'DF', 'SC', 'EX', 'LD'],
          datasets: [
            {
              label: player.display_fname + ' ' + player.display_lname,
              backgroundColor: $hexToRgbA(player.seasondata.team.background, 0.6),
              data: [
                player.seasondata.it,
                player.seasondata.sp,
                player.seasondata.st,
                player.seasondata.en,
                player.seasondata.du,
                player.seasondata.di,
                player.seasondata.sk,
                player.seasondata.pa,
                player.seasondata.pc,
                player.seasondata.df < 25 ? undefined : player.seasondata.df,
                player.seasondata.sc < 25 ? undefined : player.seasondata.sc,
                player.seasondata.ex,
                player.seasondata.ld
              ]
            }
          ]
        }"
        :options="graphOptions"
      />
    </div>
  </div>
</template>

<script>
import vue from 'vue'
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {
  async asyncData({ params: { season, playerid } }) {
    return { season, playerid }
  },
  computed: {
    ...mapState({
      colormode: (state) => state.layout.colormode
    }),
    graphOptions() {
      return {
        legend: {
          display: false
        },
        scale: {
          ticks: {
            min: 0,
            max: 100,
            fontColor: this.colormode === 'dark' ? 'white' : 'black',
            showLabelBackdrop: false
          },
          pointLabels: {
            fontColor: this.colormode === 'dark' ? 'white' : 'black'
          },
          gridLines: {
            color: this.colormode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
          },
          angleLines: {
            color: this.colormode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
          }
        }
      }
    }
  },
  apollo: {
    player: {
      query: gql`
        query player($id: ID!, $season: ID) {
          player(id: $id) {
            id
            fname
            display_fname
            display_lname
            height
            weight
            lname
            seasondata(season: $season) {
              team {
                teamsim
                teamid
                foreground @client(always: true)
                background @client(always: true)
              }
              roster
              number
              age
              salary
              contract
              pos
              position @client(always: true)
              cd
              ij
              it
              sp
              st
              en
              du
              di
              sk
              pa
              pc
              df
              sc
              ex
              ld
              ov
            }
          }
        }
      `,
      variables() {
        return {
          id: this.playerid,
          season: this.season
        }
      },
      update: ({ player }) => player,
      error() {
        this.error = true
      }
    }
  }
}
</script>

<style></style>
