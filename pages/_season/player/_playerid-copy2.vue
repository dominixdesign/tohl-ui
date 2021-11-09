<template>
  <div v-if="player" class="p-6 xl:px-12 mx-auto flex flex-col sm:flex-row gap-5 flex-wrap">
    <div class="p-4 relative">
      <div class="flex mt-2 -space-x-3">
        <div
          class="
            w-20
            h-20
            shadow
            rounded-full
            overflow-hidden
            content-center
            leading-6xl
            text-6xl text-center
            font-college font-bold
          "
          :style="`background-color: ${player.seasondata.team.background}; color: ${player.seasondata.team.foreground};`"
        >
          {{ player.seasondata.number }}
        </div>
        <div
          class="w-20 h-20 rounded-full shadow bg-top bg-cover"
          :style="`background-image: url(https://my-tohl.org/img/player/${player.id}.jpg)`"
        />
        <div>
          <team-logo-middle :teamid="player.seasondata.team.teamid" />
        </div>
      </div>
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
    <div class="overflow-hidden flex justify-center">
      <div
        v-for="(skilllist, title) in skills"
        :key="title"
        class="justify-center p-2 box-border w-25"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th
                colspan="2"
                class="
                  bg-primary-300
                  dark:bg-primary-700 dark:text-gray-300
                  shadow
                  font-thin
                  text-xs
                  uppercase
                  p-1
                  rounded-sm
                "
              >
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="skill in skilllist" :key="`${title}-${skill}`">
              <td class="font-headline text-center">{{ skill }}</td>
              <td class="font-headline text-center">
                {{ player.seasondata[skill.toLowerCase()] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="overflow-hidden">Lorem ipsum</div>
    <div class="overflow-hidden" style="max-width: 90vw">
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
    skills() {
      return {
        'Physical Skills': ['IT', 'ST', 'EN', 'DU', 'SP'],
        'Hockey Skills': ['SK', 'PA', 'PC', 'DF', 'SC'],
        'Personal Skills': ['DI', 'EX', 'LD']
      }
    },
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
